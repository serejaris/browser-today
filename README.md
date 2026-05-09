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
