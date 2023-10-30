import type { Meta, StoryFn } from '@storybook/react'
import CommerceLayer from '../../_internals/CommerceLayer'
import OrderContainer from '#components/orders/OrderContainer'
import LineItemsContainer from '#components/line_items/LineItemsContainer'
import LineItem from '#components/line_items/LineItem'
import LineItemName from '#components/line_items/LineItemName'
import LineItemImage from '#components/line_items/LineItemImage'
import LineItemAmount from '#components/line_items/LineItemAmount'
import LineItemsEmpty from '#components/line_items/LineItemsEmpty'
import { OrderStorage, AddSampleItems } from '../../_internals/OrderStorage'
import LineItemQuantity from '#components/line_items/LineItemQuantity'
import { CustomerContainer } from '#components/customers/CustomerContainer'
import { CustomerInput } from '#components/customers/CustomerInput'
import Errors from '#components/errors/Errors'
import { BillingAddressForm } from '#components/addresses/BillingAddressForm'
import { AddressesContainer } from '#components/addresses/AddressesContainer'
import { AddressInput } from '#components/addresses/AddressInput'
import { AddressCountrySelector } from '#components/addresses/AddressCountrySelector'
import { AddressStateSelector } from '#components/addresses/AddressStateSelector'
import { SaveAddressesButton } from '#components/addresses/SaveAddressesButton'
import { ShipmentsContainer } from '#components/shipments/ShipmentsContainer'
import { Shipment } from '#components/shipments/Shipment'
import { ShipmentField } from '#components/shipments/ShipmentField'
import { ShippingMethod } from '#components/shipping_methods/ShippingMethod'
import { ShippingMethodRadioButton } from '#components/shipping_methods/ShippingMethodRadioButton'
import { ShippingMethodName } from '#components/shipping_methods/ShippingMethodName'
import { ShippingMethodPrice } from '#components/shipping_methods/ShippingMethodPrice'
import { DeliveryLeadTime } from '#components/skus/DeliveryLeadTime'
import { persistKey } from './utils'

const setup: Meta = {
  title: 'Examples/Checkout Page/Items'
}

export default setup

export const ListOfItems: StoryFn = (args) => {
  return (
    <CommerceLayer accessToken='my-access-token'>
      <OrderStorage persistKey={persistKey}>
        <OrderContainer>
          <section className='max-w-xl'>
            <LineItemsContainer>
              <LineItem type='skus'>
                <div className='grid gap-4 grid-cols-[1fr,5fr,1fr,1fr] mb-4 items-center'>
                  <LineItemImage width={50} />
                  <div>
                    <LineItemName />
                    <div className='text-gray-500 text-sm'>
                      Unit price: <LineItemAmount type='unit' />
                    </div>
                  </div>
                  <div>
                    &times; <LineItemQuantity readonly />
                  </div>
                  <LineItemAmount className='text-right' />
                </div>
              </LineItem>
              <LineItemsEmpty>
                {({ quantity }) => (quantity > 0 ? null : <AddSampleItems />)}
              </LineItemsEmpty>
            </LineItemsContainer>
          </section>
        </OrderContainer>
      </OrderStorage>
    </CommerceLayer>
  )
}

export const CustomerAddresses: StoryFn = (args) => {
  const inputCss = 'border border-gray-300 p-2 rounded-md w-full'
  return (
    <CommerceLayer
      accessToken='my-access-token'
      endpoint='https://demo-store.commercelayer.io'
    >
      <OrderStorage persistKey='cl-examples-checkout1'>
        <OrderContainer>
          <section className='max-w-xl'>
            <CustomerContainer isGuest>
              <div className='mb-4'>
                <label htmlFor='customer_email'>Customer email</label>
                <CustomerInput
                  id='customer_email'
                  className={inputCss}
                  placeholder='email'
                  saveOnBlur
                  errorClassName='border-red-600'
                />
                <Errors resource='orders' field='customer_email' />
              </div>

              <AddressesContainer shipToDifferentAddress={false}>
                <BillingAddressForm>
                  <fieldset className='flex gap-4 w-full mb-4'>
                    <div className='flex-1'>
                      <label htmlFor='billing_address_first_name'>
                        First name
                      </label>
                      <AddressInput
                        id='billing_address_first_name'
                        name='billing_address_first_name'
                        type='text'
                        className={inputCss}
                      />
                      <Errors
                        resource='billing_address'
                        field='billing_address_first_name'
                      />
                    </div>

                    <div className='flex-1'>
                      <label htmlFor='billing_address_last_name'>
                        Last name
                      </label>
                      <AddressInput
                        id='billing_address_last_name'
                        name='billing_address_last_name'
                        type='text'
                        className={inputCss}
                      />
                      <Errors
                        resource='billing_address'
                        field='billing_address_last_name'
                      />
                    </div>
                  </fieldset>

                  <div className='mb-4'>
                    <label htmlFor='billing_address_line_1'>Address</label>
                    <AddressInput
                      id='billing_address_line_1'
                      name='billing_address_line_1'
                      type='text'
                      className={inputCss}
                    />
                    <Errors
                      resource='billing_address'
                      field='billing_address_line_1'
                    />
                  </div>

                  <fieldset className='flex gap-4 w-full mb-4'>
                    <div className='flex-1'>
                      <label htmlFor='billing_address_city'>City</label>
                      <AddressInput
                        id='billing_address_city'
                        name='billing_address_city'
                        type='text'
                        className={inputCss}
                      />
                      <Errors
                        resource='billing_address'
                        field='billing_address_city'
                      />
                    </div>

                    <div className='flex-1'>
                      <label htmlFor='billing_address_country_code'>City</label>
                      <AddressCountrySelector
                        data-cy='billing_address_country_code'
                        name='billing_address_country_code'
                        className={inputCss}
                        placeholder={{
                          value: '',
                          label: 'Country',
                          disabled: true
                        }}
                      />
                      <Errors
                        resource='billing_address'
                        field='billing_address_country_code'
                      />
                    </div>
                  </fieldset>

                  <fieldset className='flex gap-4 w-full mb-4'>
                    <div className='flex-1'>
                      <label htmlFor='billing_address_state_code'>State</label>
                      <AddressStateSelector
                        id='billing_address_state_code'
                        name='billing_address_state_code'
                        placeholder={{
                          value: '',
                          label: 'Select a state',
                          disabled: true
                        }}
                        className={inputCss}
                      />
                      <Errors
                        resource='billing_address'
                        field='billing_address_state_code'
                      />
                    </div>

                    <div className='flex-1'>
                      <label htmlFor='billing_address_zip_code'>Zip Code</label>
                      <AddressInput
                        id='billing_address_zip_code'
                        name='billing_address_zip_code'
                        type='text'
                        className={inputCss}
                      />
                      <Errors
                        resource='billing_address'
                        field='billing_address_zip_code'
                      />
                    </div>
                  </fieldset>

                  <div className='mb-4'>
                    <label htmlFor='billing_address_phone'>Phone number</label>
                    <AddressInput
                      id='billing_address_phone'
                      name='billing_address_phone'
                      type='tel'
                      className={inputCss}
                    />
                    <Errors
                      resource='billing_address'
                      field='billing_address_phone'
                    />
                  </div>
                </BillingAddressForm>

                <SaveAddressesButton
                  className='p-4 bg-black text-white rounded'
                  label='Save address'
                  onClick={() => {
                    console.log('Address updated')
                  }}
                />
              </AddressesContainer>
            </CustomerContainer>
          </section>
        </OrderContainer>
      </OrderStorage>
    </CommerceLayer>
  )
}

export const ShipmentMethods: StoryFn = (args) => {
  return (
    <CommerceLayer
      accessToken='my-access-token'
      endpoint='https://demo-store.commercelayer.io'
    >
      <OrderStorage persistKey='cl-examples-checkout1'>
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
