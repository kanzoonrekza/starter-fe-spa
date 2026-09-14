import { queryOptions } from "@tanstack/react-query"
import { api } from "@/api/client"

export type Item = { id: number; name: string }

export const itemsQuery = queryOptions({
  queryKey: ["items"],
  queryFn: async ({ signal }) =>
    (await api.get<Item[]>("/items", { signal, params: { limit: 100 } })).data,
})

export async function createItem(name: string): Promise<Item> {
  return (await api.post<Item>("/items", { name })).data
}
