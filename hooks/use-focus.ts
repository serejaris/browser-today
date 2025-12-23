"use client"

import { useLiveQuery } from "dexie-react-hooks"
import { db, type FocusArea } from "@/lib/db"

export function useFocus() {
  const focusAreas = useLiveQuery(() => db.focus.toArray())

  const getFocus = (type: FocusArea["type"]) => {
    return focusAreas?.find((f) => f.type === type)
  }

  const setFocus = async (type: FocusArea["type"], text: string) => {
    const existing = focusAreas?.find((f) => f.type === type)
    if (existing?.id) {
      await db.focus.update(existing.id, { text })
    } else {
      await db.focus.add({ type, text })
    }
  }

  return {
    weekFocus: getFocus("week")?.text ?? "",
    monthFocus: getFocus("month")?.text ?? "",
    quarterFocus: getFocus("quarter")?.text ?? "",
    isLoading: focusAreas === undefined,
    setFocus,
  }
}
