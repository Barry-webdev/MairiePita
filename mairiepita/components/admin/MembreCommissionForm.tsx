'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { membresCommissionService, MembreCommission } from '@/lib/api/membresCommission.service';
import { Save, ArrowLeft } from 'lucide-react';

interface MembreCommissionFormProps {
  membreId?: string;
}

export default function MembreCommissionForm({ membreId }: MembreCommissionFormProps) {
  const router = useRouter();
  
  // Récupère le commissionId depuis l'URL
  const getCommissionIdFromUrl = () => {
    if (typeof window !== 'undefined') {
      const pathParts = window.location.pathname.split('/');
      const commissionsIndex = pathParts.findIndex(part => part === 'commissions');
      if (commissionsIndex !== -1 && pathParts[commissionsIndex + 1]) {
        return pathParts[commissionsIndex + 1];
      }
    }
    return '';
  };

  const [commissionId, setCommissionId] = useState('');
  const [formData, setFormData] = useState({
    commissionId: '',
    nom: '',
    prenom: '',
    fonction: '',
    photo: '',
    telephone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialise le commissionId au montage du composant
  useEffect(() => {
    const id = getCommissionIdFromUrl();
    setCommissionId(id);
    if (!membreId) {
      setFormData(prev => ({ ...prev, commissionId: id }));
    }
  }, [membreId]);

  useEffect(() => {
    if (membreId) {
      loadMembre();
    }
  }, [membreId]);

  const loadMembre = async () => {
    try {
      const data = await membresCommissionService.getById(membreId!);
      setFormData({
        commissionId: data.commissionId,
        nom: data.nom,
        prenom: data.prenom,
        fonction: data.fonction,
        photo: data.photo || '',
        telephone: data.telephone || '',
        email: data.email || '',
      });
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      setError('Erreur lors du chargement du membre');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log('📤 Données envoyées:', formData);

    try {
      if (membreId) {
        await membresCommissionService.update(membreId, formData);
      } else {
        await membresCommissionService.create(formData);
      }
      router.push(`/admin/conseil-communal/commissions/${commissionId}/membres`);
      router.refresh();
    } catch (error: any) {
      setError(error.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>
      </div>

      <div className="max-w-2xl bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">
          {membreId ? 'Modifier le Membre' : 'Nouveau Membre'}
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom *
              </label>
              <input
                type="text"
                required
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Nom"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                required
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Prénom"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fonction *
            </label>
            <select
              required
              value={formData.fonction}
              onChange={(e) => setFormData({ ...formData, fonction: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner une fonction</option>
              <option value="Président">Président</option>
              <option value="Vice-Président">Vice-Président</option>
              <option value="Secrétaire">Secrétaire</option>
              <option value="Membre">Membre</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Photo (Cloudinary)
            </label>
            <input
              type="url"
              value={formData.photo}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="620 00 00 00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="exemple@email.com"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
