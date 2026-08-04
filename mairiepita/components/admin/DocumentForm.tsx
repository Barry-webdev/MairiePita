'use client';

import { useState } from 'react';
import { DOCUMENT_CATEGORIES, type Document } from '@/lib/mockDocuments';

type FormData = {
  title: string;
  category: string;
  description: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX' | 'ZIP';
  auteur: string;
  date: string;
  published: boolean;
};

interface DocumentFormProps {
  initialData?: Partial<Document>;
  mode: 'create' | 'edit';
}

export default function DocumentForm({ initialData, mode }: DocumentFormProps) {
  const [form, setForm] = useState<FormData>({
    title: initialData?.title || '',
    category: initialData?.category || '',
    description: initialData?.description || '',
    fileType: initialData?.fileType || 'PDF',
    auteur: '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
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
      window.location.href = '/admin/documents';
    }, 1000);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
      {/* Main content */}
      <div className="flex-1 flex flex-col gap-6">

        {/* Titre */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Titre du document <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Saisissez le titre du document..."
            required
            className="w-full px-4 py-3 text-base font-semibold text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
          />
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Décrivez brièvement le contenu de ce document..."
            rows={3}
            className="w-full px-4 py-3 text-sm text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors resize-none"
          />
        </div>

        {/* Type de fichier + Upload */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Type de fichier
            </label>
            <select
              value={form.fileType}
              onChange={(e) => handleChange('fileType', e.target.value as FormData['fileType'])}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
            >
              <option value="PDF">PDF</option>
              <option value="DOCX">DOCX</option>
              <option value="XLSX">XLSX</option>
              <option value="ZIP">ZIP</option>
            </select>
          </div>

          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
            Fichier à téléverser
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center gap-3 hover:border-green-500 transition-colors cursor-pointer bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Glissez votre fichier ici</p>
              <p className="text-xs text-gray-400 mt-1">ou <span className="text-green-600 font-semibold">parcourir les fichiers</span></p>
            </div>
            <p className="text-xs text-gray-400">PDF, DOCX, XLSX, ZIP — max 20 MB</p>
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
                mode === 'create' ? 'Publier le document' : 'Mettre à jour'
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
            {DOCUMENT_CATEGORIES.filter((c) => c.value).map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Métadonnées */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Métadonnées</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Auteur / Service</label>
              <input
                type="text"
                value={form.auteur}
                onChange={(e) => handleChange('auteur', e.target.value)}
                placeholder="ex: Service des Finances"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Publié</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => handleChange('published', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-600 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                <span className="ml-2 text-xs text-gray-600">{form.published ? 'Oui' : 'Non'}</span>
              </label>
            </div>
          </div>
        </div>

        {/* Back link */}
        <a
          href="/admin/documents"
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
