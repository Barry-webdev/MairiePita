'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { membresCommissionService, MembreCommission } from '@/lib/api/membresCommission.service';
import { commissionsService, Commission } from '@/lib/api/commissions.service';
import { Users, Plus, Edit, Trash2, Archive, RotateCcw, ArrowLeft } from 'lucide-react';

export default function MembresCommissionsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const commissionId = resolvedParams.id;
  
  const [commission, setCommission] = useState<Commission | null>(null);
  const [membres, setMembres] = useState<MembreCommission[]>([]);
  const [archived, setArchived] = useState<MembreCommission[]>([]);
  const [showArchived, setShowArchived] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [commissionId]);

  const loadData = async () => {
    try {
      const [commissionData, membresData, archivedData] = await Promise.all([
        commissionsService.getById(commissionId),
        membresCommissionService.getByCommission(commissionId),
        membresCommissionService.getArchivedByCommission(commissionId),
      ]);
      setCommission(commissionData);
      setMembres(membresData);
      setArchived(archivedData);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir archiver ce membre ?')) {
      try {
        await membresCommissionService.delete(id);
        loadData();
      } catch (error) {
        console.error('Erreur lors de l\'archivage:', error);
      }
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await membresCommissionService.restore(id);
      loadData();
    } catch (error) {
      console.error('Erreur lors de la restauration:', error);
    }
  };

  const displayedMembres = showArchived ? archived : membres;

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={() => router.push('/admin/conseil-communal/commissions')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour aux commissions
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6" />
            Membres : {commission?.nom}
          </h1>
          <p className="text-gray-600 mt-1">{commission?.description}</p>
        </div>
        <button
          onClick={() => router.push(`/admin/conseil-communal/commissions/${commissionId}/membres/new`)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <Plus className="w-5 h-5" />
          Ajouter un membre
        </button>
      </div>

      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setShowArchived(false)}
          className={`px-4 py-2 rounded ${!showArchived ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Actifs ({membres.length})
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayedMembres.map((membre) => (
              <tr key={membre._id || membre.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {membre.prenom} {membre.nom}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                    {membre.fonction}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div>{membre.telephone || '-'}</div>
                  <div className="text-xs">{membre.email || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    {!showArchived && (
                      <>
                        <button
                          onClick={() => router.push(`/admin/conseil-communal/commissions/${commissionId}/membres/${membre._id || membre.id}/edit`)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleArchive(membre._id || membre.id!)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    {showArchived && (
                      <button
                        onClick={() => handleRestore(membre._id || membre.id!)}
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
        {displayedMembres.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {showArchived ? 'Aucun membre archivé' : 'Aucun membre dans cette commission'}
          </div>
        )}
      </div>
    </div>
  );
}
