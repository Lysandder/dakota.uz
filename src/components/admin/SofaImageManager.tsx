import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SofaFromDB } from '@/hooks/useSofas';
import { useAddSofaImage, useDeleteSofaImage } from '@/hooks/useAdminSofas';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface SofaImageManagerProps {
  sofa: SofaFromDB;
  onBack: () => void;
}

const SofaImageManager = ({ sofa, onBack }: SofaImageManagerProps) => {
  const addImage = useAddSofaImage();
  const deleteImage = useDeleteSofaImage();

  const [newImage, setNewImage] = useState({
    url: '',
    alt: '',
  });

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.url) return;

    const sortOrder = sofa.images ? sofa.images.length : 0;
    
    await addImage.mutateAsync({
      sofaId: sofa.id,
      image: {
        url: newImage.url,
        alt: newImage.alt || sofa.name_ru,
        sort_order: sortOrder,
      },
    });

    setNewImage({ url: '', alt: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>
        <h2 className="font-serif text-2xl text-foreground">
          Изображения: {sofa.name_ru}
        </h2>
      </div>

      {/* Add new image form */}
      <form onSubmit={handleAddImage} className="p-4 border border-border rounded-sm space-y-4">
        <h3 className="font-medium text-foreground">Добавить изображение</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="url">URL изображения</Label>
            <Input
              id="url"
              value={newImage.url}
              onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="alt">Alt текст (опционально)</Label>
            <Input
              id="alt"
              value={newImage.alt}
              onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
              placeholder="Описание изображения"
            />
          </div>
        </div>
        <Button type="submit" disabled={addImage.isPending} className="gap-2">
          <Plus className="w-4 h-4" />
          {addImage.isPending ? 'Добавление...' : 'Добавить'}
        </Button>
      </form>

      {/* Current images */}
      <div className="space-y-4">
        <h3 className="font-medium text-foreground">Текущие изображения</h3>
        
        {!sofa.images || sofa.images.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground border border-dashed border-border rounded-sm">
            Нет изображений. Добавьте первое изображение выше.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sofa.images.map((image, index) => (
              <div
                key={image.id}
                className="relative group border border-border rounded-sm overflow-hidden"
              >
                <img
                  src={image.url}
                  alt={image.alt || sofa.name_ru}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <GripVertical className="w-4 h-4" />
                    <span className="text-sm">#{index + 1}</span>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Удалить изображение?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Это действие нельзя отменить.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteImage.mutate(image.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Удалить
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <div className="p-2 bg-card">
                  <p className="text-xs text-muted-foreground truncate">{image.alt || 'Без описания'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SofaImageManager;
