import type { Meta, StoryFn } from '@storybook/react'
import CommerceLayer from '../_internals/CommerceLayer'
import { Skus } from '#components/skus/Skus'
import { SkusContainer } from '#components/skus/SkusContainer'
import { SkuField } from '#components/skus/SkuField'
import { AvailabilityContainer } from '#components/skus/AvailabilityContainer'
import AvailabilityTemplate from '#components/skus/AvailabilityTemplate'
import Price from '#components/prices/Price'
import PricesContainer from '#components/prices/PricesContainer'
import OrderContainer from '#components/orders/OrderContainer'
import AddToCartButton from '#components/orders/AddToCartButton'
import OrderStorage from '#components/orders/OrderStorage'
import LineItemsContainer from '#components/line_items/LineItemsContainer'
import Errors from '#components/errors/Errors'
import LineItemName from '#components/line_items/LineItemName'
import LineItem from '#components/line_items/LineItem'
import LineItemQuantity from '#components/line_items/LineItemQuantity'
import LineItemRemoveLink from '#components/line_items/LineItemRemoveLink'
import LineItemsEmpty from '#components/line_items/LineItemsEmpty'

const setup: Meta = {
  title: 'Examples/Listing Page'
}

export default setup

export const Default: StoryFn = (args) => {
  return (
    <CommerceLayer
      accessToken='my-access-token'
      endpoint='https://demo-store.commercelayer.io'
    >
      <OrderStorage persistKey='cl-examples-skus-orderId'>
        <OrderContainer>
          <SkusContainer
            skus={['CROPTOPWFFFFFF000000XSXX', 'POLOMXXX000000FFFFFFLXXX']}
          >
            <Skus>
              <div className='flex gap-4 mb-8 pb-8 border-b items-start'>
                <SkuField attribute='image_url' tagElement='img' width={100} />
                <div>
                  <SkuField
                    attribute='name'
                    tagElement='h1'
                    className='block font-bold'
                  />
                  <SkuField
                    attribute='description'
                    tagElement='p'
                    className='mb-2'
                  />

                  <PricesContainer>
                    <Price compareClassName='line-through ml-2' />
                  </PricesContainer>

                  <div className='my-2'>
                    <AddToCartButton className='px-3 py-2 bg-black text-white rounded disabled:opacity-50' />
                  </div>

                  <AvailabilityContainer>
                    <AvailabilityTemplate
                      timeFormat='days'
                      className='text-sm'
                      showShippingMethodName
                    />
                  </AvailabilityContainer>
                </div>
              </div>
            </Skus>
          </SkusContainer>

          {/* cart */}
          <div
            id='cart-recap'
            className='p-8 border rounded bg-gray-100 max-w-md'
          >
            <LineItemsContainer>
              <LineItemsEmpty text='Cart is empty' />
              <LineItem type='skus'>
                <div className='flex gap-4 items-center mb-2'>
                  <div className='flex' />
                  <LineItemName />
                  <LineItemQuantity>
                    {({ quantity }) => <span>(&times;{quantity})</span>}
                  </LineItemQuantity>

                  <LineItemRemoveLink className='ml-auto px-2 text-sm rounded bg-red-500 text-white' />
                </div>
              </LineItem>
              <Errors resource='orders' />
            </LineItemsContainer>
          </div>
        </OrderContainer>
      </OrderStorage>
    </CommerceLayer>
  )
}