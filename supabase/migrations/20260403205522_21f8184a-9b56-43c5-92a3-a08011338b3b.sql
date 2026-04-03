
-- 1. Tighten quiz_completions INSERT: add basic validation
DROP POLICY IF EXISTS "Anyone can submit quiz completion" ON public.quiz_completions;
CREATE POLICY "Anyone can submit quiz completion"
ON public.quiz_completions
FOR INSERT
TO public
WITH CHECK (
  primary_result IS NOT NULL AND
  length(primary_result) BETWEEN 1 AND 100 AND
  secondary_result IS NOT NULL AND
  length(secondary_result) BETWEEN 1 AND 100
);

-- 2. Remove overly permissive market_orders INSERT for anon/authenticated
-- Edge function uses service role key which bypasses RLS, so public INSERT is unnecessary
DROP POLICY IF EXISTS "Edge functions can insert market orders" ON public.market_orders;

-- 3. Add extra protection on profiles UPDATE WITH CHECK to be explicit
-- The existing WITH CHECK already prevents role escalation, but let's make the USING clause more restrictive too
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO public
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id AND
  (role IS NULL OR role = 'member'::text)
);
