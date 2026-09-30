---
name: Grist One
description: A fictional machined-aluminium hand grinder sold as an inspection drawing; sections change material, not colour scheme.
colors:
  signal-orange: "#ff4d00"
  ink: "#111111"
  graphite: "#16181a"
  aluminium: "#cbd0d2"
  aluminium-light: "#e8eaea"
  paper: "#eef0f0"
  muted-on-dark: "#a9b0b3"
typography:
  display:
    fontFamily: "'Archivo Variable', 'Archivo', sans-serif"
    fontSize: "clamp(4rem, 11vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.85
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "'Archivo Variable', 'Archivo', sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Archivo Variable', 'Archivo', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.55
  body:
    fontFamily: "'Archivo Variable', 'Archivo', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Archivo Variable', 'Archivo', sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0.1em"
  measure:
    fontFamily: "'Courier Prime', 'Courier New', monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  none: "0px"
  drawing: "2px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "24px"
  lg: "56px"
  sheet-pad: "clamp(16px, 4vw, 56px)"
  bar-height: "52px"
components:
  stamp:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.signal-orange}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
  stamp-hover:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
  stamp-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
  stamp-ink-hover:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.ink}"
  bar:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    height: "52px"
  bar-cart:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.ink}"
    padding: "8px 14px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "8px 12px"
  chip-pressed:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.signal-orange}"
  option:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "12px 14px"
  option-checked:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  part-row-current:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.ink}"
    padding: "11px 10px"
---

# Design System: Grist One

Fictional concept project: a made-up brand with invented specs and sample copy. The system below is recorded from the shipped build (`src/style.css`, `src/drawing.ts`, `index.html`).

## Overview

**Creative North Star: "The Inspection Sheet"**

The page is an engineering drawing of the object, not lifestyle photography. Linework, dimension lines, numbered balloons, title blocks and ruled tables carry the content; the product is authored in SVG and reused as line art (hero), teardown (graphite) and filled render (configurator). Sections change material rather than colour scheme: anodised signal orange, black-anodised graphite, bare aluminium grey, each a full-bleed sheet.

Density is high and square. Type is heavy, condensed and capitalised for names; a typewriter mono appears only where something is measured. Everything is a rule, a stroke or a solid fill: no gradients, no cards, no soft shadows, no rounded surfaces.

**Key Characteristics:**
- Full-bleed material sheets stacked vertically; one ink (#111) does all linework on light sheets, paper on graphite.
- Square stamped buttons; 1.5px and 3px ruled lines as the only dividers.
- One SVG grinder drawn once, recoloured by per-sheet custom properties.
- Claims are checkable in place (dial shows microns, parts list shows dimensions).
- Reduced-motion collapses the scroll teardown to a static sheet.

## Colors

Three materials, one ink, one signal colour. Orange is the ground and the stamp, never a gradient or tint ramp.

### Primary
- **Signal Orange** (see `signal-orange`): the anodised ground of hero and dial sheets; on dark it marks the active, current or purchasable (cart button, current part row, dock top rule, caret).

### Neutral
- **Drawing Ink** (`ink`): text and all linework on light sheets; fill for stamps, the top bar, cart drawer, footer and selected options.
- **Black-Anodised Graphite** (`graphite`): teardown and reviews sheets; text is paper, accent is orange.
- **Bare Aluminium** (`aluminium`): specify and FAQ sheets; the configurator fills the drawing with the chosen finish colour.
- **Light Aluminium** (`aluminium-light`): the specs sheet.
- **Paper** (`paper`): text and strokes on dark, slider thumbs, balloon discs.
- **Muted On Dark** (`muted-on-dark`): rules and secondary text on graphite and ink only.

### Named Rules
**The Material Rule.** A section changes its material (orange, graphite, aluminium), never introduces a new hue. Every sheet is built from the seven colours above.
**The One Ink Rule.** Linework on a light sheet is ink; on graphite it is paper. Orange is fill or ground, and on graphite it is the only active-state colour.

## Typography

**Display / Body Font:** Archivo Variable (fallback Archivo, sans-serif), using the width axis.
**Measure Font:** Courier Prime 400/700, used only for dimensions, dial readouts, scale ticks, cart prices and review attributions.

**Character:** A heavy condensed grotesque for names, dry and exact; mono for anything a person could check with a caliper.

### Hierarchy
- **Display** (800, clamp(4rem, 11vw, 6rem), 0.85, width 70%, uppercase): the hero "GRIST ONE" only.
- **Headline** (800, clamp(2.25rem, 5vw, 4rem), 0.92, width 70%, uppercase): section h2; smaller steps in teardown (2rem-3.25rem) and specs (1.75rem-2.75rem).
- **Title** (800, 1.125-1.25rem, width 80-85%): part names, option titles, FAQ summaries, quote text (700, to 1.75rem).
- **Body** (400, 1.0625rem, 1.55): copy, max-width about 26-42rem.
- **Label** (700, 0.75-0.8125rem, 0.1em tracking, uppercase, tabular numerals): legends, title-block terms, dial label, table heads. Nav and buttons use 0.875rem at 0.06em.
- **Measure** (Courier Prime 400, 0.75-1.125rem): measured values only.

### Named Rules
**The Measured-Only Mono Rule.** Mono never sets prose or headings; it marks a value that is measured, counted or priced.
**The Tabular Rule.** Labels, table cells and prices use tabular numerals so columns read like a schedule.

## Layout

Sheets stack full-bleed with horizontal padding `clamp(16px, 4vw, 56px)` and 72px vertical rhythm (56px plus bar height under the fixed 52px bar). Two-column splits are the norm (hero 2fr/3fr, teardown 1.1fr/1fr, dial 1fr/1.4fr, specify and specs 1fr/1fr, faq 1fr/2fr) with 24-64px gaps. The teardown is a 440vh scroll runway holding a sticky 100svh stage; the specify drawing is sticky beside the form. A four-cell title block anchors the hero bottom edge with a 3px top rule and 1.5px cell dividers.

Responsive: below 960px the nav hides, columns collapse to one, the title block becomes 2x2, the part list becomes two columns, and the sticky dock drops its config text. Below 480px buttons go full width. The sheet re-composes; it is not merely shrunk.

## Elevation & Depth

Flat. Depth comes from material change between sheets and from heavy rules (1.5px fine, 3px structural), never from shadows. The only `box-shadow` in the build is a 6px ink halo behind the paper focus ring on dark surfaces, to keep the ring legible. The cart drawer and dock separate from the page by an orange 1px left rule and 3px top rule respectively.

### Named Rules
**The Flat Sheet Rule.** Surfaces carry no shadow. Separate with a ruled line or a change of material.

## Shapes

Square. Buttons, chips, options, slider thumbs and inputs have 0 radius; drawing parts carry a 2-6px radius as machined-edge detail inside the SVG only. Borders are 2-3px ink on interactive controls, 1.5px on dividers. Drawn strokes are 2.5px (parts), 1.5px (ticks, dimensions), non-scaling, with dimension leaders dashed (6 4). The accordion marker is a 3px-thick ink plus/minus drawn from two bars.

## Components

### Stamps (buttons)
- **Shape:** Square rectangle, 3px ink border, uppercase 800 width-80% label (0.04em tracking).
- **Primary (`stamp`):** ink fill, orange text, 14px 22px. Hover inverts to transparent with ink text. Active nudges 2px down.
- **Ink (`stamp--ink`):** ink fill, paper text; hover turns orange with ink text. Used for Add to cart and Checkout.
- **Bar cart / dock:** orange fill, ink text; hover turns paper.
- **Disabled:** 40% opacity.

### Chips and options
- **Chip:** transparent, 2px ink border, uppercase 700; pressed = ink fill, orange text. Used for brew-method jumps.
- **Option (finish, burr, extras):** 2px ink border tile with a native input stretched invisibly over it; checked = ink fill, paper text. Finish options carry a 22px square swatch.

### Navigation
- Fixed 52px ink bar; wordmark with "GRIST" in orange, uppercase 600 links at 0.06em that gain a 2px orange underline on hover, orange cart button at right. Nav links hide under 960px. A bottom dock slides in with orange top rule showing part code, config, price and a stamp.

### Parts list (signature)
- Ruled rows of full-width buttons on graphite: name (800, uppercase, numbered) left, dimension in mono right. Hover adds a paper 8% wash; current row is solid orange with ink text. Selecting highlights the matching drawing part with an orange stroke and 20% orange fill.

### Grind dial and particle field
- 44px-tall range with a flat 10px ink track and a square paper thumb with 3px ink border. Readout pairs a large headline-face number with a mono unit line. The particle field is a bordered SVG of deterministic ink circles with a 1 mm scale bar.

### Ruled tables
- No boxes: a 3px top rule on heads, 1.5px row rules, 3px closing rule, tabular numerals. The highlighted cell uses an orange fill.

### Drawing (SVG)
- Six named parts (handle, cap, hopper, dial, burr, cup) with numbered balloons, dimension lines and mono callouts. Explode offset is one custom property (`--ex`) per part; transitions run only when settling.

## Do's and Don'ts

### Do:
- **Do** change a section's material (orange, graphite, aluminium) to change its mood, keeping all colour within the seven tokens.
- **Do** keep every control square with a 2-3px ink border and a 3px offset focus ring (paper plus a 6px ink halo on dark surfaces).
- **Do** set names in uppercase condensed 800 and reserve Courier Prime for measured values.
- **Do** divide with 1.5px or 3px rules; use title blocks and ruled tables for grouped facts.
- **Do** label concept, sample and invented content where it appears (title block, footer, fine print).
- **Do** provide a reduced-motion state that shows teardown content statically.

### Don't:
- **Don't** add gradients, tinted ramps, rounded corners or drop shadows.
- **Don't** wrap content in cards; use rules, tiles with a 2px border, or bare layout.
- **Don't** put a centered headline over a product photograph, a three-feature-card row, or a logo strip.
- **Don't** use mono for prose or headings.
- **Don't** set orange text on aluminium or light sheets; orange is ground or fill there, text on it is ink.
