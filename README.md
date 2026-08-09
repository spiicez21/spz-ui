# spz-ui

> Shared NUI design system and state listeners · `v2.0.0`

## Overview

`spz-ui` is two things:

1. A **TypeScript component library** — the design system every SPZ NUI resource is built
   from. Components and styles are copied into each resource's `ui/src/` at build time
   rather than imported at runtime, so each NUI ships self-contained.
2. A **thin FiveM resource** — `client/state_listeners.lua` mirrors framework state into
   the UI layer so components can react without each resource wiring its own listeners.

## Components

`src/components/`:

`Avatar` · `Badge` · `Button` · `Card` · `Checkbox` · `IconButton` · `Input` · `Modal` ·
`ProgressBar` · `Prompt` · `RadialMenu` · `Separator` · `Skeleton` · `Slider` · `Spinner` ·
`Stack` · `StatNumber` · `StatsCard` · `Switch` · `Table` · `Tabs` · `ThirdEye` · `Toast`

Each ships as a `.tsx` plus a matching `.css`.

## Design tokens

| File | Purpose |
|---|---|
| `src/styles/theme.css` | CSS custom properties — colours, spacing, radii, elevation |
| `src/styles/fonts.css` | Font face declarations |
| `src/styles/nui-base.css` | Reset and NUI-specific globals |

## Consumers

`spz-spawn` · `spz-raceUI` · `spz-poll` · `spz-nametag` · `spz-speedometer` ·
`spz-loading` · `spz-carspawner`

Copy `src/components/` and `src/styles/` into the resource's `ui/src/` before building it.

## Dependencies

`ox_lib` · `spz-core`

---

Part of [SPiceZ-Core](../README.md) · GPL-3.0
