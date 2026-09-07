import { QueryClient } from "@tanstack/react-query"
import axios from "axios"

export function shouldRetry(failureCount: number, error: Error): boolean {
  const status = axios.isAxiosError(error) ? error.response?.status : undefined
  if (status && status >= 400 && status < 500) return false
  return failureCount < 2
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: shouldRetry,
    },
    mutations: { retry: false },
  },
})
