import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  timeout: 30_000,
})

export function resolveServerMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data: unknown = error.response?.data
    if (typeof data === "object" && data !== null && "message" in data && typeof data.message === "string") {
      return data.message
    }
    return error.message
  }
  return "An unexpected error occurred."
}
