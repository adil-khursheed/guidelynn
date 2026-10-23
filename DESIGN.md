---
name: Guidelynn
description: A warm, editorial career-guidance system built on an evening-study mood.
colors:
  terracotta-signal: "oklch(0.6171 0.1375 39.0427)"
  terracotta-signal-deep: "oklch(0.5583 0.1276 42.9956)"
  terracotta-signal-dark: "oklch(0.6724 0.1308 38.7559)"
  warm-paper: "oklch(0.9818 0.0054 95.0986)"
  warm-graphite: "oklch(0.3438 0.0269 95.7226)"
  ink-graphite: "oklch(0.1908 0.002 106.5859)"
  muted-stone: "oklch(0.6059 0.0075 97.4233)"
  sand-secondary: "oklch(0.9245 0.0138 92.9892)"
  sand-border: "oklch(0.8847 0.0069 97.3627)"
  input-line: "oklch(0.7621 0.0156 98.3528)"
  pure-white: "oklch(1 0 0)"
  dusk-background: "oklch(0.2679 0.0036 106.6427)"
  dusk-foreground: "oklch(0.8074 0.0142 93.0137)"
  dusk-popover: "oklch(0.3085 0.0035 106.6039)"
  ember-destructive: "oklch(0.6368 0.2078 25.3313)"
typography:
  display:
    fontFamily: "Aoboshi One, ui-serif, serif"
    fontSize: "clamp(2.4rem, 5vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  display-section:
    fontFamily: "Aoboshi One, ui-serif, serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  display-closing:
    fontFamily: "Aoboshi One, ui-serif, serif"
    fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.03
    letterSpacing: "-0.03em"
  display-subsection:
    fontFamily: "Aoboshi One, ui-serif, serif"
    fontSize: "clamp(1.5rem, 2.5vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Geist, ui-sans-serif, sans-serif, system-ui"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
  title:
    fontFamily: "Geist, ui-sans-serif, sans-serif, system-ui"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Geist, ui-sans-serif, sans-serif, system-ui"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist, ui-sans-serif, sans-serif, system-ui"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  compact:
    fontFamily: "Geist, ui-sans-serif, sans-serif, system-ui"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  annotation:
    fontFamily: "Geist, ui-sans-serif, sans-serif, system-ui"
    fontSize: "0.71875rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  micro:
    fontFamily: "Geist, ui-sans-serif, sans-serif, system-ui"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  meta:
    fontFamily: "Geist, ui-sans-serif, sans-serif, system-ui"
    fontSize: "0.625rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.09em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.terracotta-signal}"
    textColor: "{colors.pure-white}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-primary-hover:
    backgroundColor: "{colors.terracotta-signal-deep}"
  button-secondary:
    backgroundColor: "{colors.sand-secondary}"
    textColor: "{colors.warm-graphite}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.warm-graphite}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.terracotta-signal}"
    typography: "{typography.label}"
    padding: "0"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.warm-graphite}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
    height: "36px"
  card:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.ink-graphite}"
    rounded: "{rounded.xl}"
    padding: "24px"
  badge-primary:
    backgroundColor: "{colors.terracotta-signal}"
    textColor: "{colors.pure-white}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "2px 8px"
  chat-composer:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.warm-graphite}"
    rounded: "{rounded.2xl}"
    padding: "16px"
---

# Design System: Guidelynn

## Overview

**Creative North Star: "The Evening Study"**

Guidelynn is a career counselor's study at dusk: a warm, low-lit room where a student can think out loud and leave with a clearer next move. The ground is warm paper in light and soft graphite at night, so long conversations feel like reading at a desk rather than operating a dashboard. A single terracotta signal marks the moments that matter — the wordmark, the primary action, the active state — while everything else stays quiet.

The density is conversational, not corporate. Chat and history columns cap at 768px, forms sit in one focused card, and the marketing surface clears the center of the screen for a single statement. Aoboshi One gives the brand a human, slightly bookish voice; Geist keeps controls and long-form guidance plain and legible.

Depth is soft and ambient. Warm 1px borders do most of the structural work, and low-opacity shadows lift cards, popovers, and the composer just enough to separate them from the ground. Motion is restrained — state transitions and a gentle per-character thinking indicator — never decorative display.

**Key Characteristics:**
- Warm paper / graphite ground with one terracotta signal.
- Serif identity voice over a neutral sans interface.
- Conversation-first density capped at a 768px reading column.
- Border-led structure with soft ambient shadow.
- 8px base radius; 12px cards; 16px composer.
- Light and dark treated as one world: paper at day, dusk at night.

## Colors

One saturated accent against a family of warm, low-chroma neutrals. The accent is an event, not a field.

### Primary
- **Terracotta Signal** (oklch(0.6171 0.1375 39.0427)): the wordmark, primary buttons, links, focus rings, selected states, and the send control. It lifts slightly in dark mode (oklch(0.6724 0.1308 38.7559)) to hold contrast on graphite.
- **Terracotta Deep** (oklch(0.5583 0.1276 42.9956)): primary hover/pressed state and the darker chart accent.

### Secondary
- **Sand** (oklch(0.9245 0.0138 92.9892)): secondary button and accent fills, plus the quiet hover ground for ghost controls.

### Neutral
- **Warm Paper** (oklch(0.9818 0.0054 95.0986)): light background, cards, and composer ground.
- **Warm Graphite** (oklch(0.3438 0.0269 95.7226)): primary text in light mode.
- **Ink** (oklch(0.1908 0.002 106.5859)): card foreground and the light-mode destructive fill.
- **Muted Stone** (oklch(0.6059 0.0075 97.4233)): secondary text, placeholders, timestamps.
- **Sand Border** (oklch(0.8847 0.0069 97.3627)): hairlines between regions.
- **Input Line** (oklch(0.7621 0.0156 98.3528)): input and composer strokes.
- **Dusk** (oklch(0.2679 0.0036 106.6427)): dark background and card ground; **Dusk Foreground** (oklch(0.8074 0.0142 93.0137)) carries text.
- **Ember** (oklch(0.6368 0.2078 25.3313)): destructive actions in dark mode.

### Named Rules
**The Single Warm Signal Rule.** Terracotta occupies less than about 10% of any screen. It marks identity, primary action, and current state — never large fields, gradients, or decoration.

**The Warm-Neutral Ground Rule.** Every neutral carries a warm hue (roughly 90–107). Cold gray and blue-gray are off-world; use Warm Paper, Sand, and Graphite instead.

## Typography

**Display Font:** Aoboshi One (with ui-serif, serif)
**Body Font:** Geist (with ui-sans-serif, sans-serif, system-ui)
**Label/Mono Font:** Geist Mono (ui-monospace) — reserved for code and technical snippets.

**Character:** A warm editorial voice over neutral clarity. The serif is the counselor speaking; the sans is the desk, the tools, and the text.

### Hierarchy
- **Display** (400, clamp(2.4rem, 5vw, 3.75rem), 1.05, -0.03em): wordmark, landing hero, and greeting. Serif, often terracotta on the landing surface.
- **Section display** (400, clamp(2.25rem, 4vw, 3rem), 1.05, -0.025em): marketing section headings. The closing card runs one step larger at 56px; agenda row titles use the subsection step at 28px.
- **Headline** (600, 1.5rem, 1.3): page and section titles such as "Your chat history".
- **Title** (600, 1.125rem, 1.3): card titles and dialog headings.
- **Body** (400, 1rem, 1.6): chat guidance, descriptions, and form copy. Keep the reading column near 65–75ch.
- **Label** (500, 0.875rem, 1.4): form labels, buttons, navigation, and metadata.
- **Compact** (400, 0.9375rem, 1.4): dense two-column marketing copy and sample exchanges.
- **Annotation** (400, 0.71875rem, 1.45) and **Micro** (400, 0.6875rem, 1.45): memory notes, captions, and practice lines inside the session sheet.
- **Meta** (500, 0.625rem, 1.4, 0.09em, uppercase): session rail, column labels, and stamped metadata. The only tracked, uppercase step.

### Named Rules
**The Two-Voice Rule.** Aoboshi One owns the editorial voice — wordmark, hero, marketing section headings, and "Hello {name}". Everything functional (controls, labels, card titles, body) stays in Geist.

## Layout

Conversation-first and centered. App surfaces use a 768px (max-w-3xl) reading column; chat messages sit 40px apart vertically; the composer shares that column. Auth and profile use a single card capped at 512px (max-w-lg) or 576px (max-w-xl). The landing surface is a sticky 64px header over a 1328px session sheet: a 44px meta rail, a masthead, then ruled agenda rows on a 56px time rail that becomes 92 + 214px at md and up. Landing page padding is 16px, rising to 24px and 32px inside the sheet. Marketing sections cap at 1328px with 16–24px side padding. The sidebar is 16rem expanded (18rem mobile sheet, 3rem icon rail) with a 4px-spaced menu. Breakpoints follow Tailwind defaults: sm 640, md 768, lg 1024, xl 1280. Spacing runs on a 4px base (xs 4, sm 8, md 16, lg 24, xl 32).

## Elevation & Depth

Soft ambient layering, border-led. Warm 1px borders define structure; low-opacity shadows add a gentle lift to cards, popovers, and the composer, appearing as a response to state rather than as heavy decoration. The system is never flat-black, glassy, or neon.

### Shadow Vocabulary
- **Ambient low** (`box-shadow: 0 1px 3px 0 hsl(0 0% 0% / 0.05)`): inputs, composer, and outline buttons at rest.
- **Ambient card** (`box-shadow: 0 1px 3px 0 hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1)`): cards at rest.
- **Overlay mid** (`box-shadow: 0 1px 3px 0 hsl(0 0% 0% / 0.1), 0 4px 6px -1px hsl(0 0% 0% / 0.1)`): popovers, dropdowns, and dialogs.
- **Overlay high** (`box-shadow: 0 1px 3px 0 hsl(0 0% 0% / 0.25)`): strongest lift, reserved for top overlays.

### Named Rules
**The Restrained Elevation Rule.** Shadows are soft, low-opacity, and state-driven. Never stack heavy shadows; reach for a warm border before adding depth.

## Shapes

Soft, even geometry. The base radius is 8px (`--radius`); the working scale is 4 / 6 / 8 / 12px, with the chat composer at 16px as the one deliberately rounder surface. Buttons, inputs, badges, and menu items use 6px; cards and dialogs use 12px; avatars are full circles. Borders are 1px and warm. No clipped corners, chamfers, or decorative notches.

## Components

### Buttons
- **Shape:** 6px radius (md); 36px default height, 32px sm, 40px lg, 36px icon.
- **Primary:** Terracotta Signal fill with white label and 8×16 padding — the one clear action on a surface.
- **Hover / Focus:** primary darkens toward Terracotta Deep; focus is a 3px ring at 50% opacity in the ring color; transitions run ~150ms.
- **Secondary / Outline / Ghost / Link:** Sand fill with Warm Graphite text; outline adds a warm 1px border and shadow-xs; ghost is fill-free with a Sand hover for icon controls (theme, menu, send); link is terracotta with an underline on hover.

### Chips
- **Style:** 6px radius, 1px border, 2×8 padding, 12px label. Default is a primary fill with white text; outline is the quiet tag. Selected multi-select options use a terracotta check and fill inside the popover.

### Cards
- **Corner Style:** 12px (xl).
- **Background:** Warm Paper in light, Dusk in dark.
- **Shadow Strategy:** Ambient card (see Elevation & Depth).
- **Border:** 1px Sand Border.
- **Internal Padding:** 24px, with a 24px gap between header and content.

### Inputs / Fields
- **Style:** 36px tall, 1px Input Line border, transparent or dusk-tinted ground, 6px radius, 12px horizontal padding, 14px text at md and up.
- **Focus:** border shifts to the ring color with a 3px ring at 50% opacity.
- **Error / Disabled:** border and ring shift to destructive; disabled controls dim to 50% and stop pointer events.

### Navigation
- **Landing header:** fixed, 12px padding, serif terracotta wordmark, with link and primary actions.
- **App sidebar:** 16rem, Sand hover, accent fill for the active item, muted group labels ("Recent Chats"), and a user menu in the footer. On mobile it becomes an 18rem sheet triggered from the top-left; the trigger is hidden at md and up.

### Signature: Chat Composer
A single 16px-radius bordered surface holding an auto-growing textarea and a 36px icon submit button, seated in the 768px column. It is the calmest, most spacious control in the product and the primary point of return.

### Signature: Conversation Thread
User turns are 12px bordered cards aligned right; assistant turns are plain Markdown on the ground, aligned left, with a 24px horizontal inset and 40px between messages. The thinking state is a per-character pulse in bold sans.

## Do's and Don'ts

### Do:
- **Do** anchor every screen in Warm Paper or Dusk with warm neutrals; keep neutral hue near 90–107.
- **Do** spend terracotta on identity, primary action, links, focus, and active state only.
- **Do** use Aoboshi One for the wordmark, hero, marketing section headings, and greeting; Geist for functional UI and body copy.
- **Do** cap conversational content at 768px and keep 40px between messages.
- **Do** use a 1px warm border plus shadow-xs or shadow-sm before adding depth.
- **Do** give the composer 16px radius and the rest of the controls 6px.

### Don't:
- **Don't** introduce cold grays, blues, or a second saturated accent.
- **Don't** fill large areas with terracotta or use gradients on brand surfaces.
- **Don't** use the serif for body copy, labels, or buttons.
- **Don't** raise shadows beyond the soft, low-opacity scale or stack them.
- **Don't** exceed 12px radius on standard cards and controls (the composer is the exception).
- **Don't** add decorative motion; motion is for state and the thinking indicator.
