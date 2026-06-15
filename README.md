
<p align="center">
  <a href="https://chromewebstore.google.com/detail/okifnkjgkefnhikolbijhhnmlkoiiege">
    <img src="https://raw.githubusercontent.com/gabrieldasneves/Luma-Extension/develop/public/logo.png" alt="Luma logo" width="160" />
  </a>
</p>

<h1 align="center">Luma</h1>

<blockquote align="center">
  <p>Chrome extension that captures highlights as you browse and exports them to Word or PDF with source links included</p>
</blockquote>

<p align="center">
  <a href="https://chromewebstore.google.com/detail/okifnkjgkefnhikolbijhhnmlkoiiege"><strong>Install on Chrome Web Store →</strong></a>
</p>

## Core User Flow

**Open Popup → Press Play → Browse & Highlight → Add to Memory → Preview → Download .docx**

1. User opens the Luma popup
2. Presses **Play** to activate observation mode
3. Browses any webpage — selected text appears live in the popup
4. Presses **Add** to save the current highlight to memory
5. Continues across multiple tabs/pages
6. When done, presses **Preview** to review all captures
7. Presses **Download** to export a `.docx` file and clear memory

## Features

### Observation Mode

- Activated by the **Play** button in the popup
- A content script listens to `mouseup` / `selectionchange` events
- The selected text is sent in real-time to the popup via `chrome.runtime.sendMessage`
- Text appears in a live preview area in the popup while selected
- Mode is indicated by a subtle amber glow/border on the popup and a badge on the extension icon

### Capture & Memory

**Add** saves the current highlight as a `Capture` object:

```ts
interface Capture {
  id: string;
  text: string;
  pageTitle: string;
  url: string;
  timestamp: number;
  favicon?: string;
}
```

- Captures are stored in `chrome.storage.session` (cleared when browser closes)
- Memory counter displayed in the popup header (e.g. `12 captures`)



## Technical Architecture

### Extension Structure

```
Luma-Extension/
├── public/
│   ├── manifest.json       # MV3 manifest (side panel, icons, permissions)
│   └── logo.png
├── src/
│   ├── App.tsx             # Root side panel UI
│   ├── main.tsx
│   ├── background/
│   │   └── background.ts   # Service worker — side panel, injection, routing
│   ├── content/
│   │   └── content.ts      # Detects text selection on pages
│   ├── components/         # Atomic Design (atoms → molecules → organisms)
│   ├── lib/
│   │   └── export.ts       # .docx and .pdf generation (client-side)
│   └── types/
│       └── index.ts        # Shared types (Capture, Message, etc.)
├── luma_extension.pen      # Design source (Pencil)
├── vite.config.ts          # Vite 8 + @crxjs/vite-plugin
└── package.json
```



### Storage


| Store                    | Purpose                                                     |
| ------------------------ | ----------------------------------------------------------- |
| `chrome.storage.session` | `captures[]` and `liveSelection` (cleared on browser close) |
| `chrome.storage.local`   | `isObserving` — persists observation mode across sessions   |


### Multi-tab Support

When observation mode is enabled, the background worker injects the content script into all open `http/https` tabs and re-injects on tab switch or page load. Selection state is read from `chrome.storage.local` on every capture, so new tabs work without a manual refresh.

## Tech Stack


| Layer                  | Technology                                      |
| ---------------------- | ----------------------------------------------- |
| Build tool             | Vite 8 + CRXJS plugin                           |
| UI framework           | React 19 + TypeScript 6                         |
| Styling                | Tailwind CSS v4                                 |
| Components             | shadcn/ui (base-luma preset)                    |
| Component architecture | Atomic Design (atoms → molecules → organisms)   |
| Component explorer     | Storybook 10 (`@storybook/react-vite`)          |
| Icons                  | lucide-react                                    |
| Doc generation         | `docx` v9 + `jspdf` (browser-only, no server)   |
| Extension API          | Chrome Manifest V3                              |
| CI                     | GitHub Actions — type-check + ESLint on push/PR |


## Visual Identity

**Name:** Luma — from Latin *lumen* (light). Highlighting is illuminating what matters.

**Logo:** Gradient teal-to-mint mark on transparent background (`public/logo.png`).

### Color Palette


| Token            | Value     | Usage                                            |
| ---------------- | --------- | ------------------------------------------------ |
| `luma-mint`      | `#2CFFBA` | Primary actions — Play, Pause, Download, accents |
| `luma-blue`      | `#2C99FE` | Secondary accent — live preview border, URLs     |
| `luma-navy`      | `#151924` | Side panel background, text on mint buttons      |
| `luma-surface`   | `#1C212E` | Cards, capture items, secondary buttons          |
| `luma-charcoal`  | `#464952` | Borders, dividers, section labels                |
| `luma-white-off` | `#EEF2F7` | Primary text                                     |
| `luma-gray-400`  | `#8B929E` | Secondary text, metadata                         |


### Typography


| Role     | Size | Weight      |
| -------- | ---- | ----------- |
| Headings | 14px | 600         |
| Body     | 13px | 400         |
| Metadata | 11px | 400 (muted) |


Font: **Inter** (via `@fontsource-variable/inter`)

### UI Tone

Dark navy UI with mint and blue accents. Feels like a focused, professional research tool — cool-toned and precise. When observation mode is active, a subtle mint ring pulses on the side panel border.

### States


| State           | Visual Signal                                       |
| --------------- | --------------------------------------------------- |
| Idle            | Dark panel, Play button with mint outline           |
| Observing       | Mint status dot with glow, mint pulse ring on panel |
| Text selected   | Live preview border turns blue, URL shown in blue   |
| Text captured   | Capture counter increments, item appears in list    |
| Ready to export | Download .docx / .pdf buttons enabled (mint fill)   |


### UX Rules

- Side panel fills available width (min **280px**), full height
- Live preview shows maximum **5 lines** of selected text before truncating
- Empty state: *"Start browsing and select text to capture"*
- No confirmation dialogs — captures can be deleted individually
- Download buttons disabled until at least 1 capture exists
- Export clears all captures from session memory after download

## Component Architecture

Components follow **Atomic Design** under `src/components/`:

```
src/components/
├── ui/          ← shadcn/ui primitives
├── atoms/       ← LogoIcon, StatusDot, SectionLabel, Divider
├── molecules/   ← Logo, StatusBadge, LivePreview, ActionButton,
│                   Toolbar, CaptureListHeader, CaptureItem,
│                   CaptureList, EmptyState, FooterButton
└── organisms/   ← Header, Body, Footer
```

Shared types live in `src/types/index.ts`. Export logic lives in `src/lib/export.ts`.

## Storage


| Store                    | Purpose                                        |
| ------------------------ | ---------------------------------------------- |
| `chrome.storage.session` | Captures — cleared when the browser closes     |
| `chrome.storage.local`   | `isObserving` state — persists across sessions |


## Development

Requires **Node.js 22.12+** (pin with `.nvmrc`: `nvm use`).

```bash
npm install
npm run dev          # Vite dev server
npm run build        # Production extension build
npm run storybook    # Component explorer on http://localhost:6006
npm run lint         # ESLint
npx tsc --noEmit     # Type-check
```

