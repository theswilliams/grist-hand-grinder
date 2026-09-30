# Grist One

> **Fictional concept project.** Grist is an invented brand. Nothing here is for sale, there is no checkout, and every spec, price, comparison and review is made-up placeholder copy. No real client, customer or metric is implied.

Project 01 of a five-site web design portfolio series. Brief: a DTC product brand site for a single hero product.

## Project

A landing and configurator site for **Grist One**, an imaginary machined-aluminium hand coffee grinder. One product, one page, one purchase action. Built as a portfolio piece to show art direction, interaction design and front-end craft.

## Challenge

Hand grinders at this price are sold almost entirely through lifestyle photography, and buyers end up comparing spec sheets in forum threads. The challenge: sell a ~$240 object with no photography at all, make its engineering legible, and keep the purchase one clear action away.

## Design Direction

An **engineering inspection drawing**. The product is an authored SVG line drawing, and the page behaves like a drawing set: each section is a different sheet material (Signal Orange, graphite, bare aluminium) instead of one continuous background. Type is Archivo Variable in its condensed heavy widths for headings and Courier Prime used only for measured values. Buttons are stamped squares, tables are ruled, there are no cards and no shadows. Claims are specific and checkable on the page (burr size, click pitch, capacity) rather than adjectives.

## UX Approach

- The object is the interface: dismantling it (teardown) and specifying it (configurator) are the two main interactions.
- Every part is named, dimensioned and explained.
- A sticky stamped buy button keeps the purchase action reachable, then steps aside when the configurator is on screen.
- Social proof is explicitly labelled as sample copy. The comparison column is labelled as an illustrative composite.

## Technology

Vite + vanilla TypeScript, static output, no framework, no runtime dependencies beyond two self-hosted font packages (`@fontsource-variable/archivo`, `@fontsource/courier-prime`). The product drawing is generated SVG whose colours come from per-section CSS variables. All specs, prices and copy live in `src/data.ts`.

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build to dist/
```

Production build: about 12 kB JS (5 kB gzip) and 18 kB CSS (5 kB gzip), plus self-hosted font files.

## Key Features

- **Scroll-driven exploded teardown**: one sticky drawing separates into six parts as you scroll; the part list is also keyboard-operable and jumps to each part.
- **Grind dial**: a slider maps clicks to millimetres of burr gap and to a brew method, with a particle field that coarsens as you turn it.
- **Configurator**: finish, burr set and extras, live price, and the drawing recolours to the chosen finish.
- **Cart panel**: non-modal, persisted in `localStorage`, closes with Escape. Checkout is intentionally a "concept project, nothing for sale" message.
- Ruled spec table, labelled comparison table, FAQ.

## Responsive Design

The layout is recomposed, not just reflowed. On desktop the hero is a two-column sheet with a title block; on phones it stacks and the teardown becomes a compact two-column part list under a full-height drawing, the dimension labels are kept and the section heading yields space to the drawing. The buy dock switches from a corner stamp to a full-width bar. Tested at 1440x900 and 390x844 with no horizontal scroll.

## Accessibility

Skip link, visible focus states, native form controls for the configurator, `aria-pressed` and `aria-current` state on the dial and part list, and a `prefers-reduced-motion` mode that drops the sticky scroll and shows the exploded drawing statically. Body text is ink on saturated orange, graphite or aluminium sheets.

## Status

Complete as a concept for human review. Not deployed. Project 02 has not been started.

Screenshots are in [`screenshots/`](screenshots/). Design system notes are in `DESIGN.md`.
