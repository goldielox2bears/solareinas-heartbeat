

# Founders Riding Retreat -- Replace GivingWall Section

## Overview

Replace the placeholder "Gratitude Flows" section with a compelling **Founders Riding Retreat** invitation -- a real, bookable experience that funds the ranch and grants Founding Steward status.

## The Experience

**Founders Riding Retreat** -- an exclusive 4-day immersion in the Sierra Nevada mountains of southern Spain.

**Itinerary:**
- **July 2** -- Arrive at Solareinas Ranch. Pizza dinner welcome. Meet the resident animals.
- **July 3-5** -- 3-day mountain ride: mule riding, custom painted tents, cultural and historical immersion, guides, and all meals included.

**Details:**
- 5 spots only
- EUR 1,000 per person (all-inclusive)
- Founding Steward status: first access to newly built volunteer cabins
- 100% of proceeds fund the ranch

## Implementation

### 1. Copy 8 uploaded images to project assets
Save the user's uploaded photos to `src/assets/summer-ride/` with descriptive names:
- `tent-interior.jpeg` (IMG_1681)
- `painted-tent-exterior.jpeg` (IMG_1684)
- `horses-grazing-pines.jpeg` (IMG_1717)
- `founder-with-dog.jpeg` (IMG_1725)
- `peaceful-grazing.jpeg` (IMG_1746)
- `pack-mules-trail.jpeg` (IMG_1754)
- `rider-mountain-vista.jpeg` (IMG_1649)
- `mule-rocky-summit.jpeg` (IMG_1639)

### 2. Create `src/components/FoundersRidingRetreat.tsx`
New component replacing GivingWall, containing:

- **Section headline**: "Founders Riding Retreat" with a subtitle inviting visitors to step into the Sierra Nevada
- **Photo grid**: 2x4 or masonry layout on desktop, scrollable on mobile, using the 8 uploaded images
- **Itinerary timeline**: Visual day-by-day breakdown
  - Day 0 (July 2): Pizza dinner welcome at the ranch, meet the residents
  - Days 1-3 (July 3-5): Mountain ride with all inclusions
- **What's included list**: Mule riding, custom tents, guides, food, cultural immersion
- **Founding Steward badge**: Highlight that participants get first access to future cabins
- **Pricing and availability**: "5 spots -- EUR 1,000 contribution per person"
- **CTA button**: "Reserve Your Spot" linking to `/gift?project=Founders%20Riding%20Retreat`
- Language follows the Solareinas playbook (gift/contribution/steward, not buy/purchase/ticket)

### 3. Update `src/pages/Index.tsx`
- Replace `import GivingWall` with `import FoundersRidingRetreat`
- Swap `<GivingWall />` for `<FoundersRidingRetreat />` inside the `id="giving"` section wrapper
- GivingWall.tsx remains in the codebase but unused

### Design Notes
- Uses existing UI components: Card, Badge, Button (steward variant)
- Responsive: stacked layout on mobile, side-by-side photo grid + details on desktop
- Warm, inviting tone consistent with the rest of the site
- No "price/fee/ticket/book/buy" language per the brand playbook

