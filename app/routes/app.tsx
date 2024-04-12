import { AppProvider } from '@shopify/shopify-app-remix/react'
import { Outlet, json, useLoaderData, useRouteError } from '@remix-run/react'
import { authenticate } from '~/shopify.server'
import { HeadersFunction, LoaderFunctionArgs } from '@remix-run/node'
import { boundary } from '@shopify/shopify-app-remix'

// export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request)

  return json({ apiKey: process.env.SHOPIFY_API_KEY || '' })
}

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>()

  return (
    <AppProvider isEmbeddedApp={false} apiKey={apiKey}>
      <Outlet />
    </AppProvider>
  )
}

export function ErrorBoundary() {
  return boundary.error(useRouteError())
}

export const headers: HeadersFunction = headersArgs => {
  return boundary.headers(headersArgs)
}
