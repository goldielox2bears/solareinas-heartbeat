-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can create sponsorships" ON sponsorships;

-- Create a more restrictive INSERT policy - require authentication
CREATE POLICY "Authenticated users can create sponsorships"
ON sponsorships
FOR INSERT
TO authenticated
WITH CHECK (
  -- Ensure the animal exists and is available for sponsorship
  EXISTS (
    SELECT 1 FROM animals 
    WHERE animals.id = animal_id 
    AND animals.available_for_sponsorship = true
  )
  -- If user_id is provided, it must match the authenticated user
  AND (user_id IS NULL OR user_id = auth.uid())
);

-- Create a validation function for sponsorship data
CREATE OR REPLACE FUNCTION validate_sponsorship()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Validate email format
  IF NEW.sponsor_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Validate sponsor name is not empty and reasonable length
  IF LENGTH(TRIM(NEW.sponsor_name)) < 2 OR LENGTH(NEW.sponsor_name) > 100 THEN
    RAISE EXCEPTION 'Sponsor name must be between 2 and 100 characters';
  END IF;
  
  -- Validate sponsorship_type
  IF NEW.sponsorship_type NOT IN ('monthly', 'annual', 'one-time') THEN
    RAISE EXCEPTION 'Invalid sponsorship type';
  END IF;
  
  -- Validate amount is positive
  IF NEW.amount_cents <= 0 THEN
    RAISE EXCEPTION 'Amount must be positive';
  END IF;
  
  -- Sanitize special_requests (limit length)
  IF NEW.special_requests IS NOT NULL AND LENGTH(NEW.special_requests) > 500 THEN
    NEW.special_requests := LEFT(NEW.special_requests, 500);
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for validation
DROP TRIGGER IF EXISTS validate_sponsorship_trigger ON sponsorships;
CREATE TRIGGER validate_sponsorship_trigger
BEFORE INSERT OR UPDATE ON sponsorships
FOR EACH ROW
EXECUTE FUNCTION validate_sponsorship();