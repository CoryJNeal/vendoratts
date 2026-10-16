# Prospective vendor catalog discovery

Internal screening app for **website-derived draft** product records. You enter a prospective vendor and official site, optionally query by **item type** (footwear, glasses, apparel, other) and/or **attribute** (for example FR), then execute a bounded discovery run. The output is a review package the vendor can later correct and approve.

Nothing in this app is vendor-approved, authorized for reuse, or ready for publication.

## What it does

- Captures vendor intake (scope, include/exclude, known style numbers/URLs, image permission).
- Queries the official host only, capped at **10** products unless you paste specific product URLs.
- Extracts published identifiers, specifications, safety language, and image **links**.
- Keeps original vendor wording, source URL, and date accessed.
- Leaves vendor-confirmation columns blank.
- Exports an `.xlsx` workbook (Discovery Summary, Products, Attributes and Evidence, Images, Questions, Field Inventory, Vendor Instructions).

Longer term, the same JSON job payload can be loaded onto your vendor-review site. Website-derived values stay immutable; vendor-confirmed columns become the submitted payload.

## Image permission

If permission is **Not confirmed** (default), the app inventories source image URLs only. It does not download, embed, or build a contact sheet. Publicly accessible images are not treated as free to reuse.

## Run locally

```bash
npm install
npm run dev -- --port 43123
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123). Use **Load sample** to try work boots + safety toe, or FR apparel, then execute.

Jobs are stored as JSON under `data/jobs/`.

## Pipeline states

This slice only produces **website-derived draft**. Later states are documented, not implemented:

Website-derived draft → Internal screening → Vendor review → Vendor submitted → Internal approval → Released for setup
