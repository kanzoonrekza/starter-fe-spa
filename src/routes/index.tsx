import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-2 text-2xl">
      <h3>Welcome Home!</h3>
    </div>
  )
}
