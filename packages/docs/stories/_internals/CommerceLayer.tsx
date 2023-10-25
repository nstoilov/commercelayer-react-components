import { type DefaultChildrenType } from '#typings/globals'
import CommerceLayerComponent from '#components/auth/CommerceLayer'
import { useGetToken } from './useGetToken'

interface Props {
  children: DefaultChildrenType
  accessToken: string
  endpoint?: string
}

/**
 * Custom setup for the `CommerceLayer` component that can be used in Storybook.
 * without exposing the `accessToken` and `endpoint` props.
 */
function CommerceLayer({ children, ...props }: Props): JSX.Element {
  const { accessToken, endpoint } = useGetToken({
    userMode: props.accessToken === 'user-access-token'
  })

  return (
    <CommerceLayerComponent accessToken={accessToken} endpoint={endpoint}>
      {children}
    </CommerceLayerComponent>
  )
}

export default CommerceLayer
