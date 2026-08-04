'use client';

import { useState } from 'react';
import { APPEL_CATEGORIES, type AppelOffre } from '@/lib/mockAppelsOffres';

type FormData = {
  reference: string;
  title: string;
  category: string;
  status: 'Ouvert' | 'Clôturé' | 'Attribué' | 'Annulé';
  budget: string;
  datePublication: string;
  dateLimite: string;
  description: string;
  published: boolean;
};

interface AppelOffreFormProps {
  initialData?: Partial<AppelOffre>;
  mode: 'create' | 'edit';
}

export default function AppelOffreForm({ initialData, mode }: AppelOffreFormProps) {
  const [form, setForm] = useState<FormData>({
    reference: initialData?.reference || '',
    title: initialData?.title || '',
    category: initialData?.category || '',
    status: initialData?.status || 'Ouvert',
    budget: initialData?.budget || '',
    datePublication: initialData?.datePublication || new Date().toISOString().split('T')[0],
    dateLimite: initialData?.dateLimite || '',
    description: initialData?.description || '',
    published: initialData?.published ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleChange(field: keyof FormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent, publish?: boolean) {
    e.preventDefault();
    setSaving(true);
    if (publish !== undefined) {
      setForm((prev) => ({ ...prev, published: publish }));
    }
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => {
      window.location.href = '/admin/appels-offres';
    }, 1000);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
      {/* Main content */}
      <div className="flex-1 flex flex-col gap-6">

        {/* Référence + Titre */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Référence
            </label>
            <input
              type="text"
              value={form.reference}
              onChange={(e) => handleChange('reference', e.target.value)}
              placeholder="AO-2024-XXX"
              className="w-full px-4 py-2.5 text-sm font-mono border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Titre de l&apos;appel d&apos;offres <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Saisissez le titre de l'appel d'offres..."
              required
              className="w-full px-4 py-3 text-base font-semibold text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
            />
          </div>
        </div>

        {/* Budget + Dates */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Informations financières et délais</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Budget estimé</label>
              <input
                type="text"
                value={form.budget}
                onChange={(e) => handleChange('budget', e.target.value)}
                placeholder="ex: 500 000 000 GNF"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Date de publication</label>
                <input
                  type="date"
                  value={form.datePublication}
                  onChange={(e) => handleChange('datePublication', e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Date limite de dépôt <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={form.dateLimite}
                  onChange={(e) => handleChange('dateLimite', e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Décrivez l'objet et les conditions de l'appel d'offres..."
            rows={5}
            className="w-full px-4 py-3 text-sm text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors resize-none"
          />
        </div>

        {/* Documents joints */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
            Documents de l&apos;appel d&apos;offres
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center gap-3 hover:border-green-500 transition-colors cursor-pointer bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Glissez les fichiers PDF ici</p>
              <p className="text-xs text-gray-400 mt-1">ou <span className="text-green-600 font-semibold">parcourir les fichiers</span></p>
            </div>
            <p className="text-xs text-gray-400">Dossier d&apos;appel d&apos;offres, cahier des charges — PDF uniquement</p>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            💡 Fonctionnalité disponible après connexion à la base de données.
          </p>
        </div>

      </div>

      {/* Sidebar panel */}
      <div className="w-full lg:w-80 flex flex-col gap-6 flex-shrink-0">

        {/* Publication */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Publication</h3>

          <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-gray-50">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${form.published ? 'bg-green-500' : 'bg-orange-400'}`} />
            <span className="text-sm font-medium text-gray-700">
              {form.published ? 'Publié' : 'Brouillon'}
            </span>
          </div>

          {saved && (
            <div className="mb-4 px-3 py-2 rounded-lg bg-green-50 border border-green-100 text-sm text-green-700 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Enregistré avec succès
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, false)}
              disabled={saving}
              className="w-full py-2.5 text-sm font-semibold rounded-lg border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Enregistrement...' : 'Enregistrer en brouillon'}
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={saving}
              className="w-full py-2.5 text-sm font-bold rounded-lg transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#1a5c2a', color: '#fff' }}
            >
              {saving ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Publication...
                </span>
              ) : (
                mode === 'create' ? "Publier l'appel d'offres" : 'Mettre à jour'
              )}
            </button>
          </div>
        </div>

        {/* Catégorie + Statut */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Catégorie <span className="text-red-500">*</span>
            </label>
            <select
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              required
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
            >
              <option value="">Sélectionner une catégorie</option>
              {APPEL_CATEGORIES.filter((c) => c.value).map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Statut
            </label>
            <select
              value={form.status}
              onChange={(e) => handleChange('status', e.target.value as FormData['status'])}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
            >
              <option value="Ouvert">Ouvert</option>
              <option value="Clôturé">Clôturé</option>
              <option value="Attribué">Attribué</option>
              <option value="Annulé">Annulé</option>
            </select>
          </div>
        </div>

        {/* Visibilité */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Visibilité</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => handleChange('published', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-600 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
            <span className="ml-2 text-sm text-gray-600">{form.published ? 'Visible sur le site' : 'Non visible (brouillon)'}</span>
          </label>
        </div>

        {/* Back link */}
        <a
          href="/admin/appels-offres"
          className="flex items-center justify-center gap-2 py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour à la liste
        </a>

      </div>
    </form>
  );
}
