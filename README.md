<!-- hq-readme-ru: 2026-05-09 -->
# browser-today

Коротко: Browser today/start-page dashboard на Next.js.

## Что здесь

- Назначение: Browser today/start-page dashboard на Next.js.
- Основной стек: TypeScript.
- Видимость: публичный репозиторий.
- Статус: активный репозиторий; актуальность проверять по issues и последним коммитам.

## Где смотреть работу

- Задачи и текущие решения: GitHub Issues этого репозитория.
- Код и материалы: файлы в корне и профильные папки проекта.
- Связь с HQ: если проект влияет на продукт, контент или воронку, сверяйте канон в `0_hq` и репозитории-владельце.

## Для агентов

- Сначала прочитайте этот README и открытые issues.
- Не переносите сюда канон соседних проектов без ссылки на источник.
- Перед правками проверьте существующие scripts, package.json/pyproject и локальные инструкции.

---

## Исходный README

# browser-today

Chrome/start-page приложение для daily dashboard: Today view, auto-refresh at midnight и возможная интеграция с Personal Corp dashboard.

## Что внутри

| Путь | Роль |
|---|---|
| `app/` | Next.js routes |
| `components/` | UI-компоненты |
| `lib/` | logic/helpers |
| `styles/` | стили |
| `public/` | assets |
| GitHub Issues | задачи по auto-refresh и интеграции dashboard |

## Границы

- Это browser/start-page surface, не канонический Personal Corp backend.
- Для Personal Corp source of truth сначала смотреть `personal-corp` и `0_hq`.
- Если добавляется launchd/auto-refresh, документировать установку и rollback.
