'use client';

import { useState } from 'react';
import { CATEGORIES, CATEGORY_COLORS, type Article } from '@/lib/mockData';

type FormData = {
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  published: boolean;
};

interface ArticleFormProps {
  initialData?: Partial<Article>;
  mode: 'create' | 'edit';
}

export default function ArticleForm({ initialData, mode }: ArticleFormProps) {
  const [form, setForm] = useState<FormData>({
    title: initialData?.title || '',
    category: initialData?.category || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    author: initialData?.author || '',
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
    // Simulation — sera remplacé par un appel API
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    // Redirect to list after save
    setTimeout(() => {
      window.location.href = '/admin/actualites';
    }, 1000);
  }

  const selectedCategoryColor = CATEGORY_COLORS[form.category] || '#1a5c2a';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
      {/* Main content */}
      <div className="flex-1 flex flex-col gap-6">

        {/* Title */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Titre de l'article <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Saisissez le titre de l'article..."
            required
            className="w-full px-4 py-3 text-base font-semibold text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
          />
        </div>

        {/* Excerpt */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Résumé / Extrait <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) => handleChange('excerpt', e.target.value)}
            placeholder="Un court résumé de l'article (affiché dans les listes)..."
            required
            rows={3}
            className="w-full px-4 py-3 text-sm text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors resize-none"
          />
          <p className="text-xs text-gray-400 mt-1">{form.excerpt.length} / 200 caractères recommandés</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Contenu complet <span className="text-red-500">*</span>
          </label>
          <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600 transition-colors">
            {/* Mini toolbar */}
            <div className="flex items-center gap-1 px-3 py-2 bg-gray-50 border-b border-gray-200">
              {[
                { label: 'G', title: 'Gras', className: 'font-bold' },
                { label: 'I', title: 'Italique', className: 'italic' },
                { label: 'S', title: 'Souligné', className: 'underline' },
              ].map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  title={btn.title}
                  className={`w-7 h-7 flex items-center justify-center rounded text-xs text-gray-600 hover:bg-gray-200 transition-colors ${btn.className}`}
                >
                  {btn.label}
                </button>
              ))}
              <span className="w-px h-5 bg-gray-300 mx-1" />
              <button type="button" title="Titre H2" className="px-2 h-7 flex items-center rounded text-xs text-gray-600 hover:bg-gray-200 transition-colors font-semibold">H2</button>
              <button type="button" title="Liste" className="w-7 h-7 flex items-center justify-center rounded text-gray-600 hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            <textarea
              value={form.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Rédigez le contenu complet de l'article ici..."
              required
              rows={12}
              className="w-full px-4 py-3 text-sm text-gray-700 focus:outline-none resize-y"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">Support Markdown disponible — {form.content.length} caractères</p>
        </div>

        {/* Image placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
            Image principale
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center gap-3 hover:border-green-500 transition-colors cursor-pointer bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Glissez une image ici</p>
              <p className="text-xs text-gray-400 mt-1">ou <span className="text-green-600 font-semibold">parcourir les fichiers</span></p>
            </div>
            <p className="text-xs text-gray-400">PNG, JPG, WEBP — max 5 MB</p>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            💡 Fonctionnalité disponible après connexion à la base de données.
          </p>
        </div>

      </div>

      {/* Sidebar panel */}
      <div className="w-full lg:w-80 flex flex-col gap-6 flex-shrink-0">

        {/* Publish actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Publication</h3>

          {/* Status indicator */}
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
              className="w-full py-2.5 text-sm font-semibold rounded-lg border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {saving ? 'Enregistrement...' : 'Enregistrer en brouillon'}
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={saving}
              className="w-full py-2.5 text-sm font-bold rounded-lg text-white transition-all hover:brightness-110 disabled:opacity-50"
              style={{ backgroundColor: '#1a5c2a' }}
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
                mode === 'create' ? 'Publier l\'article' : 'Mettre à jour'
              )}
            </button>
          </div>
        </div>

        {/* Category */}
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
            {CATEGORIES.filter((c) => c.value).map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          {form.category && (
            <div className="mt-3 flex items-center gap-2">
              <span
                className="px-3 py-1 text-xs font-bold rounded-full text-white"
                style={{ backgroundColor: selectedCategoryColor }}
              >
                {form.category}
              </span>
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Métadonnées</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Auteur</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => handleChange('author', e.target.value)}
                placeholder="Service Communication"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Date de publication</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Back link */}
        <a
          href="/admin/actualites"
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
