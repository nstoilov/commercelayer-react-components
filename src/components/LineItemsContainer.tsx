import React, {
  useEffect,
  FunctionComponent,
  ReactElement,
  useReducer,
  useContext
} from 'react'
import CLayer from '@commercelayer/js-sdk'
import { OrderContainerActions } from './OrderContainer'
import { LineItemProps } from './LineItem'
import lineItemReducer, {
  lineItemInitialState
} from '../reducers/LineItemReducer'
import OrderContext from '../context/OrderContext'
import LineItemContext from '../context/LineItemContext'
import { UpdateLineItem, DeleteLineItem } from '../reducers/LineItemReducer'
import CommerceLayerContext from '../context/CommerceLayerContext'
import _ from 'lodash'
import getErrorsByCollection from '../utils/getErrorsByCollection'

export interface LineItemsContainer extends OrderContainerActions {
  children?: ReactElement<LineItemProps>[] | ReactElement<LineItemProps>
}

const LineItemsContainer: FunctionComponent<LineItemsContainer> = props => {
  const { children } = props
  const { order, getOrder, orderId } = useContext(OrderContext)
  const config = useContext(CommerceLayerContext)
  const [state, dispatch] = useReducer(lineItemReducer, lineItemInitialState)
  const updateLineItem: UpdateLineItem = (lineItemId, quantity = 1) => {
    const update = CLayer.LineItem.withCredentials(config)
      .find(lineItemId)
      .then(lnIt => {
        return lnIt
          .withCredentials(config)
          .update({ quantity })
          .catch(c => {
            const errors = getErrorsByCollection(c, 'lineItem')
            dispatch({
              type: 'setErrors',
              payload: {
                errors
              }
            })
          })
      })
    update.then(() => getOrder(orderId))
  }
  const deleteLineItem: DeleteLineItem = lineItemId => {
    const deleteItem = CLayer.LineItem.withCredentials(config)
      .find(lineItemId)
      .then(lnI => {
        return lnI
          .withCredentials(config)
          .destroy()
          .catch(c => {
            const errors = getErrorsByCollection(c, 'lineItem')
            dispatch({
              type: 'setErrors',
              payload: {
                errors
              }
            })
          })
      })
    deleteItem.then(() => getOrder(orderId))
  }
  useEffect(() => {
    if (!_.isEmpty(order)) {
      const lItems = order?.lineItems().toArray()
      dispatch({
        type: 'setLineItems',
        payload: { lineItems: lItems }
      })
    }
    return (): void => {
      dispatch({
        type: 'setLineItems',
        payload: { lineItems: [] }
      })
    }
  }, [order])
  const lineItemValue = {
    lineItems: state.lineItems,
    updateLineItem,
    deleteLineItem
  }
  return (
    <LineItemContext.Provider value={lineItemValue}>
      {children}
    </LineItemContext.Provider>
  )
}

export default LineItemsContainer
