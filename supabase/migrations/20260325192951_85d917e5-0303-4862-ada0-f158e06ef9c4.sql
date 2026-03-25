
CREATE TABLE public.market_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  notes text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_eur text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.market_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view market orders"
  ON public.market_orders FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can update market orders"
  ON public.market_orders FOR UPDATE
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete market orders"
  ON public.market_orders FOR DELETE
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Edge functions can insert market orders"
  ON public.market_orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE TRIGGER update_market_orders_updated_at
  BEFORE UPDATE ON public.market_orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
