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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      sofa_comments: {
        Row: {
          created_at: string
          id: string
          sofa_id: string
          text_ru: string | null
          text_uz: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          sofa_id: string
          text_ru?: string | null
          text_uz?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          sofa_id?: string
          text_ru?: string | null
          text_uz?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sofa_comments_sofa_id_fkey"
            columns: ["sofa_id"]
            isOneToOne: false
            referencedRelation: "sofas"
            referencedColumns: ["id"]
          },
        ]
      }
      sofa_images: {
        Row: {
          alt: string | null
          created_at: string
          id: string
          sofa_id: string
          sort_order: number
          url: string
        }
        Insert: {
          alt?: string | null
          created_at?: string
          id?: string
          sofa_id: string
          sort_order?: number
          url: string
        }
        Update: {
          alt?: string | null
          created_at?: string
          id?: string
          sofa_id?: string
          sort_order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "sofa_images_sofa_id_fkey"
            columns: ["sofa_id"]
            isOneToOne: false
            referencedRelation: "sofas"
            referencedColumns: ["id"]
          },
        ]
      }
      sofa_section_items: {
        Row: {
          created_at: string
          id: string
          key_ru: string
          key_uz: string
          section_id: string
          sort_order: number
          value_ru: string
          value_uz: string
        }
        Insert: {
          created_at?: string
          id?: string
          key_ru: string
          key_uz: string
          section_id: string
          sort_order?: number
          value_ru: string
          value_uz: string
        }
        Update: {
          created_at?: string
          id?: string
          key_ru?: string
          key_uz?: string
          section_id?: string
          sort_order?: number
          value_ru?: string
          value_uz?: string
        }
        Relationships: [
          {
            foreignKeyName: "sofa_section_items_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sofa_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      sofa_sections: {
        Row: {
          created_at: string
          heading_ru: string
          heading_uz: string
          id: string
          sofa_id: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          heading_ru: string
          heading_uz: string
          id?: string
          sofa_id: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          heading_ru?: string
          heading_uz?: string
          id?: string
          sofa_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "sofa_sections_sofa_id_fkey"
            columns: ["sofa_id"]
            isOneToOne: false
            referencedRelation: "sofas"
            referencedColumns: ["id"]
          },
        ]
      }
      sofas: {
        Row: {
          created_at: string
          id: string
          name_ru: string
          name_uz: string
          on_sale: boolean
          price: number
          sale_price: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name_ru: string
          name_uz: string
          on_sale?: boolean
          price: number
          sale_price?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name_ru?: string
          name_uz?: string
          on_sale?: boolean
          price?: number
          sale_price?: number | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
