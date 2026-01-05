import { useState } from 'react';
import { SofaFromDB } from '@/hooks/useSofas';
import SofaList from './SofaList';
import SofaForm from './SofaForm';
import SofaImageManager from './SofaImageManager';

type View = 'list' | 'form' | 'images';

const AdminSofasSection = () => {
  const [view, setView] = useState<View>('list');
  const [selectedSofa, setSelectedSofa] = useState<SofaFromDB | null>(null);

  const handleAdd = () => {
    setSelectedSofa(null);
    setView('form');
  };

  const handleEdit = (sofa: SofaFromDB) => {
    setSelectedSofa(sofa);
    setView('form');
  };

  const handleManageImages = (sofa: SofaFromDB) => {
    setSelectedSofa(sofa);
    setView('images');
  };

  const handleBack = () => {
    setSelectedSofa(null);
    setView('list');
  };

  if (view === 'form') {
    return <SofaForm sofa={selectedSofa} onBack={handleBack} />;
  }

  if (view === 'images' && selectedSofa) {
    return <SofaImageManager sofa={selectedSofa} onBack={handleBack} />;
  }

  return (
    <SofaList
      onAdd={handleAdd}
      onEdit={handleEdit}
      onManageImages={handleManageImages}
    />
  );
};

export default AdminSofasSection;
