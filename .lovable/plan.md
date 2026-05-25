# Rebranch Solareinas.life to a Product-Led Ranch Brand

## Goal

Shift the homepage and primary brand message from "rescue retreat" to "ranch-made products that fund the farm" — without touching the Supabase backend, existing products, animal records, retreat content, volunteer applications, or sustainability sections.

Brand line: **Ranch-Made. Small Batch. Every Profit Feeds the Farm.**

## Memory + language guardrails (kept)

- Brand identity stays **Ranch Rescue / Solareinas**, never "The Sanctuary".
- Vocabulary stays: gifts/support (not "buy/price/fee"), stewards (not "customers"). The shop/product copy will use "choose / bring home / support" framing instead of "buy / purchase".
- Manual payments only (no Stripe). Resend stays for admin notifications.
- Logos transparent, Turnstile on all public forms, strict RLS untouched.

The user's prompt uses "customers/purchase" — I'll soften that to comply with the language playbook ("choose a product", "bring home", "your support") while keeping the product-first energy they asked for.

## Backend — zero destructive changes

- No migrations. No data deletions. No category renames in DB.
- Reuse existing `products` table, `animals`, `volunteer_applications`, `retreat_signups`, `community_testimonials`, `newsletter_subscribers` as-is.
- "Choose Your Ritual" categories are a **front-end grouping layer** over existing products. If products don't have a category field today, group by `slug` prefix / a small front-end lookup map; no schema change.
- Animal thank-you cards read from existing `animals` table.
- Volunteer form continues to write to `volunteer_applications` (already built via `VolunteerSignupForm`).

If later the user wants product↔animal linking in the DB, that's a follow-up migration — not part of this pass.

## Homepage rebuild (`src/pages/Index.tsx`)

Replace the current section order with a product-led flow. All existing section components are preserved and re-used:

```text
SanctuaryNavigation  (updated labels)
HeroRanchMade        (NEW — product-led hero)
Marquee              (kept)
ChooseYourRitual     (NEW — 5 category cards)
EveryProductHasPurpose (NEW — impact tiles)
MeetWhoYouHelp       (NEW — animal thank-you, reads from animals table)
SustainabilitySection (kept, retitled "Made with Care for the Land, Too")
FreeHerdCircle       (kept — Join the FREE HERD)
RetreatSecondary     (NEW — compact teaser linking to Founders/Family/Cowgirls)
SanctuaryTestimonials (kept)
Footer               (kept)
```

`SanctuaryHero`, `SanctuaryWelcome`, `RescueLedger`, `SanctuaryGallery`, `SanctuaryImpact`, `FoundersRidingRetreat` stay in the codebase and stay routed — just not front-and-center on `/`. The retreats keep their dedicated routes (`/family-camp`, `/cowgirls-for-change`, plus the `#giving` Founders section, which we'll move onto its own anchor inside the new RetreatSecondary teaser or keep on a sub-page).

## New components

1. **`HeroRanchMade.tsx`** — full-bleed warm imagery, brand line as H1, two CTAs: "Shop Ranch-Made Goods" → `/shop`, "Meet Who You Help" → `#meet-the-animals`. Keeps the existing TransparentLogo, Stamp, kicker style.
2. **`ChooseYourRitual.tsx`** — 5 category cards (Skin + Body, Equine + Ranch Care, Home + Calm, Gift Boxes, Animal Support Collection) with the supplied copy and an "Explore" CTA. Filters existing products front-end by a `categoryMap` keyed off product slug/name; falls back to `/shop` if a group is empty.
3. **`EveryProductHasPurpose.tsx`** — section title + 6 impact tiles (feed, vet care, farrier, shelter, land regeneration, water/farm systems) using copper-patina gradient icons.
4. **`MeetWhoYouHelp.tsx`** — pulls 3–4 animals via `supabase.from('animals').select(...).limit(4)`, renders "Thank you from {name}" cards with photo, story snippet, care need, CTA to `/sponsor/{id}`.
5. **`RetreatSecondary.tsx`** — small section "Want to Experience the Farm in Person?" with three subtle links to Founders / Family Camp / Cowgirls.

All new components use existing semantic tokens (no raw colors), `font-display`, `font-hand`, `gradient-copper`, `Stamp`, etc.

## Navigation update (`SanctuaryNavigation.tsx`)

New primary nav (desktop + mobile sheet):

- Shop (→ `/shop`)
- Choose Your Ritual (→ `/#rituals`)
- Meet the Animals (→ `/#meet-the-animals`)
- Our Impact (→ `/#impact`)
- Sustainability (→ `/#sustainability`)
- FREE HERD (→ `/#volunteers`)
- Retreats (dropdown: Founders, Family, Cowgirls for Change)
- About (→ `/#about` — uses existing Welcome section anchored)

Primary nav button: **Shop Ranch-Made Goods** (→ `/shop`). Secondary: **Join the FREE HERD** (→ `/volunteer-signup`). Auth/Admin buttons preserved exactly.

## Sustainability + FREE HERD

- `SustainabilitySection` keeps its content; only the heading copy is softened to "Made with Care for the Land, Too" via a prop (or inline tweak).
- `FreeHerdCircle` keeps its existing form linkage; we'll just confirm the section anchor `id="volunteers"` and CTA copy match the new brand line.

## SEO

Update `<SEO>` on `Index.tsx`:

- title: "Solareinas — Ranch-Made. Small Batch. Every Profit Feeds the Farm."
- description: "Small-batch skincare, equine care, home rituals & meaningful gifts from a Sierra Nevada ranch. Every profit feeds the animals and land."
- path: `/`

`index.html` static title/description updated to match. Per-route SEO on Shop / Quiz / Market / Family Camp / Cowgirls / Gift / Sponsor pages stays as-is.

## What is explicitly NOT changing

- No Supabase migrations.
- No edits to `products`, `animals`, `volunteer_applications`, or any other table.
- No removal of existing pages, routes, components, retreats, gallery, testimonials, quiz, market, or admin panel.
- No payment integration changes (manual processing remains).
- No design-token or palette change beyond what already exists.

## Deliverables

- 5 new components under `src/components/ranch/`.
- Rewritten `src/pages/Index.tsx` orchestrating the new flow.
- Updated `SanctuaryNavigation.tsx` (labels + primary CTA).
- Minor copy tweak in `SustainabilitySection` heading.
- Updated `<SEO>` on home + `index.html` static head.

After approval I'll implement in one pass and verify the build.
