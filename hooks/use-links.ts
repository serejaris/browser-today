"use client"

import { useLiveQuery } from "dexie-react-hooks"
import { db, type QuickLink } from "@/lib/db"

export function useLinks() {
  const links = useLiveQuery(() => db.links.orderBy("order").toArray())

  const addLink = async (link: Omit<QuickLink, "id" | "order">) => {
    const maxOrder = links?.length ?? 0
    await db.links.add({
      ...link,
      order: maxOrder,
    })
  }

  const updateLink = async (id: number, updates: Partial<QuickLink>) => {
    await db.links.update(id, updates)
  }

  const deleteLink = async (id: number) => {
    await db.links.delete(id)
  }

  return {
    links: links ?? [],
    isLoading: links === undefined,
    addLink,
    updateLink,
    deleteLink,
  }
}
