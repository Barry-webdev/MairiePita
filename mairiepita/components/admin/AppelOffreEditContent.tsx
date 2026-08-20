'use client';

import { useState, useEffect } from 'react';
import { appelsOffresService, type AppelOffre } from '@/lib/api/appelsOffres.service';
import AppelOffreForm from './AppelOffreForm';
import AdminHeader from './AdminHeader';

interface AppelOffreEditContentProps {
  appelOffreId: string;
}

export default function AppelOffreEditContent({ appelOffreId }: AppelOffreEditContentProps) {
  const [appelOffre, setAppelOffre] = useState<AppelOffre | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAppelOffre();
  }, [appelOffreId]);

  async function loadAppelOffre() {
    try {
      setLoading(true);
      const data = await appelsOffresService.getById(appelOffreId);
      setAppelOffre(data);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-500">Chargement de l'appel d'offres...</p>
        </div>
      </div>
    );
  }

  if (error || !appelOffre) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">❌ {error || 'Appel d\'offres introuvable'}</p>
        <a href="/admin/appels-offres" className="mt-2 text-sm text-red-700 underline hover:no-underline inline-block">
          Retour à la liste
        </a>
      </div>
    );
  }

  return (
    <>
      <AdminHeader
        title={`Modifier : ${appelOffre.title}`}
        subtitle="Modifiez les informations de cet appel d'offres"
      />
      <AppelOffreForm
        initialData={appelOffre}
        mode="edit"
        appelOffreId={appelOffreId}
      />
    </>
  );
}
