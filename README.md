# Luma

**Illuminate what matters. Capture as you read.**

Luma is a Chrome extension that lets users highlight text on any webpage and collect those highlights into a structured Word document — automatically tagged with the source page title and URL.

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
  id: string
  text: string
  pageTitle: string
  url: string
  timestamp: number
  favicon?: string
}
```

- Captures are stored in `chrome.storage.session` (cleared when browser closes)
- Memory counter displayed in the popup header (e.g. `12 captures`)

### Preview Mode

In-popup list of all captures in order of capture. Each entry shows:

- Highlighted text (truncated at 3 lines)
- Page title + favicon
- URL (shortened)
- Timestamp

Items can be deleted individually via a trash icon. Items cannot be reordered — order of capture is preserved.

### Export

Clicking **Download** generates a `.docx` file using the `docx` npm library. The file is downloaded directly in the browser — no server involved.

**Document structure:**

- Title: `Luma — Research Export` + date
- Each capture as a block:
  - Highlighted text (styled as a block quote)
  - Source: `[Page Title](URL)`
  - Separator line

After a successful download, all captures are cleared from memory.

## Technical Architecture

### Extension Structure

```
luma/
├── public/
│   └── manifest.json
├── src/
│   ├── popup/
│   │   ├── App.tsx           # Root popup component
│   │   ├── main.tsx
│   │   └── components/
│   │       ├── LivePreview.tsx
│   │       ├── CaptureList.tsx
│   │       ├── CaptureItem.tsx
│   │       └── Toolbar.tsx
│   ├── content/
│   │   └── index.ts          # Injected into pages — detects selection
│   ├── background/
│   │   └── index.ts          # Service worker — manages storage & message routing
│   └── types/
│       └── index.ts          # Shared types (Capture, Message, etc.)
├── vite.config.ts
└── package.json
```

### Manifest (v3)

```json
{
  "manifest_version": 3,
  "name": "Luma",
  "version": "1.0.0",
  "permissions": ["storage", "activeTab", "scripting", "tabs"],
  "action": { "default_popup": "popup.html" },
  "background": { "service_worker": "background.js" },
  "content_scripts": [{
    "matches": ["<all_urls>"],
    "js": ["content.js"],
    "run_at": "document_idle"
  }]
}
```

### Message Protocol

```ts
type Message =
  | { type: 'SELECTION_CHANGED'; text: string; pageTitle: string; url: string }
  | { type: 'ADD_CAPTURE'; capture: Capture }
  | { type: 'GET_CAPTURES' }
  | { type: 'DELETE_CAPTURE'; id: string }
  | { type: 'CLEAR_ALL' }
  | { type: 'SET_ACTIVE'; active: boolean }
```

### Storage

| Store | Purpose |
|---|---|
| `chrome.storage.session` | Captures array (cleared on browser close) |
| `chrome.storage.local` | User preferences (observation mode state) |

## Tech Stack

| Layer | Technology |
|---|---|
| Build tool | Vite 8 + CRXJS plugin |
| UI framework | React 19 + TypeScript 6 |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (base-luma preset) |
| Component architecture | Atomic Design (atoms → molecules → organisms) |
| Component explorer | Storybook 10 (`@storybook/react-vite`) |
| Icons | lucide-react |
| Doc generation | `docx` v9 (browser-compatible, no server) |
| Extension API | Chrome Manifest V3 |
| CI | GitHub Actions — type-check + ESLint on push/PR |

## Visual Identity

**Name:** Luma — from Latin *lumen* (light). The act of highlighting is an act of illuminating what matters.

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `luma-amber-400` | `#F5A623` | Primary action, active state glow, Play button |
| `luma-amber-300` | `#FAC75A` | Hover states, live preview borders |
| `luma-slate-900` | `#1E1E2E` | Popup background |
| `luma-slate-800` | `#2A2A3C` | Card / item backgrounds |
| `luma-slate-600` | `#4A4A6A` | Borders, dividers |
| `luma-white-off` | `#F8F7F4` | Primary text |
| `luma-gray-400` | `#9898AA` | Secondary text, metadata |

### Typography

| Role | Size | Weight |
|---|---|---|
| Headings | 14px | 600 |
| Body | 13px | 400 |
| Metadata | 11px | 400 (muted) |

Font: **Inter** (via `@fontsource-variable/inter`)

### UI Tone

Dark UI with amber accents. Feels like a focused, professional research tool — not a toy. Compact but breathable. When observation mode is active, a subtle amber ring pulses on the popup border.

### States

| State | Visual Signal |
|---|---|
| Idle | Dark popup, play button visible |
| Observing | Amber badge on extension icon, amber ring on popup |
| Text selected | Live preview area lights up with selected text |
| Text captured | Brief flash confirmation, counter increments |
| Preview | Full list view, download button prominent |

### UX Rules

- Popup is fixed width: **380px**, scrollable vertically
- Live preview shows maximum **5 lines** of selected text before truncating
- Empty state: *"Start browsing and select text to capture"*
- No confirmation dialogs — undo available for the last capture only (5 second window)
- Download button disabled until at least 1 capture exists
- Extension badge shows capture count (max `99+`)

## Out of Scope (v1)

- Image capture
- PDF support
- Cross-device sync
- Folders or tagging
- Edit after capture
- Markdown or PDF export (Word only for v1)
- AI summarization of captures

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

| Store | Purpose |
|---|---|
| `chrome.storage.session` | Captures — cleared when the browser closes |
| `chrome.storage.local` | `isObserving` state — persists across sessions |

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
