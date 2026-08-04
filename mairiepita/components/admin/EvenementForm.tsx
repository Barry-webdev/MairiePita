'use client';

import { useState } from 'react';
import { EVENEMENT_CATEGORIES, type Evenement } from '@/lib/mockEvenements';

type FormData = {
  title: string;
  category: string;
  lieu: string;
  dateDebut: string;
  dateFin: string;
  heureDebut: string;
  heureFin: string;
  description: string;
  published: boolean;
};

interface EvenementFormProps {
  initialData?: Partial<Evenement>;
  mode: 'create' | 'edit';
}

export default function EvenementForm({ initialData, mode }: EvenementFormProps) {
  const [form, setForm] = useState<FormData>({
    title: initialData?.title || '',
    category: initialData?.category || '',
    lieu: initialData?.lieu || '',
    dateDebut: initialData?.dateDebut || '',
    dateFin: initialData?.dateFin || '',
    heureDebut: initialData?.heureDebut || '',
    heureFin: initialData?.heureFin || '',
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
      window.location.href = '/admin/evenements';
    }, 1000);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
      {/* Main content */}
      <div className="flex-1 flex flex-col gap-6">

        {/* Titre */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Titre de l&apos;événement <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Saisissez le titre de l'événement..."
            required
            className="w-full px-4 py-3 text-base font-semibold text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
          />
        </div>

        {/* Lieu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Lieu / Localisation
          </label>
          <input
            type="text"
            value={form.lieu}
            onChange={(e) => handleChange('lieu', e.target.value)}
            placeholder="ex: Salle du Conseil — Mairie de Pita"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
          />
        </div>

        {/* Dates & Heures */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Date et horaires</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Date de début <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.dateDebut}
                onChange={(e) => handleChange('dateDebut', e.target.value)}
                required
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Date de fin</label>
              <input
                type="date"
                value={form.dateFin}
                onChange={(e) => handleChange('dateFin', e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Heure de début</label>
              <input
                type="time"
                value={form.heureDebut}
                onChange={(e) => handleChange('heureDebut', e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Heure de fin</label>
              <input
                type="time"
                value={form.heureFin}
                onChange={(e) => handleChange('heureFin', e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
              />
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
            placeholder="Décrivez le programme et les informations importantes de cet événement..."
            rows={4}
            className="w-full px-4 py-3 text-sm text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors resize-none"
          />
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
                mode === 'create' ? "Publier l'événement" : 'Mettre à jour'
              )}
            </button>
          </div>
        </div>

        {/* Catégorie */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
            {EVENEMENT_CATEGORIES.filter((c) => c.value).map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
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
          href="/admin/evenements"
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
