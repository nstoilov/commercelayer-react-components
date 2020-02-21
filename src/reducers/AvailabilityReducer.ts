import baseReducer from '../utils/baseReducer'
import { BaseError } from '../components/Errors'

export interface LeadTimes {
  hours: number
  days: number
}

export interface ShippingMethod {
  name: string
  reference: null | string
  priceAmountCents: number
  freeOverAmountCents: null | number
  formattedPriceAmount: string
  formattedFreeOverAmount: null | string
}

export interface AvailabilityPayload {
  shippingMethod?: ShippingMethod
  errors?: BaseError[]
}

export interface AvailabilityState extends AvailabilityPayload {
  min?: LeadTimes
  max?: LeadTimes
}

export interface AvailabilityAction {
  type: AvailabilityActionType
  payload: AvailabilityPayload
}

export const availabilityInitialState: AvailabilityState = {
  errors: []
}

export type AvailabilityActionType = 'setAvailability' | 'setErrors'

const typeAction: AvailabilityActionType[] = ['setAvailability', 'setErrors']

const availabilityReducer = (
  state: AvailabilityState,
  reducer: AvailabilityAction
): AvailabilityState =>
  baseReducer<AvailabilityState, AvailabilityAction, AvailabilityActionType[]>(
    state,
    reducer,
    typeAction
  )

export default availabilityReducer
