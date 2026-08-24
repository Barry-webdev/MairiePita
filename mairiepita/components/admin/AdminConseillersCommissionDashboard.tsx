'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { conseillersService, Conseiller } from '@/lib/api/conseillers.service';
import { Users, Plus, Edit, Trash2, Archive, RotateCcw } from 'lucide-react';

export default function AdminConseillersCommissionDashboard() {
  const router = useRouter();
  const [conseillers, setConseillers] = useState<Conseiller[]>([]);
  const [archived, setArchived] = useState<Conseiller[]>([]);
  const [showArchived, setShowArchived] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConseillers();
  }, []);

  const loadConseillers = async () => {
    try {
      const [activeData, archivedData] = await Promise.all([
        conseillersService.getAll(),
        conseillersService.getArchived(),
      ]);
      setConseillers(activeData);
      setArchived(archivedData);
    } catch (error) {
      console.error('Erreur lors du chargement des conseillers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir archiver ce conseiller ?')) {
      try {
        await conseillersService.delete(id);
        loadConseillers();
      } catch (error) {
        console.error('Erreur lors de l\'archivage:', error);
      }
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await conseillersService.restore(id);
      loadConseillers();
    } catch (error) {
      console.error('Erreur lors de la restauration:', error);
    }
  };

  const displayedConseillers = showArchived ? archived : conseillers;

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6" />
          Conseillers Communaux
        </h1>
        <button
          onClick={() => router.push('/admin/conseil-communal/conseillers/new')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <Plus className="w-5 h-5" />
          Nouveau Conseiller
        </button>
      </div>

      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setShowArchived(false)}
          className={`px-4 py-2 rounded ${!showArchived ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Actifs ({conseillers.length})
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom & Prénom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fonction</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quartier</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayedConseillers.map((conseiller) => (
              <tr key={conseiller._id || conseiller.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {conseiller.prenom} {conseiller.nom}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                    {conseiller.fonction}
                  </span>
                </td>
                <td className="px-6 py-4">{conseiller.quartier || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div>{conseiller.telephone || '-'}</div>
                  <div className="text-xs">{conseiller.email || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    {!showArchived && (
                      <>
                        <button
                          onClick={() => router.push(`/admin/conseil-communal/conseillers/${conseiller._id || conseiller.id}/edit`)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleArchive(conseiller._id || conseiller.id!)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    {showArchived && (
                      <button
                        onClick={() => handleRestore(conseiller._id || conseiller.id!)}
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
        {displayedConseillers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {showArchived ? 'Aucun conseiller archivé' : 'Aucun conseiller'}
          </div>
        )}
      </div>
    </div>
  );
}
