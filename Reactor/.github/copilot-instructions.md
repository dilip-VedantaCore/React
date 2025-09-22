# Copilot Instructions for Reactor (React + Vite)

## Project Overview
- This is a React project bootstrapped with Vite for fast development and HMR (Hot Module Replacement).
- The main entry point is `src/main.jsx`, which mounts the `App` component from `src/App.jsx`.
- The project structure is modular, with feature folders under `src/` (e.g., `Sidebar/`).

## Key Files & Directories
- `src/App.jsx`: Main application component.
- `src/Sidebar/`: Contains sidebar-related components (e.g., `counter.jsx`, `sidebar.jsx`).
- `public/`: Static assets served by Vite.
- `vite.config.js`: Vite configuration (plugins, build options).
- `eslint.config.js`: ESLint rules for code quality.
- `README.md`: Basic project info and links to official plugins.

## Build & Run Workflows
- **Development:**
  - Use `npm run dev` to start the Vite development server with HMR.
- **Build:**
  - Use `npm run build` to create a production build in the `dist/` folder.
- **Preview:**
  - Use `npm run preview` to locally preview the production build.

## Patterns & Conventions
- **Component Organization:**
  - Components are grouped by feature (e.g., `Sidebar/`).
  - Use functional components and hooks (no class components).
- **Styling:**
  - CSS files are colocated with components (e.g., `App.css`).
- **Assets:**
  - Images and SVGs are stored in `src/assets/` and `public/`.
- **Linting:**
  - ESLint is configured; follow the rules in `eslint.config.js`.

## External Dependencies
- Uses Vite plugins for React (`@vitejs/plugin-react` or `@vitejs/plugin-react-swc`).
- No TypeScript by default, but the README suggests migration for production apps.

## Integration Points
- Vite handles module resolution, HMR, and build optimizations.
- Static assets in `public/` are referenced via root-relative paths (`/vite.svg`).

## Example: Adding a Sidebar Feature
- Create a new folder under `src/Sidebar/` for related components.
- Import and use the new component in `App.jsx`.

## Tips for AI Agents
- Always update imports when moving or renaming components.
- Follow the feature-folder pattern for new functionality.
- Reference Vite and ESLint configs for build/lint changes.
- Use the README for plugin and migration guidance.

---

_If any conventions or workflows are unclear, please ask for clarification or provide feedback to improve these instructions._
