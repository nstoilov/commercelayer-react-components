import type { Meta, StoryFn } from '@storybook/react'
import CommerceLayer from '../../_internals/CommerceLayer'
import CustomerContainer from '#components/customers/CustomerContainer'
import OrderList from '#components/orders/OrderList'
import OrderListEmpty from '#components/orders/OrderListEmpty'
import OrderListRow from '#components/orders/OrderListRow'

const setup: Meta = {
  title: 'Examples/Order list'
}

export default setup

export const Default: StoryFn = (args) => {
  const colClassName = 'uppercase text-left p-1 text-gray-400 text-sm'
  const titleClassName = 'flex flex-row items-center'

  const columns: React.ComponentProps<typeof OrderList>['columns'] = [
    {
      header: 'Order',
      accessorKey: 'number',
      className: colClassName,
      titleClassName
    },
    {
      header: 'Status',
      accessorKey: 'status',
      className: colClassName,
      titleClassName
    },
    {
      header: 'Date',
      accessorKey: 'updated_at',
      className: colClassName,
      titleClassName
    },
    {
      header: 'Amount',
      accessorKey: 'formatted_total_amount_with_taxes',
      className: colClassName,
      titleClassName
    }
  ]

  return (
    <CommerceLayer accessToken='user-access-token'>
      <CustomerContainer>
        <OrderList
          type='orders'
          className='table-fixed w-full border-collapse m-5 '
          columns={columns}
          theadClassName='thead-class bg-gray-100 [&>tr>th>span]:flex [&>tr>th>span]:gap-3 [&>tr>th>span]:py-3'
          rowTrClassName='row-tr-class'
        >
          <OrderListEmpty />

          <OrderListRow field='number'>
            {({ cell, order, ...p }) => {
              return (
                <>
                  {cell?.map((cell) => (
                    <div {...p} key={cell.id} className='py-5 border-b'>
                      <p className='font-bold'>
                        Order # {cell.renderValue<string>()}
                      </p>
                      {order.type === 'order_subscriptions' ? null : (
                        <p className='text-xs text-gray-500'>
                          contains {order.skus_count} items
                        </p>
                      )}
                    </div>
                  ))}
                </>
              )
            }}
          </OrderListRow>
          <OrderListRow field='status' className='align-top py-5 border-b' />
          <OrderListRow
            field='updated_at'
            className='align-top py-5 border-b'
          />
          <OrderListRow
            field='formatted_total_amount_with_taxes'
            className='align-top py-5 border-b font-bold'
          />
        </OrderList>
      </CustomerContainer>
    </CommerceLayer>
  )
}

Default.parameters = {
  docs: {
    source: {
      type: 'code'
    }
  }
}
