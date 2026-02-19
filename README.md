# Multi-Tenant SaaS Architecture

This project is a template for building scalable, multi-tenant SaaS applications using modern web technologies. It provides a robust folder structure, reusable UI components, and best practices for multi-tenancy, scalability, and maintainability.

## Features
- Multi-tenant architecture for SaaS applications
- Modular folder structure for scalability
- Pre-built UI components (Radix UI, MUI, custom)
- Tailwind CSS for rapid styling
- Vite for fast development and build
- Example pages for admin, billing, API, and more

## Folder Structure
```
src/
  app/
    components/         # Reusable UI components
    model/              # Model-specific components
    pages/              # Main application pages
    user experience/    # UI/UX primitives (Radix, MUI, etc.)
    routes.ts           # Route definitions
    App.tsx             # Main app component
  main.tsx              # App entry point
  styles/               # CSS and theme files
```

## Tech Stack
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Radix UI, MUI, and more (see package.json)

## Getting Started
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```

## Scripts
- `npm run dev` – Start development server
- `npm run build` – Build for production

## License
See ATTRIBUTIONS.md for third-party attributions.
