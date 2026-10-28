# Gatherly - Event Management

A multi-page event management site built with React and React Router (Task 5).
Visitors can browse upcoming events, search and filter them, read the full
details of an event and register for seats. There is also a contact form.

## Pages

| Page | Route | Description |
| --- | --- | --- |
| Home | `/` | Hero with search, live stats, category links, upcoming events, how booking works |
| Events (dynamic list) | `/events` | Search, category chips, free-only filter, sorting, clearable filters |
| Event details (dynamic page) | `/events/:id` | Details, seat meter, add to calendar, copy link, registration form, related events |
| About | `/about` | Purpose, features and tech stack |
| Contact | `/contact` | Validated contact form and FAQ |
| Not found | `*` | 404 page |

## Features

- Reusable components: `Header`, `Footer`, `PageHeader`, `Breadcrumbs`, `EventCard`, `SeatsMeter`, `FormField`, `ContactForm`, `RegisterForm`, `SkeletonGrid`, `Loader`, `ErrorMessage`
- Props with `PropTypes` validation on every component
- `useState` for filters, menu and form state; `useEffect` for data fetching
- Custom hooks: `useEvents` (data, loading, error, retry) and `usePageTitle`
- Loading states (skeleton cards) and error states with a retry button
- Form validation with inline errors, a sending state and success or failure messages
- Search text and category stored in the URL, so a filtered list can be shared
- "Add to calendar" downloads a `.ics` file
- Accessible basics: skip link, labelled controls, `aria-*` on the seat meter and filters, keyboard focus styles, reduced-motion support
- Responsive layout (desktop, tablet, mobile)

## Technologies used

- React 18
- React Router v6
- Vite
- PropTypes
- Plain CSS (custom properties, grid, flexbox)
- `public/events.json` loaded with `fetch` (stands in for our own backend)
- JSONPlaceholder (dummy API for registrations and the contact form): https://jsonplaceholder.typicode.com

The events and organisers are made-up examples.

## Folder structure

```
gatherly/
├── index.html
├── package.json
├── vite.config.js
├── .env.example          optional API URL override
├── public/
│   ├── events.json       event data
│   └── favicon.svg
└── src/
    ├── main.jsx          entry, wraps App in BrowserRouter
    ├── App.jsx           layout and route table
    ├── api/              events.js, registration.js, contact.js, config.js
    ├── components/       reusable UI components
    ├── hooks/            useEvents.js, usePageTitle.js
    ├── pages/            one file per route
    ├── styles/           index.css
    └── utils/            format, categories and calendar helpers
```

## How to run the project locally

You need Node.js 18 or newer.

```bash
git clone <your-repository-link>
cd gatherly
npm install
npm run dev
```

Open the address Vite prints, usually http://localhost:5173.

Production build: `npm run build`, then `npm run preview`.

### Using your own backend (optional)

Copy `.env.example` to `.env` and set `VITE_API_URL`. The registration and
contact forms will post there instead of JSONPlaceholder.

## GitHub repository

<paste your repository link here>
