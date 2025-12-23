"use client"

import { useState } from "react"
import { Check, Circle, Target, Calendar, Sparkles, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const WEEKDAYS_RU = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]

const MONTHS_RU = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
]

interface Task {
  id: number
  text: string
  completed: boolean
}

interface ScheduleItem {
  time: string
  title: string
  type: "meeting" | "focus" | "break"
}

interface QuickLink {
  title: string
  url: string
  color: string
}

const quickLinks: QuickLink[] = [
  { title: "Gmail", url: "https://mail.google.com", color: "bg-red-500/10 hover:bg-red-500/20 border-red-500/20" },
  {
    title: "Calendar",
    url: "https://calendar.google.com",
    color: "bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20",
  },
  {
    title: "Notion",
    url: "https://notion.so",
    color: "bg-neutral-500/10 hover:bg-neutral-500/20 border-neutral-500/20",
  },
  { title: "Slack", url: "https://slack.com", color: "bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20" },
  {
    title: "GitHub",
    url: "https://github.com",
    color: "bg-neutral-500/10 hover:bg-neutral-500/20 border-neutral-500/20",
  },
  { title: "Figma", url: "https://figma.com", color: "bg-pink-500/10 hover:bg-pink-500/20 border-pink-500/20" },
  { title: "Linear", url: "https://linear.app", color: "bg-indigo-500/10 hover:bg-indigo-500/20 border-indigo-500/20" },
  {
    title: "Drive",
    url: "https://drive.google.com",
    color: "bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-500/20",
  },
]

export function MorningCard() {
  const now = new Date()
  const dayOfWeek = WEEKDAYS_RU[now.getDay()]
  const day = now.getDate()
  const month = MONTHS_RU[now.getMonth()]
  const year = now.getFullYear()

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Завершить презентацию проекта", completed: false },
    { id: 2, text: "Созвон с командой в 14:00", completed: false },
    { id: 3, text: "Отправить отчёт за неделю", completed: false },
  ])

  const schedule: ScheduleItem[] = [
    { time: "09:00", title: "Планирование дня", type: "focus" },
    { time: "10:30", title: "Статус-митинг", type: "meeting" },
    { time: "12:00", title: "Работа над проектом", type: "focus" },
    { time: "14:00", title: "Созвон с командой", type: "meeting" },
    { time: "16:00", title: "Перерыв", type: "break" },
    { time: "17:00", title: "Ревью задач", type: "focus" },
  ]

  const weekFocus = "Запуск нового продукта. Фокус на качестве и деталях."
  const monthFocus = "Закрыть квартальные OKR. Подготовить демо для инвесторов."
  const quarterFocus = "Масштабирование продукта на 3 новых рынка. Удвоение команды разработки."
  const quote = "Делай сегодня то, что другие не хотят — завтра будешь жить так, как другие не могут."

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const getTypeStyles = (type: ScheduleItem["type"]) => {
    switch (type) {
      case "meeting":
        return "bg-accent/20 border-accent/30"
      case "focus":
        return "bg-primary/10 border-primary/20"
      case "break":
        return "bg-muted border-border"
    }
  }

  return (
    <div className="w-full max-w-7xl">
      <nav className="mb-8">
        <div className="flex flex-wrap gap-2">
          {quickLinks.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200",
                "flex items-center gap-2",
                link.color,
              )}
            >
              {link.title}
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          ))}
        </div>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-muted-foreground text-sm tracking-widest uppercase mb-2">Morning Card</p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">{dayOfWeek}</h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-light mt-1">
          {day} {month} {year}
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Tasks */}
        <section className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Ключевые задачи</h2>
          </div>
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 text-left",
                  "hover:bg-card hover:shadow-sm",
                  task.completed ? "bg-muted/50 border-border" : "bg-card border-border",
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                    task.completed ? "bg-accent border-accent" : "border-muted-foreground/40",
                  )}
                >
                  {task.completed && <Check className="w-3.5 h-3.5 text-accent-foreground" />}
                </div>
                <div className="flex-1">
                  <span
                    className={cn("text-base transition-all", task.completed && "line-through text-muted-foreground")}
                  >
                    <span className="text-muted-foreground mr-2">{index + 1}.</span>
                    {task.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Middle Column - Schedule */}
        <section className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Календарь дня</h2>
          </div>
          <div className="space-y-2">
            {schedule.map((item, index) => (
              <div key={index} className={cn("p-3 rounded-lg border transition-all", getTypeStyles(item.type))}>
                <p className="text-xs font-mono text-muted-foreground mb-1">{item.time}</p>
                <p className="text-sm font-medium text-foreground leading-tight">{item.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column - Focus Areas & Quote */}
        <section className="lg:col-span-1 space-y-6">
          {/* Week Focus */}
          <div className="border-l-2 border-accent pl-4 py-1">
            <div className="flex items-center gap-2 mb-2">
              <Circle className="w-3 h-3 fill-accent text-accent" />
              <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Фокус недели</h2>
            </div>
            <p className="text-foreground leading-relaxed">{weekFocus}</p>
          </div>

          {/* Month Focus */}
          <div className="border-l-2 border-primary/60 pl-4 py-1">
            <div className="flex items-center gap-2 mb-2">
              <Circle className="w-3 h-3 fill-primary/60 text-primary/60" />
              <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Фокус месяца</h2>
            </div>
            <p className="text-foreground/90 text-sm leading-relaxed">{monthFocus}</p>
          </div>

          {/* Quarter Focus */}
          <div className="border-l-2 border-muted-foreground/40 pl-4 py-1">
            <div className="flex items-center gap-2 mb-2">
              <Circle className="w-3 h-3 fill-muted-foreground/40 text-muted-foreground/40" />
              <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Фокус квартала</h2>
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed">{quarterFocus}</p>
          </div>

          {/* Quote */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground italic text-sm leading-relaxed">"{quote}"</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
