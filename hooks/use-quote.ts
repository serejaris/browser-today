"use client"

import { useLiveQuery } from "dexie-react-hooks"
import { db } from "@/lib/db"

export function useQuote() {
  const quotes = useLiveQuery(() => db.quotes.toArray())
  const quote = quotes?.[0]

  const setQuote = async (text: string) => {
    if (quote?.id) {
      await db.quotes.update(quote.id, { text })
    } else {
      await db.quotes.add({ text })
    }
  }

  return {
    quote: quote?.text ?? "",
    isLoading: quotes === undefined,
    setQuote,
  }
}
