"use client"

import { useLiveQuery } from "dexie-react-hooks"
import { db, type ScheduleItem } from "@/lib/db"

export function useSchedule(date: string) {
  const schedule = useLiveQuery(
    () => db.schedule.where("date").equals(date).sortBy("order"),
    [date]
  )

  const addScheduleItem = async (item: Omit<ScheduleItem, "id" | "order" | "date">) => {
    const maxOrder = schedule?.length ?? 0
    await db.schedule.add({
      ...item,
      date,
      order: maxOrder,
    })
  }

  const updateScheduleItem = async (id: number, updates: Partial<ScheduleItem>) => {
    await db.schedule.update(id, updates)
  }

  const deleteScheduleItem = async (id: number) => {
    await db.schedule.delete(id)
  }

  return {
    schedule: schedule ?? [],
    isLoading: schedule === undefined,
    addScheduleItem,
    updateScheduleItem,
    deleteScheduleItem,
  }
}
