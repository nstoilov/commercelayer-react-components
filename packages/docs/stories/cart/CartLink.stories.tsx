import type { Meta, StoryFn } from '@storybook/react'
import CommerceLayer from '../_internals/CommerceLayer'
import OrderContainer from '#components/orders/OrderContainer'
import CartLink from '#components/orders/CartLink'
import { HostedCart } from '#components/orders/HostedCart'
import { OrderStorage } from '../_internals/OrderStorage'

const setup: Meta<typeof CartLink> = {
  title: 'Components/Cart/CartLink',
  component: CartLink
}

export default setup

const Template: StoryFn<typeof CartLink> = (args) => {
  return (
    <CommerceLayer accessToken='my-access-token'>
      <OrderContainer orderId='BXVhDoxVpx'>
        <CartLink {...args} />
      </OrderContainer>
    </CommerceLayer>
  )
}

export const Default = Template.bind({})
Default.args = {
  label: 'Go to cart',
  target: '_blank',
  onClick: () => {},
  className: 'underline hover:text-blue-500'
}

/**
 * <span title='Mini cart' type='info'>
 * You can use this component to open the mini cart, by setting the `type` prop to `mini`.
 * It requires the `<HostedCart type='mini' />` component to be on the same page.
 * </span>
 */
export const MiniCart: StoryFn<typeof CartLink> = (arg) => {
  return (
    <OrderContainer>
      <HostedCart
        type='mini'
        openAdd
        style={{
          container: {
            backgroundColor: 'white'
          }
        }}
      />
      <CartLink
        label='Open mini cart'
        type='mini'
        className='underline hover:text-blue-500'
      />
    </OrderContainer>
  )
}

MiniCart.decorators = [
  (Story) => {
    return (
      <CommerceLayer
        accessToken='my-access-token'
        endpoint='https://demo-store.commercelayer.io'
      >
        <OrderStorage persistKey='cl-examples1-cartId'>
          <div className='min-h-[600px]'>
            {/* we need more space on the canvas to open the mini cart */}
            <Story />
          </div>
        </OrderStorage>
      </CommerceLayer>
    )
  }
]
