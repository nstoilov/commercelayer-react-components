import type { Meta, StoryFn } from '@storybook/react'
import CommerceLayer from '../../_internals/CommerceLayer'
import OrderContainer from '#components/orders/OrderContainer'
import { OrderStorage } from '../../_internals/OrderStorage'
import Errors from '#components/errors/Errors'
import { ShipmentsContainer } from '#components/shipments/ShipmentsContainer'
import { Shipment } from '#components/shipments/Shipment'
import { ShipmentField } from '#components/shipments/ShipmentField'
import { ShippingMethod } from '#components/shipping_methods/ShippingMethod'
import { ShippingMethodRadioButton } from '#components/shipping_methods/ShippingMethodRadioButton'
import { ShippingMethodName } from '#components/shipping_methods/ShippingMethodName'
import { ShippingMethodPrice } from '#components/shipping_methods/ShippingMethodPrice'
import { DeliveryLeadTime } from '#components/skus/DeliveryLeadTime'
import { persistKey } from './common'

const setup: Meta = {
  title: 'Examples/Checkout Page/Shipping Methods'
}

export default setup

export const ShipmentMethods: StoryFn = (args) => {
  return (
    <CommerceLayer accessToken='my-access-token'>
      <OrderStorage persistKey={persistKey}>
        <OrderContainer>
          <ShipmentsContainer>
            <Errors resource='shipments' />
            <Shipment>
              <ShipmentField name='number' />
              <ShippingMethod>
                <div className='block'>
                  <ShippingMethodRadioButton />
                  <ShippingMethodName />
                  <ShippingMethodPrice />
                  <DeliveryLeadTime type='min_days' />-
                  <DeliveryLeadTime type='max_days' />
                </div>
              </ShippingMethod>
            </Shipment>
          </ShipmentsContainer>
        </OrderContainer>
      </OrderStorage>
    </CommerceLayer>
  )
}
