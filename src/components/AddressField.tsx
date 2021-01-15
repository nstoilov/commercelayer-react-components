import React, { useContext, FunctionComponent, ReactNode } from 'react'
import AddressChildrenContext from '@context/AddressChildrenContext'
import Parent from './utils/Parent'
import components from '@config/components'
import { AddressFieldView } from '@reducers/AddressReducer'
import _ from 'lodash'

const propTypes = components.AddressField.propTypes
const displayName = components.AddressField.displayName

type AddressFieldChildrenProps = Omit<AddressFieldProps, 'children'>

type AddressFieldProps = {
  children?: (props: AddressFieldChildrenProps) => ReactNode
  name: AddressFieldView
} & JSX.IntrinsicElements['p']

const AddressField: FunctionComponent<AddressFieldProps> = (props) => {
  const { name } = props
  const { address } = useContext(AddressChildrenContext)
  const key = _.camelCase(name)
  const text = _.get(address, key)
  const parentProps = {
    ...props,
  }
  return props.children ? (
    <Parent {...parentProps}>{props.children}</Parent>
  ) : (
    <p {...props}>{text}</p>
  )
}

AddressField.propTypes = propTypes
AddressField.displayName = displayName

export default AddressField