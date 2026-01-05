import { useState } from 'react';
import { Pencil, Trash2, Plus, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useSofas, SofaFromDB } from '@/hooks/useSofas';
import { useDeleteSofa } from '@/hooks/useAdminSofas';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface SofaListProps {
  onEdit: (sofa: SofaFromDB) => void;
  onAdd: () => void;
  onManageImages: (sofa: SofaFromDB) => void;
}

const SofaList = ({ onEdit, onAdd, onManageImages }: SofaListProps) => {
  const { data: sofas, isLoading } = useSofas();
  const deleteSofa = useDeleteSofa();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  if (isLoading) {
    return <div className="text-muted-foreground text-center py-8">Загрузка...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-serif text-2xl text-foreground">Диваны</h2>
        <Button onClick={onAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          Добавить диван
        </Button>
      </div>

      {!sofas || sofas.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Нет диванов. Добавьте первый диван.
        </div>
      ) : (
        <div className="border border-border rounded-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-foreground">Изображение</TableHead>
                <TableHead className="text-foreground">Название (RU)</TableHead>
                <TableHead className="text-foreground">Название (UZ)</TableHead>
                <TableHead className="text-foreground">Цена</TableHead>
                <TableHead className="text-foreground">Акция</TableHead>
                <TableHead className="text-foreground text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sofas.map((sofa) => (
                <TableRow key={sofa.id} className="hover:bg-muted/30">
                  <TableCell>
                    {sofa.images && sofa.images[0] ? (
                      <img
                        src={sofa.images[0].url}
                        alt={sofa.name_ru}
                        className="w-16 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                        <Image className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{sofa.name_ru}</TableCell>
                  <TableCell className="text-foreground">{sofa.name_uz}</TableCell>
                  <TableCell className="text-foreground">
                    {sofa.on_sale && sofa.sale_price ? (
                      <div>
                        <span className="line-through text-muted-foreground text-sm">{formatPrice(sofa.price)}</span>
                        <span className="ml-2 text-destructive">{formatPrice(sofa.sale_price)}</span>
                      </div>
                    ) : (
                      formatPrice(sofa.price)
                    )}
                  </TableCell>
                  <TableCell>
                    {sofa.on_sale ? (
                      <span className="px-2 py-1 bg-destructive/20 text-destructive rounded text-xs">Акция</span>
                    ) : (
                      <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">Нет</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onManageImages(sofa)}
                        title="Изображения"
                      >
                        <Image className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(sofa)}
                        title="Редактировать"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" title="Удалить">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Удалить диван?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Вы уверены, что хотите удалить "{sofa.name_ru}"? Это действие нельзя отменить.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteSofa.mutate(sofa.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Удалить
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default SofaList;
