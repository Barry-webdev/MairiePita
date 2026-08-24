'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { commissionsService, Commission } from '@/lib/api/commissions.service';
import { FileText, Plus, Edit, Trash2, Archive, RotateCcw, Users } from 'lucide-react';

export default function AdminCommissionsDashboard() {
  const router = useRouter();
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [archived, setArchived] = useState<Commission[]>([]);
  const [showArchived, setShowArchived] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCommissions();
  }, []);

  const loadCommissions = async () => {
    try {
      const [activeData, archivedData] = await Promise.all([
        commissionsService.getAll(),
        commissionsService.getArchived(),
      ]);
      setCommissions(activeData);
      setArchived(archivedData);
    } catch (error) {
      console.error('Erreur lors du chargement des commissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir archiver cette commission ?')) {
      try {
        await commissionsService.delete(id);
        loadCommissions();
      } catch (error) {
        console.error('Erreur lors de l\'archivage:', error);
      }
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await commissionsService.restore(id);
      loadCommissions();
    } catch (error) {
      console.error('Erreur lors de la restauration:', error);
    }
  };

  const displayedCommissions = showArchived ? archived : commissions;

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="w-6 h-6" />
          Gestion des Commissions
        </h1>
        <button
          onClick={() => router.push('/admin/conseil-communal/commissions/new')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <Plus className="w-5 h-5" />
          Nouvelle Commission
        </button>
      </div>

      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setShowArchived(false)}
          className={`px-4 py-2 rounded ${!showArchived ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Actives ({commissions.length})
        </button>
        <button
          onClick={() => setShowArchived(true)}
          className={`px-4 py-2 rounded flex items-center gap-2 ${showArchived ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          <Archive className="w-4 h-4" />
          Archives ({archived.length})
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date création</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayedCommissions.map((commission) => (
              <tr key={commission._id || commission.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{commission.nom}</td>
                <td className="px-6 py-4">{commission.description || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {commission.createdAt ? new Date(commission.createdAt).toLocaleDateString('fr-FR') : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    {!showArchived && (
                      <>
                        <button
                          onClick={() => router.push(`/admin/conseil-communal/commissions/${commission._id || commission.id}/membres`)}
                          className="text-purple-600 hover:text-purple-900"
                          title="Gérer les membres"
                        >
                          <Users className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => router.push(`/admin/conseil-communal/commissions/${commission._id || commission.id}/edit`)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleArchive(commission._id || commission.id!)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    {showArchived && (
                      <button
                        onClick={() => handleRestore(commission._id || commission.id!)}
                        className="text-green-600 hover:text-green-900"
                        title="Restaurer"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {displayedCommissions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {showArchived ? 'Aucune commission archivée' : 'Aucune commission'}
          </div>
        )}
      </div>
    </div>
  );
}
