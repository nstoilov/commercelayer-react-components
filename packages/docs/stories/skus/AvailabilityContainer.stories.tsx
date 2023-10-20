import type { Meta, StoryFn } from '@storybook/react'
import CommerceLayer from '../_internals/CommerceLayer'
import { AvailabilityContainer } from '#components/skus/AvailabilityContainer'
import { Code } from '../_internals/Code'

const setup: Meta<typeof AvailabilityContainer> = {
  title: 'Components/Skus/AvailabilityContainer',
  component: AvailabilityContainer
}

export default setup

const Template: StoryFn<typeof AvailabilityContainer> = (args) => {
  return (
    <CommerceLayer
      accessToken='my-access-token'
      endpoint='https://demo-store.commercelayer.io'
    >
      <AvailabilityContainer {...args}>
        <div>
          I am the availability container, responsible to fetch <Code>sku</Code>{' '}
          availability and <Code>delivery_lead_time</Code>
        </div>
      </AvailabilityContainer>
    </CommerceLayer>
  )
}

export const Default = Template.bind({})
Default.args = {
  skuCode: 'BABYONBU000000E63E7412MX',
  getQuantity: (quantity) => {
    console.log('quantity', quantity)
  }
}
