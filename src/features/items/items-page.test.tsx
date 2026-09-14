import { afterEach, expect, test, vi } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { api } from "@/api/client"
import { ItemsPage } from "./items-page"

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

function renderPage() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <ItemsPage />
    </QueryClientProvider>,
  )
}

test("loads, creates, and refreshes items", async () => {
  vi.spyOn(api, "get")
    .mockResolvedValueOnce({ data: [] })
    .mockResolvedValue({ data: [{ id: 1, name: "Example" }] })
  const post = vi
    .spyOn(api, "post")
    .mockResolvedValue({ data: { id: 1, name: "Example" } })
  renderPage()
  expect(screen.getByText("Loading items…")).toBeTruthy()
  await screen.findByText("No items yet.")
  const user = userEvent.setup()
  await user.type(screen.getByLabelText("Name"), "Example")
  await user.click(screen.getByRole("button", { name: "Add item" }))
  await screen.findByText("Example")
  expect(post).toHaveBeenCalledWith("/items", { name: "Example" })
})

test("shows a recoverable query error", async () => {
  vi.spyOn(api, "get")
    .mockRejectedValueOnce(new Error("offline"))
    .mockResolvedValue({ data: [] })
  renderPage()
  await screen.findByRole("alert")
  await userEvent.setup().click(screen.getByRole("button", { name: "Retry" }))
  await screen.findByText("No items yet.")
})
