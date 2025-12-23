import Dexie, { type Table } from "dexie"

export interface QuickLink {
  id?: number
  title: string
  url: string
  color: string
  order: number
}

export interface Task {
  id?: number
  text: string
  completed: boolean
  date: string
  order: number
}

export interface ScheduleItem {
  id?: number
  time: string
  title: string
  type: "meeting" | "focus" | "break"
  date: string
  order: number
}

export interface FocusArea {
  id?: number
  type: "week" | "month" | "quarter"
  text: string
}

export interface Quote {
  id?: number
  text: string
}

class MorningCardDB extends Dexie {
  links!: Table<QuickLink>
  tasks!: Table<Task>
  schedule!: Table<ScheduleItem>
  focus!: Table<FocusArea>
  quotes!: Table<Quote>

  constructor() {
    super("MorningCardDB")
    this.version(1).stores({
      links: "++id, order",
      tasks: "++id, date, order",
      schedule: "++id, date, order",
      focus: "++id, type",
      quotes: "++id",
    })
  }
}

export const db = new MorningCardDB()
