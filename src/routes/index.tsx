import { createFileRoute } from "@tanstack/react-router"
import { ItemsPage } from "@/features/items/items-page"

export const Route = createFileRoute("/")({ component: ItemsPage })
