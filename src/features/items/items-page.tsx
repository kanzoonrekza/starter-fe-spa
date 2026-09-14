import { useState, type FormEvent } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { resolveServerMessage } from "@/api/client"
import { Button } from "@/components/ui/button"
import { createItem, itemsQuery } from "./api"

export function ItemsPage() {
  const [name, setName] = useState("")
  const client = useQueryClient()
  const items = useQuery(itemsQuery)
  const create = useMutation({
    mutationFn: createItem,
    onSuccess: async () => {
      setName("")
      await client.invalidateQueries({ queryKey: itemsQuery.queryKey })
    },
  })

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (name.trim() && !create.isPending) create.mutate(name.trim())
  }

  return (
    <main className="mx-auto max-w-xl space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Items</h1>
      <p className="text-muted-foreground">Reference feature: create an item and load it from either backend.</p>
      <form onSubmit={submit} className="space-y-2">
        <label htmlFor="item-name" className="block font-medium">Name</label>
        <input id="item-name" value={name} onChange={(event) => setName(event.target.value)} required maxLength={100} disabled={create.isPending} className="border-input focus-visible:ring-ring w-full rounded-md border p-2 focus-visible:ring-2" />
        <Button type="submit" disabled={create.isPending || !name.trim()}>{create.isPending ? "Adding…" : "Add item"}</Button>
        {create.isError && <p role="alert">{resolveServerMessage(create.error)}</p>}
        {create.isSuccess && <p role="status">Item added.</p>}
      </form>
      {items.isPending && <p role="status">Loading items…</p>}
      {items.isError && <div role="alert"><p>{resolveServerMessage(items.error)}</p><Button onClick={() => void items.refetch()}>Retry</Button></div>}
      {items.data && (items.data.length ? <ul className="space-y-2">{items.data.map((item) => <li key={item.id}>{item.name}</li>)}</ul> : <p>No items yet.</p>)}
      {/* ponytail: reference UI shows the first 100 items; add paging controls for a real collection. */}
      {items.data?.length === 100 && <p>Showing the first 100 items.</p>}
    </main>
  )
}
