export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      animals: {
        Row: {
          age: number | null
          annual_sponsorship_cents: number | null
          available_for_sponsorship: boolean | null
          created_at: string
          current_sponsors_count: number | null
          id: string
          max_sponsors: number | null
          monthly_sponsorship_cents: number | null
          name: string
          photo_url: string | null
          species: string
          sponsor_name: string | null
          sponsor_status: string
          story: string | null
          updated_at: string
        }
        Insert: {
          age?: number | null
          annual_sponsorship_cents?: number | null
          available_for_sponsorship?: boolean | null
          created_at?: string
          current_sponsors_count?: number | null
          id?: string
          max_sponsors?: number | null
          monthly_sponsorship_cents?: number | null
          name: string
          photo_url?: string | null
          species: string
          sponsor_name?: string | null
          sponsor_status?: string
          story?: string | null
          updated_at?: string
        }
        Update: {
          age?: number | null
          annual_sponsorship_cents?: number | null
          available_for_sponsorship?: boolean | null
          created_at?: string
          current_sponsors_count?: number | null
          id?: string
          max_sponsors?: number | null
          monthly_sponsorship_cents?: number | null
          name?: string
          photo_url?: string | null
          species?: string
          sponsor_name?: string | null
          sponsor_status?: string
          story?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      community_testimonials: {
        Row: {
          approval_status: string
          content: string
          created_at: string
          id: string
          photo_url: string | null
          rating: number
          updated_at: string
          user_id: string
        }
        Insert: {
          approval_status?: string
          content: string
          created_at?: string
          id?: string
          photo_url?: string | null
          rating: number
          updated_at?: string
          user_id: string
        }
        Update: {
          approval_status?: string
          content?: string
          created_at?: string
          id?: string
          photo_url?: string | null
          rating?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      gifts: {
        Row: {
          amount_cents: number
          animal_id: string | null
          created_at: string
          donor_email: string
          donor_name: string
          gift_target: string | null
          gift_type: string
          id: string
          message: string | null
          notified: boolean
          status: string
          updated_at: string
        }
        Insert: {
          amount_cents: number
          animal_id?: string | null
          created_at?: string
          donor_email: string
          donor_name: string
          gift_target?: string | null
          gift_type: string
          id?: string
          message?: string | null
          notified?: boolean
          status?: string
          updated_at?: string
        }
        Update: {
          amount_cents?: number
          animal_id?: string | null
          created_at?: string
          donor_email?: string
          donor_name?: string
          gift_target?: string | null
          gift_type?: string
          id?: string
          message?: string | null
          notified?: boolean
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gifts_animal_id_fkey"
            columns: ["animal_id"]
            isOneToOne: false
            referencedRelation: "animals"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          source: string | null
          subscribed_at: string
          unsubscribed_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          source?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          source?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          available: boolean
          created_at: string
          descriptor_line: string | null
          faq: Json | null
          hero: boolean
          hero_hook: string | null
          how_to_use: string[] | null
          id: string
          images: string[] | null
          ingredient_philosophy: string[] | null
          key_benefits: string[] | null
          name: string
          price_cents: number
          scent: string | null
          seo_description: string | null
          seo_title: string | null
          short_description: string | null
          size: string | null
          slug: string
          sort_order: number | null
          updated_at: string
          why_its_different: string[] | null
        }
        Insert: {
          available?: boolean
          created_at?: string
          descriptor_line?: string | null
          faq?: Json | null
          hero?: boolean
          hero_hook?: string | null
          how_to_use?: string[] | null
          id?: string
          images?: string[] | null
          ingredient_philosophy?: string[] | null
          key_benefits?: string[] | null
          name: string
          price_cents: number
          scent?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          size?: string | null
          slug: string
          sort_order?: number | null
          updated_at?: string
          why_its_different?: string[] | null
        }
        Update: {
          available?: boolean
          created_at?: string
          descriptor_line?: string | null
          faq?: Json | null
          hero?: boolean
          hero_hook?: string | null
          how_to_use?: string[] | null
          id?: string
          images?: string[] | null
          ingredient_philosophy?: string[] | null
          key_benefits?: string[] | null
          name?: string
          price_cents?: number
          scent?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          size?: string | null
          slug?: string
          sort_order?: number | null
          updated_at?: string
          why_its_different?: string[] | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          first_name: string | null
          id: string
          last_name: string | null
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quiz_completions: {
        Row: {
          answers: Json
          created_at: string
          id: string
          is_blended: boolean
          primary_result: string
          secondary_result: string
        }
        Insert: {
          answers?: Json
          created_at?: string
          id?: string
          is_blended?: boolean
          primary_result: string
          secondary_result: string
        }
        Update: {
          answers?: Json
          created_at?: string
          id?: string
          is_blended?: boolean
          primary_result?: string
          secondary_result?: string
        }
        Relationships: []
      }
      retreat_signups: {
        Row: {
          created_at: string
          email: string
          id: string
          interest_note: string | null
          name: string
          number_of_riders: number
          phone: string
          riders: Json
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          interest_note?: string | null
          name: string
          number_of_riders?: number
          phone: string
          riders?: Json
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          interest_note?: string | null
          name?: string
          number_of_riders?: number
          phone?: string
          riders?: Json
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      sponsorships: {
        Row: {
          admin_verified: boolean
          amount_cents: number
          animal_id: string
          created_at: string
          end_date: string | null
          founding_guardian: boolean
          id: string
          payment_method: string | null
          special_requests: string | null
          sponsor_email: string
          sponsor_name: string
          sponsorship_type: string
          start_date: string
          status: string
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          admin_verified?: boolean
          amount_cents: number
          animal_id: string
          created_at?: string
          end_date?: string | null
          founding_guardian?: boolean
          id?: string
          payment_method?: string | null
          special_requests?: string | null
          sponsor_email: string
          sponsor_name: string
          sponsorship_type: string
          start_date?: string
          status?: string
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          admin_verified?: boolean
          amount_cents?: number
          animal_id?: string
          created_at?: string
          end_date?: string | null
          founding_guardian?: boolean
          id?: string
          payment_method?: string | null
          special_requests?: string | null
          sponsor_email?: string
          sponsor_name?: string
          sponsorship_type?: string
          start_date?: string
          status?: string
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sponsorships_animal_id_fkey"
            columns: ["animal_id"]
            isOneToOne: false
            referencedRelation: "animals"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_applications: {
        Row: {
          application_type: string
          approval_status: string
          available_from: string
          available_to: string
          created_at: string
          date_joined: string
          full_name: string
          hours_per_week: number
          id: string
          updated_at: string
          user_id: string | null
          volunteer_interests: string[]
        }
        Insert: {
          application_type: string
          approval_status?: string
          available_from: string
          available_to: string
          created_at?: string
          date_joined?: string
          full_name: string
          hours_per_week: number
          id?: string
          updated_at?: string
          user_id?: string | null
          volunteer_interests?: string[]
        }
        Update: {
          application_type?: string
          approval_status?: string
          available_from?: string
          available_to?: string
          created_at?: string
          date_joined?: string
          full_name?: string
          hours_per_week?: number
          id?: string
          updated_at?: string
          user_id?: string | null
          volunteer_interests?: string[]
        }
        Relationships: []
      }
      volunteers: {
        Row: {
          avatar_emoji: string | null
          badges: string[]
          created_at: string
          hours: number
          id: string
          joined_date: string
          name: string
          quote: string | null
          role: string
          updated_at: string
        }
        Insert: {
          avatar_emoji?: string | null
          badges?: string[]
          created_at?: string
          hours?: number
          id?: string
          joined_date?: string
          name: string
          quote?: string | null
          role: string
          updated_at?: string
        }
        Update: {
          avatar_emoji?: string | null
          badges?: string[]
          created_at?: string
          hours?: number
          id?: string
          joined_date?: string
          name?: string
          quote?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: { user_id: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
