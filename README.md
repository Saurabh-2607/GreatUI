# Great UI

A collection of clean, accessible, and composable React components built with Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/
├── page.tsx                      # Landing page
└── components/[slug]/page.tsx    # Component page (preview + docs)

components/
├── Sidebar.tsx                   # Component list
├── TopBar.tsx                    # Top navigation bar
└── PropsPanel.tsx                # Right-side props & docs panel

lib/
└── registry.ts                   # Component metadata registry
```

## Adding a component

1. Add an entry to `lib/registry.ts`
2. Drop the component file into `components/`
3. Render it in `app/components/[slug]/page.tsx`
