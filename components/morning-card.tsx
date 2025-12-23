"use client"

import { useState } from "react"
import {
  Check,
  Circle,
  Target,
  Calendar,
  Sparkles,
  ExternalLink,
  Plus,
  X,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTasks } from "@/hooks/use-tasks"
import { useLinks } from "@/hooks/use-links"
import { useSchedule } from "@/hooks/use-schedule"
import { useFocus } from "@/hooks/use-focus"
import { useQuote } from "@/hooks/use-quote"
import { EditableText } from "@/components/editable-text"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const WEEKDAYS_RU = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
]

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

const LINK_COLORS = [
  { name: "Красный", value: "bg-red-500/10 hover:bg-red-500/20 border-red-500/20" },
  { name: "Синий", value: "bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20" },
  { name: "Зелёный", value: "bg-green-500/10 hover:bg-green-500/20 border-green-500/20" },
  { name: "Фиолетовый", value: "bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20" },
  { name: "Розовый", value: "bg-pink-500/10 hover:bg-pink-500/20 border-pink-500/20" },
  { name: "Жёлтый", value: "bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-500/20" },
  { name: "Индиго", value: "bg-indigo-500/10 hover:bg-indigo-500/20 border-indigo-500/20" },
  { name: "Серый", value: "bg-neutral-500/10 hover:bg-neutral-500/20 border-neutral-500/20" },
]

export function MorningCard() {
  const now = new Date()
  const dayOfWeek = WEEKDAYS_RU[now.getDay()]
  const day = now.getDate()
  const month = MONTHS_RU[now.getMonth()]
  const year = now.getFullYear()
  const todayISO = now.toISOString().split("T")[0]

  const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTasks(todayISO)
  const { links, addLink, updateLink, deleteLink } = useLinks()
  const { schedule, addScheduleItem, updateScheduleItem, deleteScheduleItem } =
    useSchedule(todayISO)
  const { weekFocus, monthFocus, quarterFocus, setFocus } = useFocus()
  const { quote, setQuote } = useQuote()

  const [newTaskText, setNewTaskText] = useState("")
  const [newLink, setNewLink] = useState({ title: "", url: "", color: LINK_COLORS[0].value })
  const [newSchedule, setNewSchedule] = useState({
    time: "09:00",
    title: "",
    type: "focus" as const,
  })
  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false)
  const [schedulePopoverOpen, setSchedulePopoverOpen] = useState(false)
  const [editingLinkId, setEditingLinkId] = useState<number | null>(null)
  const [editingScheduleId, setEditingScheduleId] = useState<number | null>(null)

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      addTask(newTaskText.trim())
      setNewTaskText("")
    }
  }

  const handleAddLink = () => {
    if (newLink.title.trim() && newLink.url.trim()) {
      let url = newLink.url.trim()
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url
      }
      addLink({ title: newLink.title.trim(), url, color: newLink.color })
      setNewLink({ title: "", url: "", color: LINK_COLORS[0].value })
      setLinkPopoverOpen(false)
    }
  }

  const handleUpdateLink = (id: number) => {
    if (newLink.title.trim() && newLink.url.trim()) {
      let url = newLink.url.trim()
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url
      }
      updateLink(id, { title: newLink.title.trim(), url, color: newLink.color })
      setNewLink({ title: "", url: "", color: LINK_COLORS[0].value })
      setEditingLinkId(null)
    }
  }

  const handleAddSchedule = () => {
    if (newSchedule.title.trim()) {
      addScheduleItem({
        time: newSchedule.time,
        title: newSchedule.title.trim(),
        type: newSchedule.type,
      })
      setNewSchedule({ time: "09:00", title: "", type: "focus" })
      setSchedulePopoverOpen(false)
    }
  }

  const handleUpdateSchedule = (id: number) => {
    if (newSchedule.title.trim()) {
      updateScheduleItem(id, {
        time: newSchedule.time,
        title: newSchedule.title.trim(),
        type: newSchedule.type,
      })
      setNewSchedule({ time: "09:00", title: "", type: "focus" })
      setEditingScheduleId(null)
    }
  }

  const getTypeStyles = (type: "meeting" | "focus" | "break") => {
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
      {/* Quick Links */}
      <nav className="mb-8">
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <div key={link.id} className="group relative">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200",
                  "flex items-center gap-2",
                  link.color
                )}
              >
                {link.title}
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
              <div className="absolute -top-1 -right-1 hidden group-hover:flex gap-1">
                <Popover
                  open={editingLinkId === link.id}
                  onOpenChange={(open) => {
                    if (open) {
                      setNewLink({ title: link.title, url: link.url, color: link.color })
                      setEditingLinkId(link.id!)
                    } else {
                      setEditingLinkId(null)
                    }
                  }}
                >
                  <PopoverTrigger asChild>
                    <button className="w-5 h-5 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                      <span className="text-xs">✏️</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="space-y-3">
                      <Input
                        placeholder="Название"
                        value={newLink.title}
                        onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                      />
                      <Input
                        placeholder="URL"
                        value={newLink.url}
                        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                      />
                      <Select
                        value={newLink.color}
                        onValueChange={(value) => setNewLink({ ...newLink, color: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {LINK_COLORS.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button onClick={() => handleUpdateLink(link.id!)} className="w-full">
                        Сохранить
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <button
                  onClick={() => deleteLink(link.id!)}
                  className="w-5 h-5 bg-destructive/80 rounded-full flex items-center justify-center hover:bg-destructive transition-colors"
                >
                  <X className="w-3 h-3 text-destructive-foreground" />
                </button>
              </div>
            </div>
          ))}
          <Popover open={linkPopoverOpen} onOpenChange={setLinkPopoverOpen}>
            <PopoverTrigger asChild>
              <button className="px-4 py-2 rounded-lg border border-dashed border-muted-foreground/30 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Добавить ссылку
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-3">
                <Input
                  placeholder="Название"
                  value={newLink.title}
                  onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                />
                <Input
                  placeholder="URL"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                />
                <Select
                  value={newLink.color}
                  onValueChange={(value) => setNewLink({ ...newLink, color: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LINK_COLORS.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleAddLink} className="w-full">
                  Добавить
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-muted-foreground text-sm tracking-widest uppercase mb-2">
          Morning Card
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
          {dayOfWeek}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-light mt-1">
          {day} {month} {year}
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Tasks */}
        <section className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground">
              Ключевые задачи
            </h2>
          </div>
          <div className="space-y-3">
            {tasks.length === 0 && (
              <p className="text-muted-foreground text-sm italic py-4">
                Задач пока нет. Добавьте первую!
              </p>
            )}
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className={cn(
                  "group w-full flex items-center gap-4 p-4 rounded-lg border transition-all duration-200",
                  "hover:bg-card hover:shadow-sm",
                  task.completed ? "bg-muted/50 border-border" : "bg-card border-border"
                )}
              >
                <button
                  onClick={() => toggleTask(task.id!)}
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0",
                    task.completed ? "bg-accent border-accent" : "border-muted-foreground/40"
                  )}
                >
                  {task.completed && <Check className="w-3.5 h-3.5 text-accent-foreground" />}
                </button>
                <div className="flex-1 min-w-0">
                  <span
                    className={cn(
                      "text-base transition-all",
                      task.completed && "line-through text-muted-foreground"
                    )}
                  >
                    <span className="text-muted-foreground mr-2">{index + 1}.</span>
                    <EditableText
                      value={task.text}
                      onSave={(text) => updateTask(task.id!, { text })}
                      className={task.completed ? "line-through" : ""}
                    />
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id!)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {/* Add task input */}
            <div className="flex items-center gap-2 mt-4">
              <Input
                placeholder="Новая задача..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                className="flex-1"
              />
              <Button onClick={handleAddTask} size="icon" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Middle Column - Schedule */}
        <section className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground">
              Календарь дня
            </h2>
          </div>
          <div className="space-y-2">
            {schedule.length === 0 && (
              <p className="text-muted-foreground text-sm italic py-4">
                Расписание пусто. Добавьте первое событие!
              </p>
            )}
            {schedule.map((item) => (
              <Popover
                key={item.id}
                open={editingScheduleId === item.id}
                onOpenChange={(open) => {
                  if (open) {
                    setNewSchedule({
                      time: item.time,
                      title: item.title,
                      type: item.type,
                    })
                    setEditingScheduleId(item.id!)
                  } else {
                    setEditingScheduleId(null)
                  }
                }}
              >
                <PopoverTrigger asChild>
                  <div
                    className={cn(
                      "group p-3 rounded-lg border transition-all cursor-pointer relative",
                      getTypeStyles(item.type)
                    )}
                  >
                    <p className="text-xs font-mono text-muted-foreground mb-1">{item.time}</p>
                    <p className="text-sm font-medium text-foreground leading-tight pr-6">
                      {item.title}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteScheduleItem(item.id!)
                      }}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="space-y-3">
                    <Input
                      type="time"
                      value={newSchedule.time}
                      onChange={(e) =>
                        setNewSchedule({ ...newSchedule, time: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Название"
                      value={newSchedule.title}
                      onChange={(e) =>
                        setNewSchedule({ ...newSchedule, title: e.target.value })
                      }
                    />
                    <Select
                      value={newSchedule.type}
                      onValueChange={(value: "meeting" | "focus" | "break") =>
                        setNewSchedule({ ...newSchedule, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="focus">Фокус</SelectItem>
                        <SelectItem value="meeting">Встреча</SelectItem>
                        <SelectItem value="break">Перерыв</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={() => handleUpdateSchedule(item.id!)} className="w-full">
                      Сохранить
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ))}
            {/* Add schedule */}
            <Popover open={schedulePopoverOpen} onOpenChange={setSchedulePopoverOpen}>
              <PopoverTrigger asChild>
                <button className="w-full p-3 rounded-lg border border-dashed border-muted-foreground/30 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  Добавить событие
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-3">
                  <Input
                    type="time"
                    value={newSchedule.time}
                    onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                  />
                  <Input
                    placeholder="Название"
                    value={newSchedule.title}
                    onChange={(e) =>
                      setNewSchedule({ ...newSchedule, title: e.target.value })
                    }
                  />
                  <Select
                    value={newSchedule.type}
                    onValueChange={(value: "meeting" | "focus" | "break") =>
                      setNewSchedule({ ...newSchedule, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="focus">Фокус</SelectItem>
                      <SelectItem value="meeting">Встреча</SelectItem>
                      <SelectItem value="break">Перерыв</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddSchedule} className="w-full">
                    Добавить
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </section>

        {/* Right Column - Focus Areas & Quote */}
        <section className="lg:col-span-1 space-y-6">
          {/* Week Focus */}
          <div className="border-l-2 border-accent pl-4 py-1">
            <div className="flex items-center gap-2 mb-2">
              <Circle className="w-3 h-3 fill-accent text-accent" />
              <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground">
                Фокус недели
              </h2>
            </div>
            <EditableText
              value={weekFocus}
              onSave={(text) => setFocus("week", text)}
              placeholder="Установите фокус на неделю..."
              className="text-foreground leading-relaxed"
              multiline
            />
          </div>

          {/* Month Focus */}
          <div className="border-l-2 border-primary/60 pl-4 py-1">
            <div className="flex items-center gap-2 mb-2">
              <Circle className="w-3 h-3 fill-primary/60 text-primary/60" />
              <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground">
                Фокус месяца
              </h2>
            </div>
            <EditableText
              value={monthFocus}
              onSave={(text) => setFocus("month", text)}
              placeholder="Установите фокус на месяц..."
              className="text-foreground/90 text-sm leading-relaxed"
              multiline
            />
          </div>

          {/* Quarter Focus */}
          <div className="border-l-2 border-muted-foreground/40 pl-4 py-1">
            <div className="flex items-center gap-2 mb-2">
              <Circle className="w-3 h-3 fill-muted-foreground/40 text-muted-foreground/40" />
              <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground">
                Фокус квартала
              </h2>
            </div>
            <EditableText
              value={quarterFocus}
              onSave={(text) => setFocus("quarter", text)}
              placeholder="Установите фокус на квартал..."
              className="text-foreground/80 text-sm leading-relaxed"
              multiline
            />
          </div>

          {/* Quote */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <EditableText
                value={quote}
                onSave={setQuote}
                placeholder="Добавьте вдохновляющую цитату..."
                className="text-muted-foreground italic text-sm leading-relaxed"
                multiline
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
