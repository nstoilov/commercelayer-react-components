import { authentication } from '@commercelayer/js-auth'
import { useEffect, useMemo, useState } from 'react'
import Cookie from 'js-cookie'
import { type TBaseReturn } from '@commercelayer/js-auth/lib/esm/types'
import jwtDecode from 'jwt-decode'

interface UseGetTokenOptions {
  userMode?: boolean
}

const salesChannel = {
  clientId: '48ee4802f8227b04951645a9b7c8af1e3943efec7edd1dcfd04b5661bf1da5db',
  slug: 'the-blue-brand-3',
  scope: 'market:58',
  domain: 'commercelayer.co'
}

const customer = {
  username: 'bruce@wayne.com',
  password: '123456'
}

const COOKIE_KEY = `clToken:${salesChannel.slug}`

export function useGetToken<T extends UseGetTokenOptions>(
  options?: T
): {
  accessToken: string
  endpoint: string
} {
  const [accessToken, setAccessToken] = useState(Cookie.get(COOKIE_KEY) ?? '')
  const clientId = salesChannel.clientId
  const slug = salesChannel.slug
  const scope = salesChannel.scope
  const domain = salesChannel.domain
  const user =
    options?.userMode != null
      ? {
          username: customer.username,
          password: customer.password
        }
      : undefined

  const initToken = useMemo(() => {
    return async () => {
      await generateNewToken({
        clientId,
        slug,
        scope,
        domain,
        user
      }).then(({ accessToken, expires }) => {
        setAccessToken(accessToken)
        Cookie.set(COOKIE_KEY, accessToken, { expires })
      })
    }
  }, [])

  useEffect(() => {
    if (
      accessToken == null ||
      accessToken === '' ||
      isTokenExpired({ accessToken, compareTo: new Date() })
    ) {
      void initToken()
    }
  }, [accessToken])

  return {
    accessToken,
    endpoint: `https://${slug}.${domain}`
  }
}

async function generateNewToken({
  clientId,
  slug,
  scope,
  domain,
  user
}: {
  clientId: string
  slug: string
  scope: string
  domain: string
  user?: { username: string; password: string }
}): Promise<TBaseReturn> {
  return user == null
    ? await authentication('client_credentials', {
        clientId,
        slug,
        scope,
        domain
      })
    : await authentication('password', {
        clientId,
        slug,
        scope,
        domain,
        ...user
      })
}

function isTokenExpired({
  accessToken,
  compareTo
}: {
  accessToken?: string
  compareTo: Date
}): boolean {
  if (accessToken == null || accessToken === '') {
    return true
  }

  const { exp } = jwtDecode<{ exp: number }>(accessToken)

  if (exp == null) {
    return true
  }

  const nowTime = Math.trunc(compareTo.getTime() / 1000)
  return nowTime > exp
}
