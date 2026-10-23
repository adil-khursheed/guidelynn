---
name: Guidelynn
description: A warm, editorial career-guidance system built on an evening-study mood.
colors:
  terracotta-signal: "oklch(0.6171 0.1375 39.0427)"
  terracotta-signal-deep: "oklch(0.5583 0.1276 42.9956)"
  terracotta-signal-dark: "oklch(0.6724 0.1308 38.7559)"
  terracotta-press: "oklch(0.505 0.118 43)"
  terracotta-dark-hover: "oklch(0.715 0.128 38.5)"
  warm-paper: "oklch(0.9818 0.0054 95.0986)"
  warm-graphite: "oklch(0.3438 0.0269 95.7226)"
  warm-graphite-muted: "oklch(0.4334 0.0177 98.6048)"
  ink-graphite: "oklch(0.1908 0.002 106.5859)"
  muted-stone: "oklch(0.6059 0.0075 97.4233)"
  muted-veil: "oklch(0.9341 0.0153 90.239)"
  sand-secondary: "oklch(0.9245 0.0138 92.9892)"
  sand-border: "oklch(0.8847 0.0069 97.3627)"
  input-line: "oklch(0.7621 0.0156 98.3528)"
  pure-white: "oklch(1 0 0)"
  dusk-background: "oklch(0.2679 0.0036 106.6427)"
  dusk-foreground: "oklch(0.8074 0.0142 93.0137)"
  dusk-popover: "oklch(0.3085 0.0035 106.6039)"
  dusk-accent: "oklch(0.213 0.0078 95.4245)"
  sidebar-paper: "oklch(0.9663 0.008 98.8792)"
  sidebar-dusk: "oklch(0.2357 0.0024 67.7077)"
  ember-destructive: "oklch(0.6368 0.2078 25.3313)"
typography:
  display:
    fontFamily: "Aoboshi One, ui-serif, serif"
    fontSize: "clamp(2.4rem, 5vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1
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
    lineHeight: 1.25
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
  compact:
    fontFamily: "Geist, ui-sans-serif, sans-serif, system-ui"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Geist, ui-sans-serif, sans-serif, system-ui"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
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
  button-primary-deep:
    backgroundColor: "{colors.terracotta-signal-deep}"
    textColor: "{colors.pure-white}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-marketing-dark:
    backgroundColor: "{colors.terracotta-signal-dark}"
    textColor: "{colors.ink-graphite}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-secondary:
    backgroundColor: "{colors.sand-secondary}"
    textColor: "{colors.warm-graphite-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-outline:
    backgroundColor: "{colors.warm-paper}"
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
    textColor: "{colors.terracotta-signal-deep}"
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
  auth-card:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.ink-graphite}"
    rounded: "{rounded.xl}"
    padding: "0"
  profile-chip:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.warm-graphite-muted}"
    typography: "{typography.annotation}"
    rounded: "{rounded.md}"
    padding: "0 10px"
    height: "32px"
  badge-primary:
    backgroundColor: "{colors.terracotta-signal}"
    textColor: "{colors.pure-white}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "2px 8px"
  chat-message-user:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.ink-graphite}"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    padding: "16px 24px"
  chat-composer:
    backgroundColor: "transparent"
    textColor: "{colors.warm-graphite}"
    rounded: "{rounded.2xl}"
    padding: "16px"
---

# Design System: Guidelynn

## Overview

**Creative North Star: "The Evening Study"**

Guidelynn is a career counselor's study at dusk: a warm, low-lit room where a student can think out loud and leave with a clearer next move. The ground is warm paper in light and soft graphite at night, so long conversations feel like reading at a desk rather than operating a dashboard. A single terracotta signal marks the moments that matter — the wordmark, the primary action, the active state — while everything else stays quiet.

The density is conversational, not corporate. Chat and history columns cap at 768px, forms sit in one focused card, and the marketing surface is organized as a single consultation sheet rather than a stack of feature cards. Aoboshi One gives the brand a human, slightly bookish voice; Geist keeps controls and long-form guidance plain and legible. One full-bleed ink interval in the marketing page ("Memory") breaks the paper run, the way an evening falls across a study.

Depth is soft and ambient. Warm 1px borders do most of the structural work, and low-opacity shadows lift cards, popovers, and the composer just enough to separate them from the ground. Motion is restrained — a single 500ms entrance on the hero sheet, 150–200ms state transitions, and a gentle per-character thinking indicator — never decorative display.

**Key Characteristics:**
- Warm paper / graphite ground with one terracotta signal.
- Serif identity voice over a neutral sans interface.
- Conversation-first density capped at a 768px reading column.
- Border-led structure with soft ambient shadow.
- 8px base radius; 12px cards; 16px composer.
- A sticky 64px paper header over a ruled "session sheet" on marketing.
- One full-bleed Ink interval (Memory) inside an otherwise light page.
- Light and dark treated as one world: paper at day, dusk at night.

## Colors

One saturated accent against a family of warm, low-chroma neutrals. The accent is an event, not a field.

### Primary
- **Terracotta Signal** (oklch(0.6171 0.1375 39.0427)): the wordmark, form and app primary buttons, links in dark mode, focus rings, selected states, and the composer send control.
- **Terracotta Deep** (oklch(0.5583 0.1276 42.9956)): the marketing primary CTA and light-mode inline links. It is also exposed as `chart-1`; every other chart token is unused.
- **Terracotta Dark** (oklch(0.6724 0.1308 38.7559)): dark-mode primary fill. The marketing CTA pairs it with Ink text in dark mode; the product primary keeps its white label.
- **Terracotta Press** (oklch(0.505 0.118 43)): light hover for the deep marketing CTA.
- **Terracotta Dark Hover** (oklch(0.715 0.128 38.5)): dark hover for the marketing CTA.

### Secondary
- **Sand** (oklch(0.9245 0.0138 92.9892)): secondary button fill, quiet hover ground for ghost controls, and the light-mode sidebar active/hover row.
- **Warm Graphite Muted** (oklch(0.4334 0.0177 98.6048)): secondary-button text and the muted body copy used throughout marketing and auth ("subtle text").
- **Muted Veil** (oklch(0.9341 0.0153 90.239)): low-opacity wash behind session subpanels and card footers, always used at 30–40%.

### Neutral
- **Warm Paper** (oklch(0.9818 0.0054 95.0986)): light background, cards, composer ground, and the text color on the Ink band.
- **Warm Graphite** (oklch(0.3438 0.0269 95.7226)): primary text in light mode.
- **Ink** (oklch(0.1908 0.002 106.5859)): card foreground, the light-mode destructive fill, and the ground of the Memory band.
- **Muted Stone** (oklch(0.6059 0.0075 97.4233)): placeholders, timestamps, and secondary annotations.
- **Sand Border** (oklch(0.8847 0.0069 97.3627)): hairlines between regions and the outline of every card.
- **Input Line** (oklch(0.7621 0.0156 98.3528)): input strokes, the composer border, and the dashed session-sheet rails.
- **Pure White** (oklch(1 0 0)): light popover ground and primary-button labels.
- **Sidebar Paper** (oklch(0.9663 0.008 98.8792)): the desktop sidebar ground, one step warmer and darker than the page.
- **Dusk** (oklch(0.2679 0.0036 106.6427)): dark background and card ground; **Dusk Foreground** (oklch(0.8074 0.0142 93.0137)) carries text.
- **Dusk Popover** (oklch(0.3085 0.0035 106.6039)): dark popover and dropdown ground.
- **Dusk Accent** (oklch(0.213 0.0078 95.4245)): dark-mode hover ground for ghost and menu controls.
- **Sidebar Dusk** (oklch(0.2357 0.0024 67.7077)): the dark sidebar ground.
- **Ember** (oklch(0.6368 0.2078 25.3313)): destructive actions in dark mode.

### Named Rules
**The Single Warm Signal Rule.** Terracotta occupies less than about 10% of any screen. It marks identity, primary action, and current state — never large fields, gradients, or decoration.

**The Warm-Neutral Ground Rule.** Every neutral carries a warm hue (roughly 90–107). Cold gray and blue-gray are off-world; use Warm Paper, Sand, and Graphite instead.

**The Ink Interval Rule.** Ink may appear as one full-bleed band per marketing page (Memory), with Warm Paper text. Never use it as a card fill on a paper ground, and never place two Ink bands back to back.

## Typography

**Display Font:** Aoboshi One (with ui-serif, serif)
**Body Font:** Geist (with ui-sans-serif, sans-serif, system-ui)
**Label/Mono Font:** Geist Mono (ui-monospace) — reserved for code and technical snippets.

**Character:** A warm editorial voice over neutral clarity. The serif is the counselor speaking; the sans is the desk, the tools, and the text.

### Hierarchy
- **Display** (400, clamp(2.4rem, 5vw, 3.75rem), 1.0, -0.03em): wordmark, landing hero, and "Hello {name}". The landing hero tops out at 60px; the greeting at 36px.
- **Section display** (400, clamp(2.25rem, 4vw, 3rem), 1.05, -0.025em): marketing section headings. The closing card runs one step larger at 56px; agenda row titles use the subsection step at 28px.
- **Headline** (600, 1.5rem, 1.3): page and section titles such as "Your chat history" and the auth card's "Welcome back".
- **Title** (600, 1.125rem, 1.3): card titles and dialog headings.
- **Body** (400, 1rem, 1.6): chat guidance, descriptions, and form copy. Keep the reading column near 65–75ch.
- **Compact** (400, 0.9375rem, 1.5): dense marketing copy, auth descriptions, and sample exchanges.
- **Label** (500, 0.875rem, 1.4): form labels, buttons, navigation, and metadata.
- **Annotation** (400, 0.71875rem, 1.45) and **Micro** (400, 0.6875rem, 1.45): memory notes, captions, and practice lines inside the session sheet.
- **Meta** (500, 0.625rem, 1.4, 0.09em, uppercase): session rail, column labels, and stamped metadata. The only tracked, uppercase step.

### Named Rules
**The Two-Voice Rule.** Aoboshi One owns the editorial voice — wordmark, hero, marketing section headings, agenda row titles, the next-move statement, and "Hello {name}". Everything functional (controls, labels, card titles, body, and every auth heading) stays in Geist.

**The Ruled Reading Rule.** Long-form marketing copy stays inside 44–68ch, and no paragraph runs the full 1328px sheet. The rule is the measure, not the container.

## Layout

Conversation-first and centered. App surfaces use a 768px (max-w-3xl) reading column; chat messages sit 40px apart vertically; the composer shares that column. Auth uses a single 512px (max-w-lg) card centered in a section that is at least the viewport height minus the 64px header; profile setup uses a 576px (max-w-xl) card.

Marketing is a session sheet. The sticky header is 64px tall with a 1328px inner row and 16px side padding, rising to 24px and 32px. Below it, a full-width 1328px sheet with a 44px meta rail, a masthead, then ruled agenda rows on a 56px time rail that becomes 92px + 214px at md and up. Row content is separated by dashed and solid hairlines; the sheet closes with a muted meta footer. Marketing sections cap at 1328px with 16–32px side padding and 64–96px vertical padding; the FAQ section narrows to 1100px. Section headings and body copy use two-column splits (roughly 0.8fr / 1.2fr or wider) rather than a card grid.

The app sidebar is 16rem expanded (18rem mobile sheet, 3rem icon rail) with a 6px menu radius and 4px-spaced menu items; a fixed 64px-equivalent top bar is not used — chat pages carry their own 12px-padded title bar with `shadow-xs`. Breakpoints follow Tailwind defaults: sm 640, md 768, lg 1024, xl 1280. Spacing runs on a 4px base (xs 4, sm 8, md 16, lg 24, xl 32).

## Elevation & Depth

Soft ambient layering, border-led. Warm 1px borders define structure; low-opacity shadows add a gentle lift to cards, popovers, and the composer, appearing as a response to state rather than as heavy decoration. The system is never flat-black, glassy, or neon. The Ink Memory band is the exception to lift: it is flat and full-bleed, and its depth comes only from translucent paper borders inside it.

### Shadow Vocabulary
- **Ambient low** (`box-shadow: 0 1px 3px 0 hsl(0 0% 0% / 0.05)`): inputs, the composer, the chat title bar, and outline buttons at rest.
- **Ambient card** (`box-shadow: 0 1px 3px 0 hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1)`): cards and the marketing session sheet at rest.
- **Overlay mid** (`box-shadow: 0 1px 3px 0 hsl(0 0% 0% / 0.1), 0 2px 4px -1px hsl(0 0% 0% / 0.1)`): popovers, dropdowns, and command menus.
- **Overlay high** (`box-shadow: 0 1px 3px 0 hsl(0 0% 0% / 0.25)`): dialogs and the strongest lift, reserved for top overlays.

### Named Rules
**The Restrained Elevation Rule.** Shadows are soft, low-opacity, and state-driven. Never stack heavy shadows; reach for a warm border before adding depth.

**The Flat Interval Rule.** The Ink Memory band carries no outer shadow and no card edge. Its internal blocks use translucent paper borders instead.

## Shapes

Soft, even geometry. The base radius is 8px (`--radius`); the working scale is 4 / 6 / 8 / 12px, with the chat composer at 16px as the one deliberately rounder surface. Buttons, inputs, badges, menu items, and sidebar rows use 6px; cards, dialogs, the auth card, and the marketing sheet use 12px; avatars are full circles. Borders are 1px and warm. The session sheet adds one recurring mark: dashed hairlines frame the time rail and separate agenda blocks, so the page reads as a ruled schedule rather than a grid of boxes. No clipped corners, chamfers, or decorative notches.

## Components

### Buttons
- **Shape:** 6px radius (md); 36px default height, 32px sm, 40px lg, 36px icon.
- **Primary:** Terracotta Signal fill with white label and 8×16 padding — the one clear action on a form or app surface. The marketing CTA instead uses Terracotta Deep with white text in light mode and Terracotta Dark with Ink text in dark mode; the product primary keeps its white label in both modes.
- **Hover / Focus:** light primary darkens toward Terracotta Deep (the deep CTA presses to Terracotta Press); dark primary lifts to Terracotta Dark Hover. Focus is a 3px ring at 50% opacity; transitions run ~150ms.
- **Outline:** Warm Paper fill, 1px Input Line border, Warm Graphite text, and shadow-xs. Used for "Continue with Google" and the closing card's "Sign in".
- **Secondary / Ghost / Link:** Sand fill with Warm Graphite Muted text; ghost is fill-free with a Sand hover for icon controls (theme, menu, send); link is Terracotta Deep in light, Terracotta Signal in dark, with an underline on hover.

### Chips
- **Style:** 6px radius, 1px border, 2×8 padding, 12px label. The canonical badge is a Terracotta Signal fill with white text; the outline badge is the quiet tag.
- **Profile chip:** 32px tall, Warm Paper ground, 1px Sand Border, 12px Warm Graphite Muted text, with a 4px Terracotta dot. Used in the hero agenda to show the example profile.
- **Selected multi-select options** use a Terracotta check and fill inside the popover.

### Cards
- **Corner Style:** 12px (xl).
- **Background:** Warm Paper in light, Dusk in dark.
- **Shadow Strategy:** Ambient card (see Elevation & Depth).
- **Border:** 1px Sand Border.
- **Internal Padding:** 24px vertical and horizontal, with a 24px gap between header and content.

### Auth Card
- **Composition:** 512px (max-w-lg) on the centered ground, with a 44px meta rail and a bordered footer on `muted/30`.
- **Rail:** 10px uppercase tracked context ("Account", "Recovery") with a 6px primary dot; the current step sits at the right edge.
- **Type:** Geist h1 at 24px/600, a 15px Warm Graphite Muted description, and no serif inside the form.
- **Footer:** quiet account-switch or return link in Terracotta Deep, separated by a 1px warm border.

### Signature: Profile Intake
A three-step onboarding card at 576px beside a 320px live-preview column. The card opens with a 44px meta rail ("Profile intake", current step), a serif "Hello, {first name}." greeting, and a 15px muted promise, then a three-column step rail whose terracotta hairline tracks progress. Steps swap with a 220ms lift and focus their H2. Make the fields feel like play rather than paperwork: quick-pick chips for stage and industry, a −/+ stepper for years, and a chip picker that accepts suggestions or free text. The footer sits on `muted/30` with Back ghosted and the deep-terracotta primary on the right. The preview uses the same 44px rail, a monogram, label/value rows, a completion bar, and a rotated "Ready" stamp when all seven required answers are present; it sticks at `top-24` on desktop and follows the form on mobile.

### Inputs / Fields
- **Style:** 36px tall, 1px Input Line border, transparent ground (a 30% Input tint in dark mode), 6px radius, 12px horizontal padding, 14px text at md and up.
- **Focus:** border shifts to the ring color with a 3px ring at 50% opacity.
- **Error / Disabled:** border and ring shift to destructive; disabled controls dim to 50% and stop pointer events.
- **Password:** a 16px eye control sits inside the field's right edge, sharing the 36px hit area and the same focus ring.

### Navigation
- **Landing header:** sticky at 64px, opaque Warm Paper with a 1px bottom hairline (no blur, no translucency), 12px padding, serif terracotta wordmark at 20–24px, muted nav links that warm to foreground on hover.
- **App sidebar:** 16rem, Sidebar Paper ground, 6px rows with 8px padding, Sand hover in light (near-black Dusk Accent in dark), accent fill for the active item, muted group labels ("Recent Chats"), and a user menu in the footer. On mobile it becomes an 18rem sheet triggered from the top-left; the trigger is hidden at md and up.
- **Chat title bar:** a 12px-padded paper strip with shadow-xs holding the truncated chat title and its rename/delete menu.

### Signature: Session Sheet
The marketing page's spine. A 1328px bordered sheet with a 12px outer radius, a 44px meta rail (primary dot, "Session 01", "First visit", "45 minutes"), a masthead, then three agenda rows on a 56px time rail (92px + 214px at md). Each row pairs a stamped label with its evidence: profile chips, a sample exchange with a memory note, and a next-move card with an entry action. A muted meta footer closes the sheet. Dashed hairlines, not cards, divide the rows.

### Signature: Memory Band
A full-bleed Ink interval with Warm Paper text and translucent paper borders (20% strokes, 5% fills). Two sample session cards ("First session" / "Two weeks later") are joined by a downward arrow and a "Context carried forward" note. The band is flat, has no outer shadow, and is the only inverted surface on marketing.

### Signature: Chat Composer
A single 16px-radius bordered surface holding an auto-growing textarea and a 36px icon submit button, seated in the 768px column. Its ground is transparent (30% Input tint in dark), so it sits on the page rather than inside a card. It is the calmest, most spacious control in the product and the primary point of return.

### Signature: Conversation Thread
User turns are 12px bordered cards (24px horizontal, 16px vertical padding) aligned right; assistant turns are plain Markdown on the ground, aligned left, with a 24px horizontal inset and 40px between messages. The thinking state is a per-character pulse in bold sans: 500ms, 50ms stagger per character, repeating every 2 seconds.

### Signature: Study Illustration
One flat isometric drawing may anchor an otherwise text-led section, as the open notebook and dotted route do in "A counselor, not an oracle." Build it from accent, card, popover, border, and primary tokens with 1–2px warm outlines; no gradients, no stock icons, no decorative animation. It is `aria-hidden` because the surrounding copy carries the meaning.

## Do's and Don'ts

### Do:
- **Do** anchor every screen in Warm Paper or Dusk with warm neutrals; keep neutral hue near 90–107.
- **Do** spend terracotta on identity, primary action, links, focus, and active state only.
- **Do** use Aoboshi One for the wordmark, hero, marketing section headings, agenda row titles, and greeting; Geist for functional UI, body copy, and every auth heading.
- **Do** cap conversational content at 768px and keep 40px between messages.
- **Do** use Terracotta Deep for light-mode marketing CTAs and inline links; use Terracotta Signal for product primary actions.
- **Do** use a 1px warm border plus shadow-xs or shadow-sm before adding depth.
- **Do** give the composer 16px radius and the rest of the controls 6px.
- **Do** keep the Memory section full-bleed Ink with paper text, and use dashed hairlines for the session-sheet time rail.

### Don't:
- **Don't** introduce cold grays, blues, or a second saturated accent; the unused chart tokens are not license for one.
- **Don't** fill large areas with terracotta or use gradients on brand surfaces.
- **Don't** use the serif for body copy, labels, buttons, or auth headings.
- **Don't** raise shadows beyond the soft, low-opacity scale or stack them on the Ink band.
- **Don't** exceed 12px radius on standard cards and controls (the composer is the exception).
- **Don't** put the Memory band inside a card or follow it immediately with another dark band.
- **Don't** add decorative motion; motion is for state, the hero entrance, and the thinking indicator.
