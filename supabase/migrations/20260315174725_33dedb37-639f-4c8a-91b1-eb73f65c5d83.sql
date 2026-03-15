
CREATE TABLE public.quiz_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_result text NOT NULL,
  secondary_result text NOT NULL,
  is_blended boolean NOT NULL DEFAULT false,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit quiz completion"
  ON public.quiz_completions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only admins can view quiz completions"
  ON public.quiz_completions FOR SELECT
  TO authenticated
  USING (is_admin(auth.uid()));

CREATE POLICY "Only admins can delete quiz completions"
  ON public.quiz_completions FOR DELETE
  TO authenticated
  USING (is_admin(auth.uid()));
