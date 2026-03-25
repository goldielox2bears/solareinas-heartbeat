UPDATE public.market_orders 
SET items = '[{"name": "Hand Balm Gift Pack", "qty": 1, "price": 30}, {"name": "Olive Oil — Case of Six", "qty": 1, "price": 135}]'::jsonb
WHERE id = 'ced2733d-3e57-458a-992c-032b8f3739e8';