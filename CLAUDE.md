# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **monechan-portfolio** (もねちゃんのポートフォリオ), a portfolio website for a web designer built with Next.js 14.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Internationalization**: next-intl (Japanese/English)
- **Fonts**: Google Fonts (Quicksand + Noto Sans JP)

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Locale-based routes (ja/en)
│   │   ├── page.tsx        # Home page
│   │   ├── about/page.tsx  # About page
│   │   ├── works/
│   │   │   ├── page.tsx    # Works listing
│   │   │   └── [slug]/page.tsx  # Work detail
│   │   └── contact/page.tsx    # Contact page
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── WorkCard.tsx
│   ├── WorkGrid.tsx
│   ├── CategoryFilter.tsx
│   └── LanguageSwitcher.tsx
├── data/
│   └── works.ts            # Static work data
├── i18n/
│   ├── request.ts          # next-intl config
│   └── routing.ts          # Navigation helpers
├── lib/
│   └── utils.ts
└── messages/
    ├── ja.json             # Japanese translations
    └── en.json             # English translations
```

## URLs

- http://localhost:3000/ja - Japanese version
- http://localhost:3000/en - English version

## Work Categories

- uiux - UI/UX Design
- web - Web Design
- graphic - Graphic Design
