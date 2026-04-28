# spz-ui
> spz-ui design system — shared TypeScript component library

spz-ui is **not a FiveM resource** and has no `fxmanifest.lua`. It is a TypeScript component library that provides the shared UI design system for all SPZ NUI resources. Components are copied into each resource's `ui/src/components/` directory at build time.

## Components

Located in `src/components/`:

- `Button` — primary, secondary, ghost variants
- `Badge` — status and label badges
- `Input` — text input with validation states
- `Card` — content container
- `Modal` — overlay dialog
- `Tabs` — tabbed navigation
- `Toast` — notification toasts
- `Slider` — range slider input
- `Avatar` — player avatar display

## Design Tokens

| File                     | Purpose                                      |
| ------------------------ | -------------------------------------------- |
| `src/styles/theme.css`   | CSS custom properties (colors, spacing, etc.)|
| `src/styles/fonts.css`   | Font face declarations                       |
| `src/styles/nui-base.css`| Base reset and NUI-specific global styles    |

## Usage

Components are consumed by all UI resources (`spz-carspawner`, `spz-leaderboard`, `spz-speedometer`, `spz-nametag`, `spz-spawn`, `spz-poll`, `spz-raceUI`, `spz-stance`, `spz-loading`). The build pipeline copies the `src/components/` and `src/styles/` contents into each resource before compiling.

## CI
Built and released via `.github/workflows/release.yml` on push to `main`.
