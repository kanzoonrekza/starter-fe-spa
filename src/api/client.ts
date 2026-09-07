import axios from "axios"

export type ApiError = { message?: string }

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30_000,
})

export function resolveServerMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiError | undefined
    return data?.message ?? error.message
  }
  return "An unexpected error occurred."
}
