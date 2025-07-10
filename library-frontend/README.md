# Library Management System - Frontend

A modern Next.js frontend for a library management system with a clean, responsive design.

## Features

- **Books Management**: Add, view, and manage library books
- **Members Management**: Manage library members and their information
- **Loans Tracking**: Track book loans and returns
- **Reservations**: Handle book reservations
- **Reports**: View loan statistics and overdue reports
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **Axios**: HTTP client for API calls

## Project Structure

```
library-frontend/
├── app/                    # App Router pages & layouts
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Dashboard
│   ├── login/page.tsx     # Login page
│   ├── books/             # Books management
│   ├── members/           # Members management
│   ├── loans/             # Loans tracking
│   ├── reservations/      # Reservations
│   ├── reports/           # Reports
│   └── not-found.tsx     # 404 page
├── components/            # Reusable components
├── lib/                   # Utilities & helpers
├── styles/                # Global styles
└── public/               # Static assets
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Pages Overview

- **Dashboard** (`/`): Overview with navigation cards
- **Books** (`/books`): List and manage books
- **Book Details** (`/books/[id]`): View individual book details
- **Add Book** (`/books/add`): Add new books to the library
- **Members** (`/members`): List and manage library members
- **Add Member** (`/members/add`): Register new members
- **Loans** (`/loans`): Track book loans
- **Add Loan** (`/loans/add`): Create new loans
- **Reservations** (`/reservations`): Manage book reservations
- **Reports** (`/reports/loans`, `/reports/overdue`): View library statistics

## Components

- `Navbar`: Navigation component
- `Loader`: Loading spinner
- `BookCard`: Book display card
- `MemberCard`: Member display card
- `LoanCard`: Loan display card

## Utilities

- `api.ts`: Axios configuration and interceptors
- `auth.ts`: Authentication utilities
- `utils.ts`: Common helper functions

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Development Notes

- This is a frontend-only implementation with sample data
- In a real application, you would connect to a backend API
- Authentication is simulated for demonstration purposes
- All forms include basic validation and error handling
- The design is responsive and follows modern UI/UX practices
