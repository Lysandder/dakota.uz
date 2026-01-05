import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { SofaFromDB } from '@/hooks/useSofas';
import { useCreateSofa, useUpdateSofa, SofaFormData } from '@/hooks/useAdminSofas';

interface SofaFormProps {
  sofa?: SofaFromDB | null;
  onBack: () => void;
}

const SofaForm = ({ sofa, onBack }: SofaFormProps) => {
  const createSofa = useCreateSofa();
  const updateSofa = useUpdateSofa();
  
  const [formData, setFormData] = useState<SofaFormData>({
    name_ru: '',
    name_uz: '',
    price: 0,
    on_sale: false,
    sale_price: null,
  });

  useEffect(() => {
    if (sofa) {
      setFormData({
        name_ru: sofa.name_ru,
        name_uz: sofa.name_uz,
        price: sofa.price,
        on_sale: sofa.on_sale,
        sale_price: sofa.sale_price,
      });
    }
  }, [sofa]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      ...formData,
      sale_price: formData.on_sale ? formData.sale_price : null,
    };

    if (sofa) {
      await updateSofa.mutateAsync({ id: sofa.id, data });
    } else {
      await createSofa.mutateAsync(data);
    }
    
    onBack();
  };

  const isLoading = createSofa.isPending || updateSofa.isPending;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>
        <h2 className="font-serif text-2xl text-foreground">
          {sofa ? 'Редактировать диван' : 'Новый диван'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name_ru">Название (RU)</Label>
            <Input
              id="name_ru"
              value={formData.name_ru}
              onChange={(e) => setFormData({ ...formData, name_ru: e.target.value })}
              placeholder="Название на русском"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name_uz">Название (UZ)</Label>
            <Input
              id="name_uz"
              value={formData.name_uz}
              onChange={(e) => setFormData({ ...formData, name_uz: e.target.value })}
              placeholder="Название на узбекском"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Цена (сум)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price || ''}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            placeholder="Введите цену"
            required
            min={0}
          />
        </div>

        <div className="flex items-center space-x-3">
          <Switch
            id="on_sale"
            checked={formData.on_sale}
            onCheckedChange={(checked) => setFormData({ ...formData, on_sale: checked })}
          />
          <Label htmlFor="on_sale">Акция</Label>
        </div>

        {formData.on_sale && (
          <div className="space-y-2">
            <Label htmlFor="sale_price">Цена по акции (сум)</Label>
            <Input
              id="sale_price"
              type="number"
              value={formData.sale_price || ''}
              onChange={(e) => setFormData({ ...formData, sale_price: Number(e.target.value) || null })}
              placeholder="Введите цену по акции"
              min={0}
            />
          </div>
        )}

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Сохранение...' : sofa ? 'Сохранить' : 'Создать'}
          </Button>
          <Button type="button" variant="outline" onClick={onBack}>
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SofaForm;
