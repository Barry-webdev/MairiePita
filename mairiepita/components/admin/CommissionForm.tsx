'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { commissionsService, Commission } from '@/lib/api/commissions.service';
import { Save, ArrowLeft } from 'lucide-react';

interface CommissionFormProps {
  commissionId?: string;
}

export default function CommissionForm({ commissionId }: CommissionFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (commissionId) {
      loadCommission();
    }
  }, [commissionId]);

  const loadCommission = async () => {
    try {
      console.log('🔍 Loading commission with ID:', commissionId);
      const data = await commissionsService.getById(commissionId!);
      console.log('✅ Commission data loaded:', data);
      setFormData({
        nom: data.nom,
        description: data.description || '',
      });
    } catch (error) {
      console.error('❌ Erreur lors du chargement:', error);
      setError('Erreur lors du chargement de la commission');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (commissionId) {
        await commissionsService.update(commissionId, formData);
      } else {
        await commissionsService.create(formData);
      }
      router.push('/admin/conseil-communal/commissions');
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
          {commissionId ? 'Modifier la Commission' : 'Nouvelle Commission'}
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de la Commission *
            </label>
            <input
              type="text"
              required
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Commission des Finances"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Description de la commission..."
            />
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
