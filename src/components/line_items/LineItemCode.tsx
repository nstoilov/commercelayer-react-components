import { useContext } from 'react'
import LineItemChildrenContext from '#context/LineItemChildrenContext'
import Parent from '#components-utils/Parent'

import { LineItem } from '@commercelayer/sdk'

export type LineItemCodeType = Omit<Props, 'children'> & {
  lineItem: LineItem
  skuCode: string
}

type Props = {
  children?: (props: LineItemCodeType) => JSX.Element
  type?: 'sku_code' | 'bundle_code'
} & JSX.IntrinsicElements['p']

export function LineItemCode({ type = 'sku_code', children, ...p }: Props) {
  const { lineItem } = useContext(LineItemChildrenContext)
  const labelName = lineItem?.[type]
  const parentProps = {
    lineItem,
    skuCode: labelName,
    ...p,
  }
  return children ? (
    <Parent {...parentProps}>{children}</Parent>
  ) : (
    <p {...p}>{labelName}</p>
  )
}

export default LineItemCode