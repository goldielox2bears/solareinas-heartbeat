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
  // Added in product-first impact migration
  category: string | null;
  long_description: string | null;
  image_url: string | null;
  inventory_status: string;
  impact_summary: string | null;
  related_animal_id: string | null;
  related_farm_need_id: string | null;
}

export interface FarmNeed {
  id: string;
  need_title: string;
  need_type: string;
  description: string | null;
  estimated_cost: number | null;
  cost_currency: string;
  impact_unit: string | null;
  animal_related: boolean;
  land_related: boolean;
  urgency_level: string;
  image_url: string | null;
}

export interface ProductImpact {
  id: string;
  product_id: string;
  farm_need_id: string | null;
  impact_statement: string;
  impact_disclaimer: string;
  display_order: number;
  is_active: boolean;
  farm_need?: FarmNeed | null;
}

export interface RelatedAnimal {
  id: string;
  name: string;
  species: string;
  photo_url: string | null;
  story: string | null;
  impact_story: string | null;
  current_care_needs: string | null;
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
      return data as unknown as Product[];
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
      return data as unknown as Product | null;
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
      return data as unknown as Product;
    },
    enabled: !!slug,
  });
};

export const useProductImpact = (productId: string | undefined) => {
  return useQuery({
    queryKey: ["product_impact", productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_impact")
        .select("*, farm_need:farm_needs(*)")
        .eq("product_id", productId!)
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as unknown as ProductImpact[];
    },
    enabled: !!productId,
  });
};

export const useRelatedAnimal = (animalId: string | null | undefined) => {
  return useQuery({
    queryKey: ["animals", animalId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("animals")
        .select("id, name, species, photo_url, story, impact_story, current_care_needs")
        .eq("id", animalId!)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as RelatedAnimal | null;
    },
    enabled: !!animalId,
  });
};

export const useRelatedFarmNeed = (needId: string | null | undefined) => {
  return useQuery({
    queryKey: ["farm_needs", needId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("farm_needs")
        .select("*")
        .eq("id", needId!)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as FarmNeed | null;
    },
    enabled: !!needId,
  });
};
