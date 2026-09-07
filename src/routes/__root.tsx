import {
  createRootRoute,
  Link,
  Outlet,
  type ErrorComponentProps,
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { Button } from "@/components/ui/button"

const RootLayout = () => (
  <>
    <div className="flex gap-2 p-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </>
)

const NotFound = () => (
  <div className="space-y-4 p-8">
    <h1 className="text-2xl font-bold">404</h1>
    <p className="text-muted-foreground">This page doesn't exist.</p>
    <Button render={<Link to="/" />}>Go home</Button>
  </div>
)

const ErrorPage = ({ error, reset }: ErrorComponentProps) => (
  <div className="space-y-4 p-8">
    <h1 className="text-2xl font-bold">Something went wrong</h1>
    <pre className="text-muted-foreground overflow-auto text-sm">
      {error.message}
    </pre>
    <Button onClick={reset}>Try again</Button>
  </div>
)

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
  errorComponent: ErrorPage,
})
