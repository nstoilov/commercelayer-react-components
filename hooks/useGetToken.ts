import { getSalesChannelToken } from '@commercelayer/js-auth'
import { useEffect, useState } from 'react'

type UseGetTokenOptions = { userMode?: boolean }

export default function useGetToken<T extends UseGetTokenOptions>(
  options?: T
): {
  accessToken: string
  endpoint: string
} {
  const [token, setToken] = useState('')
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID as string
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT as string
  const scope = process.env.NEXT_PUBLIC_SCOPE as string
  const user = options?.userMode
    ? {
        username: process.env.NEXT_PUBLIC_USERNAME as string,
        password: process.env.NEXT_PUBLIC_PASSWORD as string,
      }
    : undefined
  useEffect(() => {
    const getToken = async () => {
      const token = await getSalesChannelToken(
        {
          clientId,
          endpoint,
          scope,
        },
        user
      )
      if (token) setToken(token.accessToken)
    }
    getToken()
  }, [])
  return {
    accessToken: token,
    endpoint,
  }
}