"use client"

import { useLiveQuery } from "dexie-react-hooks"
import { db, type Task } from "@/lib/db"

export function useTasks(date: string) {
  const tasks = useLiveQuery(
    () => db.tasks.where("date").equals(date).sortBy("order"),
    [date]
  )

  const addTask = async (text: string) => {
    const maxOrder = tasks?.length ?? 0
    await db.tasks.add({
      text,
      completed: false,
      date,
      order: maxOrder,
    })
  }

  const updateTask = async (id: number, updates: Partial<Task>) => {
    await db.tasks.update(id, updates)
  }

  const deleteTask = async (id: number) => {
    await db.tasks.delete(id)
  }

  const toggleTask = async (id: number) => {
    const task = await db.tasks.get(id)
    if (task) {
      await db.tasks.update(id, { completed: !task.completed })
    }
  }

  return {
    tasks: tasks ?? [],
    isLoading: tasks === undefined,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  }
}
