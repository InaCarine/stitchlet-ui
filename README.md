# Stitchlet UI

**Accessible UI components ready to be stitched together!**

---

## Overview

Stitchlet UI is an accessible component library designed to provide a robust set of reusable, accessible, and customizable UI components for modern web applications. The goal is to make it easy to build inclusive interfaces by stitching together high-quality components.

## Project Structure

- **packages/ui**: The main Stitchlet UI component library
- **apps/docs**: Storybook app for interactive documentation and component demos

## Contributing

Contributions are welcome! Please open issues or pull requests to help improve Stitchlet UI.

## Getting Started

1. **Install dependencies:**
   ```sh
   pnpm install
   ```
2. **Run development servers:**

   ```sh
   pnpm dev
   ```

   - Visit `apps/docs` at [http://localhost:3000](http://localhost:3000)

3. **Build all apps and packages:**
   ```sh
   pnpm build
   ```
4. **Run tests:**
   ```sh
   pnpm test
   ```
5. **Lint and format code:**
   ```sh
   pnpm lint
   pnpm format
   ```

## Scripts

Common scripts (run from repo root):

- `pnpm dev` — Start all dev servers
- `pnpm build` — Build all apps and packages
- `pnpm lint` — Lint all code
- `pnpm lint:css` — Lint CSS/SCSS files
- `pnpm format` — Format code with Prettier
- `pnpm test` — Run all tests
- `pnpm check-types` — Type-check all code
