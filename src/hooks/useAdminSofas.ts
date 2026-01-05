import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SofaFormData {
  name_ru: string;
  name_uz: string;
  price: number;
  on_sale: boolean;
  sale_price: number | null;
}

export interface SofaImageFormData {
  url: string;
  alt: string;
  sort_order: number;
}

export const useCreateSofa = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: SofaFormData) => {
      const { data: sofa, error } = await supabase
        .from('sofas')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return sofa;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sofas'] });
      toast({ title: 'Диван добавлен', description: 'Новый диван успешно создан' });
    },
    onError: (error) => {
      toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    },
  });
};

export const useUpdateSofa = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<SofaFormData> }) => {
      const { data: sofa, error } = await supabase
        .from('sofas')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return sofa;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sofas'] });
      queryClient.invalidateQueries({ queryKey: ['sofa'] });
      toast({ title: 'Диван обновлён', description: 'Изменения сохранены' });
    },
    onError: (error) => {
      toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    },
  });
};

export const useDeleteSofa = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('sofas')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sofas'] });
      toast({ title: 'Диван удалён', description: 'Диван успешно удалён' });
    },
    onError: (error) => {
      toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    },
  });
};

// Image management
export const useAddSofaImage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ sofaId, image }: { sofaId: string; image: SofaImageFormData }) => {
      const { data, error } = await supabase
        .from('sofa_images')
        .insert({ sofa_id: sofaId, ...image })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sofas'] });
      queryClient.invalidateQueries({ queryKey: ['sofa'] });
      toast({ title: 'Изображение добавлено' });
    },
    onError: (error) => {
      toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    },
  });
};

export const useDeleteSofaImage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (imageId: string) => {
      const { error } = await supabase
        .from('sofa_images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sofas'] });
      queryClient.invalidateQueries({ queryKey: ['sofa'] });
      toast({ title: 'Изображение удалено' });
    },
    onError: (error) => {
      toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    },
  });
};
