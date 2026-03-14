

# Travel Personality Quiz

A standalone, shareable quiz that identifies visitors by their travel style — matching them to a sanctuary animal, a retreat experience, and a travel personality archetype. Designed to work as an embeddable widget and generate shareable result cards.

## How It Works

1. Visitors answer a series of visual, quick-tap questions about their travel preferences (adventure vs. calm, solo vs. group, mountains vs. coast, etc.)
2. Answers are scored across personality dimensions
3. Results page shows:
   - A **travel personality type** (e.g. "The Rooted Nomad", "The Trail Whisperer", "The Gentle Explorer")
   - A **matched sanctuary animal** with photo and story snippet
   - A **recommended retreat activity** from the Founders Riding Retreat
   - A **shareable card** (styled image) they can download or share

## Architecture

```text
/quiz                          ← New route
  QuizPage.tsx                 ← Container page
  components/quiz/
    QuizIntro.tsx              ← Welcome screen + start button
    QuizQuestion.tsx           ← Single question with visual options
    QuizProgress.tsx           ← Progress bar
    QuizResult.tsx             ← Result display + share card
    QuizShareCard.tsx          ← Canvas-rendered card for download
    quizData.ts                ← Questions, scoring logic, result profiles
```

## Quiz Flow

- **Intro screen**: Branded card — "Discover Your Trail Type" with a Start button
- **Questions**: Each question shows 3-4 image/icon options. Tap to select, auto-advance to next. Progress bar at top.
- **Result screen**: Personality type name, short description, matched animal photo, retreat recommendation, and a "Download Your Card" / "Share" button
- **Lead capture** (optional toggle): Can be added later as a gate before results

## Embeddable Widget Support

- The quiz will be built as a self-contained React component tree under `/quiz`
- For embedding on external sites, it can be shared via the published URL in an iframe: `<iframe src="https://solareinas-heartbeat.lovable.app/quiz" />`
- The quiz page will have no site navigation — clean, full-screen experience suitable for iframe embedding

## Shareable Results Card

- Uses HTML Canvas (via `html-to-image` or similar) to render a styled card with:
  - Personality type name and icon
  - Matched animal photo
  - Solareinas Ranch branding and URL
- One-tap download as PNG or share via Web Share API (mobile)

## Technical Details

- **Scoring**: Each answer maps to weighted traits. Result profiles are pre-defined objects with thresholds.
- **Animal matching**: Uses the `animals` table from Supabase to pull real resident data and photos.
- **No auth required**: Quiz is fully public.
- **Responsive-first**: Designed for mobile tap interactions, works on desktop too.
- **New route**: `/quiz` added to App.tsx, no nav bar on this page for clean embed experience.
- **Navigation link**: Add "Quiz" to the site nav so existing visitors can find it.

## What Gets Built

1. Quiz data model — questions, options, scoring weights, and 4-6 result personality profiles
2. Quiz UI components — intro, question stepper, progress bar, result display
3. Shareable card generator — canvas-based downloadable/shareable PNG
4. New `/quiz` route wired into App.tsx
5. Nav link added to SanctuaryNavigation

