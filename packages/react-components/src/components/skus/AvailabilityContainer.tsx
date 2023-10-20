import {
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
  useMemo
} from 'react'
import availabilityReducer, {
  availabilityInitialState,
  getAvailability
} from '#reducers/AvailabilityReducer'
import AvailabilityContext from '#context/AvailabilityContext'
import CommerceLayerContext from '#context/CommerceLayerContext'
import LineItemChildrenContext from '#context/LineItemChildrenContext'
import SkuChildrenContext from '#context/SkuChildrenContext'
import useCustomContext from '#utils/hooks/useCustomContext'

interface Props {
  children: ReactNode
  skuCode?: string
  getQuantity?: (quantity: number) => void
}

/**
 * Main container for the Availability components.
 * It stores - in its context - the sku quantity returned from the `inventory_model` and the `delivery_lead_time` for the first shipping method found in the inventory model.
 *
 * It can be used to fetch the quantities for a specific `sku_code` passed as prop.
 * <span title='Requirements' type='warning'>
 * Must be a child of the `<CommerceLayer>` component.
 * </span>
 * <span title='Children' type='info'>
 * `<AvailabilityTemplate>`
 * </span>
 */
export function AvailabilityContainer({
  children,
  skuCode,
  getQuantity
}: Props): JSX.Element {
  const { lineItem } = useContext(LineItemChildrenContext)
  const { sku } = useContext(SkuChildrenContext)
  const { accessToken, endpoint } = useCustomContext({
    context: CommerceLayerContext,
    contextComponentName: 'CommerceLayer',
    currentComponentName: 'AvailabilityContainer',
    key: 'accessToken'
  })
  const [state, dispatch] = useReducer(
    availabilityReducer,
    availabilityInitialState
  )
  const sCode = skuCode || lineItem?.sku_code || sku?.code
  useEffect(() => {
    if (accessToken != null && accessToken !== '') {
      const config = { accessToken, endpoint }
      if (sCode) {
        void getAvailability({ skuCode: sCode, config, dispatch })
      }
    }
    return (): void => {
      dispatch({
        type: 'setAvailability',
        payload: {}
      })
    }
  }, [accessToken, sCode])
  useEffect(() => {
    if (getQuantity != null && state?.quantity != null)
      getQuantity(state?.quantity)
  }, [state.quantity])
  const memoized = useMemo(() => {
    return { ...state, parent: true }
  }, [state])
  return (
    <AvailabilityContext.Provider value={memoized}>
      {children}
    </AvailabilityContext.Provider>
  )
}

export default AvailabilityContainer
