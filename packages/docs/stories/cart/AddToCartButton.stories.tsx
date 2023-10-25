import type { Meta, StoryFn } from '@storybook/react'
import CommerceLayer from '../_internals/CommerceLayer'
import OrderContainerComponent from '#components/orders/OrderContainer'
import { AddToCartButton } from '#components/orders/AddToCartButton'
import OrderStorage from '#components/orders/OrderStorage'
import LineItemsContainer from '#components/line_items/LineItemsContainer'
import Errors from '#components/errors/Errors'
import LineItemName from '#components/line_items/LineItemName'
import LineItem from '#components/line_items/LineItem'
import LineItemQuantity from '#components/line_items/LineItemQuantity'
import LineItemRemoveLink from '#components/line_items/LineItemRemoveLink'
import LineItemsEmpty from '#components/line_items/LineItemsEmpty'

const setup: Meta<typeof AddToCartButton> = {
  title: 'Components/Cart/AddToCartButton',
  component: AddToCartButton
}

export default setup

const Template: StoryFn<typeof AddToCartButton> = (args) => {
  return (
    <CommerceLayer accessToken='my-access-token'>
      <OrderStorage persistKey='cl-examples-addToCart'>
        <OrderContainer>
          <AddToCartButton {...args} />
        </OrderContainer>
      </OrderStorage>
    </CommerceLayer>
  )
}

export const AddSku = Template.bind({})
AddSku.args = {
  skuCode: 'SWEATWCX000000FFFFFFXSXX',
  label: 'Add SKU to cart',
  quantity: '2',
  className: 'px-3 py-2 bg-black text-white rounded disabled:opacity-50'
}

export const AddBundle = Template.bind({})
AddBundle.args = {
  bundleCode: 'BUNDLE001',
  label: 'Add bundle to cart',
  quantity: '2',
  className: 'px-3 py-2 bg-black text-white rounded disabled:opacity-50'
}

const OrderContainer: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <OrderContainerComponent>
      <>{children}</>

      <div className='mt-8 block'>
        <LineItemsContainer>
          <LineItemsEmpty text='Cart is empty' />
          <div>
            {(['skus', 'bundles'] as const).map((type) => (
              <LineItem type={type} key={type}>
                <div className='flex gap-4 items-center mb-2'>
                  <div className='flex' />
                  <LineItemName />
                  <LineItemQuantity>
                    {({ quantity }) => <span>(&times;{quantity})</span>}
                  </LineItemQuantity>

                  <LineItemRemoveLink className='ml-auto px-2 text-sm rounded bg-red-500 text-white' />
                </div>
              </LineItem>
            ))}
          </div>
          <Errors resource='orders' />
        </LineItemsContainer>
      </div>
    </OrderContainerComponent>
  )
}
