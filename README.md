<p align="center">
  <a href="https://chromewebstore.google.com/detail/okifnkjgkefnhikolbijhhnmlkoiiege">
    <img src="https://raw.githubusercontent.com/gabrieldasneves/Luma-Extension/develop/public/logo.png" alt="Luma logo" width="160" />
  </a>
</p>

<h1 align="center">Luma</h1>

<blockquote align="center">
  <p>Chrome extension that captures highlights as you browse, scans page images for one-click download, and exports captures to Word or PDF with source links included</p>
</blockquote>

<p align="center">
  <a href="https://chromewebstore.google.com/detail/okifnkjgkefnhikolbijhhnmlkoiiege"><strong>Install on Chrome Web Store →</strong></a>
</p>

## Core User Flow

### Captures

**Open Side Panel → Press Play → Browse & Highlight → Add to Memory → Preview → Download .docx / .pdf**

1. User opens the Luma side panel
2. Presses **Play** to activate observation mode
3. Browses any webpage — selected text appears live in the panel
4. Presses **Add** to save the current highlight to memory
5. Continues across multiple tabs/pages
6. When done, presses **Preview** to review all captures
7. Presses **Download** to export a `.docx` or `.pdf` file and clear memory

### Images

**Open Side Panel → Images tab → Browse page → Click to download**

1. User switches to the **Images** tab in the side panel
2. Luma scans the active tab for all `<img>` elements (deduplicated by URL)
3. Images appear in a 2-column grid with lazy-loaded previews
4. User clicks any image to download it to the default downloads folder
5. List refreshes automatically when switching tabs or when a page finishes loading

## Features

### Observation Mode

- Activated by the **Play** button in the side panel
- A content script listens to `mouseup` / `selectionchange` events
- The selected text is sent in real-time to the side panel via `chrome.runtime.sendMessage`
- Text appears in a live preview area while selected
- Mode is indicated by a subtle amber glow/border on the panel and a badge on the extension icon

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
- Memory counter displayed in the side panel header (e.g. `12 captures`)

### Light & Dark Mode

- Toggle via the **Sun / Moon** button in the header
- **Light mode** (default): white background, navy text, soft gray surfaces
- **Dark mode**: navy background, off-white text, charcoal surfaces
- Mint and blue accents stay consistent across both themes
- Preference is saved in `chrome.storage.local` and persists across sessions

### Page Images

- Switch to the **Images** tab to scan the active browser tab
- Content script collects all unique `<img>` elements with `src`, `alt`, and dimensions
- Images are shown in a scrollable 2-column grid with hover-to-download overlay
- Click any image to save it — filenames are derived from the `alt` text when available
- Supports remote URLs (via `chrome.downloads`) and inline `data:` / `blob:` sources
- Auto-refreshes on tab switch and page load; manual **Refresh** button available
- Works on regular `http/https` pages only (extension pages and browser internals are excluded)

```

## Technical Architecture

### Extension Structure

```

Luma-Extension/
├── public/
│ ├── manifest.json # MV3 manifest (side panel, icons, permissions)
│ └── logo.png
├── src/
│ ├── App.tsx # Root side panel UI
│ ├── main.tsx
│ ├── background/
│ │ └── background.ts # Service worker — side panel, injection, routing
│ ├── content/
│ │ └── content.ts # Text selection + page image scanning
│ ├── components/ # Atomic Design (atoms → molecules → organisms)
│ ├── contexts/
│ │ └── ThemeProvider.tsx # Light/dark theme state
│ ├── hooks/
│ │ ├── usePageImages.ts # Fetches images from active tab
│ │ └── useTheme.ts
│ ├── lib/
│ │ ├── export.ts # .docx and .pdf generation (client-side)
│ │ └── downloadImg.ts # Image download helpers
│ └── types/
│ └── index.ts # Shared types (Capture, PageImage, Message, etc.)
├── luma_extension.pen # Design source (Pencil)
├── vite.config.ts # Vite 8 + @crxjs/vite-plugin
└── package.json

```

### Storage

| Store                    | Purpose                                                     |
| ------------------------ | ----------------------------------------------------------- |
| `chrome.storage.session` | `captures[]` and `liveSelection` (cleared on browser close) |
| `chrome.storage.local`   | `isObserving` and `theme` — persist across sessions         |

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

Theme-dependent tokens swap automatically via CSS custom properties on `:root` (light) and `.dark`.

**Shared accents (both themes)**

| Token       | Value     | Usage                                            |
| ----------- | --------- | ------------------------------------------------ |
| `luma-mint` | `#2CFFBA` | Primary actions — Play, Pause, Download, accents |
| `luma-blue` | `#2C99FE` | Secondary accent — live preview border, URLs     |
| `luma-navy` | `#151924` | Dark mode background; light mode primary text    |

**Dark mode**

| Token            | Value     | Usage                         |
| ---------------- | --------- | ----------------------------- |
| `luma-surface`   | `#1C212E` | Cards, capture items, buttons |
| `luma-white-off` | `#EEF2F7` | Primary text                  |
| `luma-charcoal`  | `#464952` | Borders, dividers             |
| `luma-gray-400`  | `#8B929E` | Secondary text, metadata      |

**Light mode**

| Token            | Value     | Usage                         |
| ---------------- | --------- | ----------------------------- |
| `background`     | `#FFFFFF` | Side panel background         |
| `luma-surface`   | `#F4F6F9` | Cards, capture items, buttons |
| `luma-white-off` | `#151924` | Primary text                  |
| `luma-border`    | `#D8DDE6` | Borders, dividers             |
| `luma-gray-400`  | `#6B7280` | Secondary text, metadata      |

### Typography

| Role     | Size | Weight      |
| -------- | ---- | ----------- |
| Headings | 14px | 600         |
| Body     | 13px | 400         |
| Metadata | 11px | 400 (muted) |

Font: **Inter** (via `@fontsource-variable/inter`)

### UI Tone

Dual-theme UI with mint and blue accents. Dark mode feels like a focused, professional research tool — cool-toned and precise. Light mode keeps the same accent colors on a clean white canvas for brighter environments. When observation mode is active, a subtle mint ring pulses on the side panel border.

### States

| State           | Visual Signal                                       |
| --------------- | --------------------------------------------------- |
| Idle            | Play button with mint outline                       |
| Observing       | Mint status dot with glow, mint pulse ring on panel |
| Text selected   | Live preview border turns blue, URL shown in blue   |
| Text captured   | Capture counter increments, item appears in list    |
| Ready to export | Download .docx / .pdf buttons enabled (mint fill)   |
| Images tab      | 2-column grid of page images with download overlay  |
| Light mode      | White panel, navy text, soft gray surfaces          |
| Dark mode       | Navy panel, off-white text, charcoal surfaces       |

### UX Rules

- Side panel has two tabs: **Captures** and **Images**
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
├── ui/ ← shadcn/ui primitives
├── atoms/ ← LogoIcon, StatusDot, SectionLabel, Divider
├── molecules/ ← Logo, StatusBadge, ThemeToggle, LivePreview, ActionButton,
│ Toolbar, CaptureListHeader, CaptureItem, CaptureList,
│ EmptyState, FooterButton, ImageCard, ImageGrid,
│ ImagesEmptyState
└── organisms/ ← Header, Body, Footer, ImagesBody

````

Shared types live in `src/types/index.ts`. Export logic lives in `src/lib/export.ts`. Image download logic lives in `src/lib/downloadImg.ts`.

## Development

Requires **Node.js 22.12+** (pin with `.nvmrc`: `nvm use`).

```bash
npm install
npm run dev          # Vite dev server
npm run build        # Production extension build
npm run storybook    # Component explorer on http://localhost:6006
npm run lint         # ESLint
npx tsc --noEmit     # Type-check
````
