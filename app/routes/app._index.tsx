import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { authenticate } from '~/shopify.server'

export const meta: MetaFunction = () => {
  return [
    { title: 'Remix+Vite' },
    { name: 'description', content: 'Welcome to Remix+Vite!' },
  ]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request)

  return null
}

const linkStyle = 'underline decoration-dotted'
export default function Index() {
  return <div></div>
}
