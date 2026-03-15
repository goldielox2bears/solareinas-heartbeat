

## Plan: Persist Quiz Completions to Supabase

### What this solves
Right now there's no server-side record of quiz completions. This will store every completed quiz in a new `quiz_completions` table so you can see results in your Admin Panel — even for anonymous visitors.

### Database changes
Create a `quiz_completions` table:
- `id` (uuid, PK)
- `primary_result` (text) — e.g. "the-bee"
- `secondary_result` (text) — e.g. "the-llama"
- `is_blended` (boolean)
- `answers` (jsonb) — full answer map for analysis
- `created_at` (timestamptz)

RLS: public INSERT (anyone can submit), admin-only SELECT/UPDATE/DELETE.

### Code changes

1. **`src/lib/quizAnalytics.ts`** — Add a `saveQuizCompletion()` function that inserts into `quiz_completions` via the Supabase client.

2. **`src/pages/QuizPage.tsx`** — Call `saveQuizCompletion()` when the quiz completes (alongside the existing `trackQuizEvent`).

3. **`src/pages/AdminPanel.tsx`** — Add a "Quiz Completions" tab/section showing recent completions with result, timestamp, and blended status. This lets you see how many people took the quiz and what results they got.

### What you'll see in the Admin Panel
A table of quiz completions showing: date, primary result, secondary result, blended status — sortable by recency. No personal data collected (fully anonymous unless they also subscribe to the newsletter).

