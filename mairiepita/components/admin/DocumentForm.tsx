'use client';

import { useState } from 'react';
import { documentsService } from '@/lib/api/documents.service';
import { DOCUMENT_CATEGORIES, type Document } from '@/lib/mockDocuments';

type FormData = {
  title: string;
  category: string;
  description: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX' | 'ZIP';
  fileUrl: string;
  fileSize: string;
  published: boolean;
};

interface DocumentFormProps {
  initialData?: Partial<Document>;
  mode: 'create' | 'edit';
  documentId?: string;
}

export default function DocumentForm({ initialData, mode, documentId }: DocumentFormProps) {
  const [form, setForm] = useState<FormData>({
    title: initialData?.title || '',
    category: initialData?.category || '',
    description: initialData?.description || '',
    fileType: initialData?.fileType || 'PDF',
    fileUrl: (initialData as any)?.fileUrl || '',
    fileSize: initialData?.fileSize || '0 KB',
    published: initialData?.published ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  function handleChange(field: keyof FormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent, publish?: boolean) {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const documentData = {
        ...form,
        published: publish !== undefined ? publish : form.published,
      };

      if (mode === 'create') {
        await documentsService.create(documentData);
      } else if (mode === 'edit' && documentId) {
        await documentsService.update(documentId, documentData);
      }

      setSaved(true);
      
      setTimeout(() => {
        window.location.href = '/admin/documents';
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
      {/* Main content */}
      <div className="flex-1 flex flex-col gap-6">

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">❌ {error}</p>
          </div>
        )}

        {/* Title */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Titre du document <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Ex: Budget communal 2024"
            required
            className="w-full px-4 py-3 text-base font-semibold text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
          />
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Description du document..."
            required
            rows={4}
            className="w-full px-4 py-3 text-sm text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors resize-none"
          />
        </div>

        {/* File URL (temporaire, en attendant l'upload) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            URL du fichier <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            value={form.fileUrl}
            onChange={(e) => handleChange('fileUrl', e.target.value)}
            placeholder="https://exemple.com/document.pdf"
            required
            className="w-full px-4 py-3 text-sm text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
          />
          <p className="text-xs text-gray-400 mt-2">
            💡 Upload de fichiers sera ajouté prochainement. Pour l'instant, utilisez une URL.
          </p>
        </div>

        {/* File Size */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Taille du fichier
          </label>
          <input
            type="text"
            value={form.fileSize}
            onChange={(e) => handleChange('fileSize', e.target.value)}
            placeholder="Ex: 2.4 MB"
            className="w-full px-4 py-3 text-sm text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
          />
        </div>

      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-6 flex-shrink-0">

        {/* Publish actions */}
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
              Enregistré avec succès !
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
                mode === 'create' ? 'Publier le document' : 'Mettre à jour'
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
            {DOCUMENT_CATEGORIES.filter((c) => c.value).map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* File Type */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
            Type de fichier <span className="text-red-500">*</span>
          </label>
          <select
            value={form.fileType}
            onChange={(e) => handleChange('fileType', e.target.value as any)}
            required
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
          >
            <option value="PDF">PDF</option>
            <option value="DOCX">DOCX (Word)</option>
            <option value="XLSX">XLSX (Excel)</option>
            <option value="ZIP">ZIP (Archive)</option>
          </select>
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
