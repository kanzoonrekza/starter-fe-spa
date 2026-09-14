import { AxiosError } from "axios"
import { expect, test } from "vitest"
import { resolveServerMessage } from "./client"
import { shouldRetry } from "./query-client"

test("errors tolerate malformed responses and retries stop on client errors", () => {
  const error = new AxiosError("Bad request")
  error.response = {
    status: 422,
    data: { message: "Invalid request." },
    statusText: "",
    headers: {},
    config: { headers: {} },
  } as AxiosError["response"]
  expect(resolveServerMessage(error)).toBe("Invalid request.")
  expect(shouldRetry(0, error)).toBe(false)
  error.response!.data = { message: { unsafe: true } }
  expect(resolveServerMessage(error)).toBe("Bad request")
  error.response!.status = 500
  expect(shouldRetry(0, error)).toBe(true)
  expect(shouldRetry(2, error)).toBe(false)
  expect(resolveServerMessage(null)).toBe("An unexpected error occurred.")
})
