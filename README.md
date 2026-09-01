# newhome demo

A demo Swiss real-estate marketplace inspired by [newhome.ch](https://www.newhome.ch), built with Next.js (App Router), TypeScript and Tailwind CSS. Not affiliated with the real newhome.ch — this is a portfolio/demo project with generated sample data.

## Features

- Home page with hero search, category browsing, featured listings and popular cities
- Listing search with filters (listing type, property type, location, price, rooms), sorting, and grid/map views (Leaflet + OpenStreetMap)
- Property detail pages with photo gallery, map, agent contact card and similar listings
- Agent directory and agent profile pages
- Favorites saved to the browser (localStorage), no account needed
- Admin area (passcode-protected) to create, edit and delete listings

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) (the dev script runs on port 3001).

## Admin

Go to `/admin` and sign in with the demo passcode `newhome2026` (configurable via the `ADMIN_PASSCODE` env var). From there you can add, edit and delete listings — changes are written to `data/properties.json`.

## Data

Sample listings live in `data/properties.json` and `data/agents.json`. Regenerate the property set with:

```bash
node scripts/gen-properties.mjs
```

Images are placeholder photos from picsum.photos; agent avatars from pravatar.cc.
