# Tidy Titans — сайт-витрина

Тёмный атмосферный лендинг для **tidytitans.ru**: премиум-ваibe как у [reznikov.vercel.app](https://reznikov.vercel.app), но в игровом пиксельном стиле семейного квеста-уборки.

## Стек

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion
- Пиксельные ассеты (титан + швабра, губка, ведро, выбивалка)

## Запуск

```bash
npm install
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000).

## Структура

- `src/components/Hero.tsx` — главный якорь: титан + floating tools
- `Problem` / `HowItWorks` / `Arsenal` / `QuestMap` / `FinalCTA`
- `public/assets/` — PNG с прозрачным фоном

## Сборка

```bash
npm run build
npm start
```
