# CruiseFlow

CruiseFlow is a modern cruise search and booking platform built as a frontend assessment project.

## Features

* Cruise search and filtering
* Cruise details and itinerary
* Interactive deck-based cabin selection
* Multiple cabin selection
* Multi-step checkout
* Guest details and payment UI
* Booking review and confirmation
* Responsive design with mobile navigation

## Tech Stack

* React + TypeScript
* Vite
* Tailwind CSS
* React Router
* React Hook Form + Zod
* Lucide React
* React Day Picker

## Getting Started

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
```

## Project Structure

```text
src/
├── components/   # Reusable UI components
├── pages/        # Application pages
├── data/         # Mock cruise and cabin data
├── services/     # Data/business logic
└── types/        # TypeScript types
```

## Note

This is a frontend demo. Cruise availability, booking, and payment are simulated using local mock data and session storage.

**Live Demo:** https://cruise-flow-eight.vercel.app/

**Repository:** https://github.com/Afaque22/cruise-flow
