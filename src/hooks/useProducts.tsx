import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  slug: string;
  hero: boolean;
  descriptor_line: string | null;
  price_cents: number;
  size: string | null;
  images: string[];
  hero_hook: string | null;
  short_description: string | null;
  key_benefits: string[];
  how_to_use: string[];
  why_its_different: string[];
  ingredient_philosophy: string[];
  scent: string | null;
  faq: { question: string; answer: string }[];
  seo_title: string | null;
  seo_description: string | null;
  available: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("available", true)
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return data as Product[];
    },
  });
};

export const useHeroProduct = () => {
  return useQuery({
    queryKey: ["products", "hero"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("hero", true)
        .eq("available", true)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data as Product | null;
    },
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .eq("available", true)
        .single();

      if (error) throw error;
      return data as Product;
    },
    enabled: !!slug,
  });
};
