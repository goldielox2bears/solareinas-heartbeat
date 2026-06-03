## Goal
Reposition the homepage from sanctuary/retreat to product-first ranch-goods brand. No destructive changes to data, tables, or existing pages — only edits to homepage sections, navigation, and design tokens.

## Guardrails honored
- No DB tables, products, animals, volunteer applications, or admin features will be deleted, renamed, or altered.
- Retreat pages (FoundersRidingRetreat, FamilyCamp, CowgirlsForChange) remain reachable; homepage only shows a small teaser pointing to ExploreLife.Live.
- All existing sustainability/impact content is preserved and reframed lower on the page as proof.

## Design system updates (`src/index.css`, `tailwind.config.ts`)
- Add Google Fonts: Abril Fatface (display), Josefin Slab (labels/buttons/subheads), Libre Baskerville (body).
- Adjust tokens to "Americana Prairie":
  - `--background`: wheat cream (~`42 38% 92%`)
  - `--primary`: forest green (~`140 25% 22%`)
  - `--accent`: saddle brown (~`24 42% 32%`)
  - keep existing copper/sage tokens for compatibility
- Add utility classes `.font-prairie-display`, `.font-prairie-label`, `.font-prairie-body`. Keep existing utilities to avoid breaking other pages.

## Navigation (`SanctuaryNavigation.tsx`)
Update primary nav order: **Shop · Impact · Animals · Our Story · Free Herd · ExploreLife.Live · Ranch List**. ExploreLife.Live opens external in new tab. Keep search/cart icons. Mobile menu mirrored.

## Homepage rebuild (`src/pages/Index.tsx` + new components in `src/components/ranch/`)

Section order:
1. **HeroProductFirst** (new) — wheat cream background, headline "Ranch-Made. Small Batch. Every Profit Feeds the Farm.", subhead, two CTAs (Shop / See the Farm). Product/jar imagery collage from existing library assets.
2. **ShopByRitual** (refactor existing ChooseYourRitual) — intro "Choose your ritual. Every purchase feeds the farm." Categories rendered from a `useCategories` hook; fall back to hardcoded list (Skin + Body, Equine + Ranch Care, Home + Calm, Gift Boxes, Animal Support, Olive Grove) since `product_categories` table does not yet exist (see Note below).
3. **WhatYourPurchaseSupports** (new) — 5 impact cards using "helps provide / helps support / contributes to" copy. Hardcoded for now (see Note).
4. **NotTestedOnAnimals** (new) — short editorial band with the provided copy.
5. **TheFarmBehindTheGoods** — reuses existing `SustainabilitySection` + rescue stats, retitled "The Farm Your Purchase Feeds."
6. **FreeHerd teaser** — keep existing `FreeHerdCircle` with updated kicker copy.
7. **RetreatsMovedTeaser** (new, replaces RetreatSecondary on homepage) — small card linking to https://www.explorelife.live. Existing retreat pages stay intact and reachable from their direct URLs.
8. **JoinTheRanchList** (new) — email opt-in writing to existing `newsletter_subscribers` table (source: 'ranch_list').

Footer updated to: Shop · Impact · Animals · Free Herd · ExploreLife.Live · Our Story · Contact · Privacy · Terms.

## Note on missing tables
`product_categories`, `product_impact`, and `farm_needs` tables do not exist in Supabase today. To stay non-destructive and unblock the homepage now, I will hardcode categories and impact cards in the new components with clearly-marked constants. If you'd like these editable from the admin panel, I can follow up with an additive migration creating those tables (no changes to existing tables).

## Files touched
- edit: `src/index.css`, `tailwind.config.ts`
- edit: `src/components/SanctuaryNavigation.tsx`
- edit: `src/pages/Index.tsx`
- new: `src/components/ranch/HeroProductFirst.tsx`, `WhatYourPurchaseSupports.tsx`, `NotTestedOnAnimals.tsx`, `RetreatsMovedTeaser.tsx`, `JoinTheRanchList.tsx`
- edit: `src/components/ranch/ChooseYourRitual.tsx` (intro copy + section title)

No DB migrations in this pass.
