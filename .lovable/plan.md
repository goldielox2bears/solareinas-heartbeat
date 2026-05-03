# Solareinas Bold Refresh — "Wild Heart on Bone"

A hybrid: **Direction B's disciplined color palette** (bone, ink, terracotta-rust, one electric accent) carrying **Direction C's scrapbook energy** (polaroids, tape, stamps, mixed type, asymmetric layouts, handwritten captions).

The result: emotional and handmade like a ranch journal, but visually **disciplined** and **bold** — never busy or cluttered. The restricted palette keeps the scrapbook from becoming chaotic.

---

## The Visual System

### Color tokens (replaces current pale cream/sage system)

```text
--bone        soft warm white, near-paper        background
--ink         near-black with warm undertone     foreground / headlines
--rust        terracotta-rust (deep, saturated)  primary
--marigold    electric warm yellow               single accent / "stop" markers
--shadow-ink  pure ink for hard drop-shadows
--tape        translucent kraft tan              polaroid tape strips only
```

Old sage / amber / copper-patina tokens stay defined for legacy components but are no longer the dominant language. New components use only the 5 above.

### Typography

- **Display serif:** Playfair Display 900 (anchor headlines, big and confident)
- **Handwritten:** Caveat (captions, "from the field", taglines, polaroid scribbles)
- **Body sans:** Inter (already loaded)

Mixed deliberately: headlines are heavy serif, *one* word per section may be Caveat-script in marigold for emotional punctuation.

### Motifs (the Wild Heart layer)

- **Polaroid frames:** white card, generous bottom margin, slight rotation (-3° to +4°), tape strip at top corner.
- **Tape strips:** translucent kraft, rotated, used on photos and testimonial cards.
- **Stamp badges:** circular or rectangular "RESCUED 2024", "STEWARD APPROVED", rotated -7°, ink outline, marigold fill.
- **Hard ink shadows:** 6-8px solid ink offset on buttons and key cards (no soft glow).
- **Scribble underline:** SVG hand-drawn underline in marigold under one word per section headline.
- **Asymmetric grid:** no straight rows on Why We Exist or Gallery — staggered vertical offsets.
- **Section numbers:** big rust serif "01 — SANCTUARY" kicker labels.

### What we drop

- Soft pastel gradients (`bg-gradient-peaceful`, `bg-gradient-copper` on round icon circles).
- Whisper-thin `font-light` headlines.
- Round 16px icon emoji circles.
- Soft shadows (`shadow-gentle`, `shadow-warm`) replaced with hard ink offsets where bold is wanted; soft retained only inside calm content cards.

---

## What gets built

### 1. Design tokens — `src/index.css`
Add the 5 new HSL tokens, register Playfair Display + Caveat from Google Fonts, add utility classes: `.scribble-under`, `.tape-strip`, `.polaroid`, `.hard-shadow-ink`, `.sticker`, `.stamp`, `.kicker`.

### 2. Tailwind config — `tailwind.config.ts`
Register `bone`, `ink`, `rust`, `marigold`, `tape` as named colors; add `font-display` (Playfair) and `font-hand` (Caveat); add `shadow-ink` (8px hard offset).

### 3. Button variants — `src/components/ui/button.tsx`
Two new variants:
- `bold`: rust fill, ink text, `shadow-ink`, square corners.
- `stamp`: marigold fill, ink border, rotated -3°, Caveat font.
Existing variants kept for back-compat.

### 4. New shared components — `src/components/wildheart/`
- `SectionKicker.tsx` — "01 — SANCTUARY" rail label + big serif headline with one scribbled word.
- `Polaroid.tsx` — image wrapped in rotated white frame with tape and optional handwritten caption.
- `Stamp.tsx` — rotated badge for impact stats / "RESCUED" markers.
- `Marquee.tsx` — horizontal scrolling strip for rescue names + impact numbers.

### 5. Hero rebuild — `SanctuaryHero.tsx`
- Full-bleed photo, darker overlay.
- Bottom-left: kicker "EST. SIERRA NEVADA — A LIVING SANCTUARY" → giant Playfair headline ("A sanctuary you helped *build*.") with "build" scribbled in marigold Caveat.
- Three CTAs become rust + marigold + outline buttons with hard ink shadows, no emoji.
- Top-right logo retained.
- Replace the soft scroll indicator with a small rotated stamp ("scroll ↓").

### 6. Welcome / Why We Exist — `SanctuaryWelcome.tsx`
- Drop the soft `bg-gradient-peaceful`; use bone + paper grain.
- Mission statement becomes editorial: kicker + huge serif H2 + body.
- 4 pillars become asymmetric polaroids with handwritten captions, staggered vertically (not a clean grid). Drop the round gradient icon circles entirely.

### 7. Navigation — `SanctuaryNavigation.tsx`
- Switch active link to ink-on-bone with rust underline scribble on hover.
- Logo lockup stays; primary CTA in nav becomes a `bold` button.

### 8. Marquee strip
Insert between Welcome and Rescue Ledger: scrolling row of "★ 47 RESCUED ★ 12 ACRES STEWARDED ★ 230 STEWARDS ★ ..." in rust on bone, ink top + bottom border.

### 9. Market product cards — `MarketPage.tsx`
Wrap each product image in `Polaroid` (subtle rotation alternating per index). Hero badge becomes a `Stamp`. Hover overlay keeps current sensory reveal. Section headers gain kickers.

### 10. Footer CTA on `Index.tsx`
Replace `bg-gradient-steward` block with bone background, big serif "Step into the sanctuary." (with "sanctuary" scribbled in marigold), bold buttons.

---

## Phasing (so you can preview before full commit)

**Phase 1 — Foundation + Hero (ship first to gauge reaction):**
1. Tokens + fonts + utility classes
2. Button variants
3. Hero rebuild
4. Marquee strip
5. SectionKicker + Polaroid + Stamp components

**Phase 2 — Section spread:**
6. Welcome + Why We Exist asymmetric polaroids
7. Navigation refresh
8. Footer CTA

**Phase 3 — Market & retreats:**
9. Market product cards in polaroids
10. Apply kickers to retreat pages (Founders, Family Camp, Cowgirls, Made Here For You)

I'd recommend shipping Phase 1 first so you can feel the new energy before we touch every page. Confirm and I'll build Phase 1.
