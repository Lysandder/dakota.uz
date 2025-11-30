import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SofaImage {
  id: string;
  url: string;
  alt: string | null;
  sort_order: number;
}

export interface SofaFromDB {
  id: string;
  name_ru: string;
  name_uz: string;
  price: number;
  on_sale: boolean;
  sale_price: number | null;
  created_at: string;
  updated_at: string;
  images?: SofaImage[];
}

export const useSofas = (options?: { excludeSale?: boolean; onlyOnSale?: boolean }) => {
  return useQuery({
    queryKey: ['sofas', options],
    queryFn: async () => {
      let query = supabase
        .from('sofas')
        .select(`
          *,
          images:sofa_images(id, url, alt, sort_order)
        `)
        .order('created_at', { ascending: false });

      if (options?.excludeSale) {
        query = query.eq('on_sale', false);
      }

      if (options?.onlyOnSale) {
        query = query.eq('on_sale', true);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Sort images by sort_order
      return (data as SofaFromDB[])?.map(sofa => ({
        ...sofa,
        images: sofa.images?.sort((a, b) => a.sort_order - b.sort_order) || []
      })) || [];
    }
  });
};

export const useSofa = (id: string) => {
  return useQuery({
    queryKey: ['sofa', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sofas')
        .select(`
          *,
          images:sofa_images(id, url, alt, sort_order),
          sections:sofa_sections(
            id, heading_ru, heading_uz, sort_order,
            items:sofa_section_items(id, key_ru, key_uz, value_ru, value_uz, sort_order)
          ),
          comments:sofa_comments(id, text_ru, text_uz)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      // Sort images and sections
      return {
        ...data,
        images: data.images?.sort((a: SofaImage, b: SofaImage) => a.sort_order - b.sort_order) || [],
        sections: data.sections?.sort((a: any, b: any) => a.sort_order - b.sort_order).map((section: any) => ({
          ...section,
          items: section.items?.sort((a: any, b: any) => a.sort_order - b.sort_order) || []
        })) || []
      };
    },
    enabled: !!id
  });
};
