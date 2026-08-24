'use client';

import { useState, useEffect } from 'react';
import { documentsService, type Document } from '@/lib/api/documents.service';
import { DOCUMENT_CATEGORIES } from '@/lib/mockDocuments';
import AdminHeader from './AdminHeader';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const FILE_TYPE_COLORS: Record<string, string> = {
  PDF: '#dc2626',
  DOCX: '#1d4ed8',
  XLSX: '#15803d',
  ZIP: '#6b7280',
};

export default function AdminDocumentsDashboard() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      setLoading(true);
      const data = await documentsService.getAll();
      setDocuments(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const filtered = documents.filter((d) => {
    const matchSearch = search
      ? d.title.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchCat = filterCategory ? d.category === filterCategory : true;
    return matchSearch && matchCat;
  });

  async function togglePublish(id: string) {
    try {
      const document = documents.find((d) => d.id === id);
      if (!document) return;

      await documentsService.update(id, { published: !document.published });
      
      setDocuments((prev) =>
        prev.map((d) => (d.id === id ? { ...d, published: !d.published } : d))
      );
    } catch (err: any) {
      alert('Erreur lors de la mise à jour : ' + err.message);
    }
  }

  function confirmDelete(id: string) {
    setDeleteTarget(id);
  }

  async function executeDelete() {
    if (!deleteTarget) return;

    try {
      await documentsService.delete(deleteTarget);
      setDocuments((prev) => prev.filter((d) => d.id !== deleteTarget));
      setDeleteTarget(null);
    } catch (err: any) {
      alert('Erreur lors de la suppression : ' + err.message);
      setDeleteTarget(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-500">Chargement des documents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">❌ Erreur : {error}</p>
        <button
          onClick={loadDocuments}
          className="mt-2 text-sm text-red-700 underline hover:no-underline"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const publishedCount = documents.filter((d) => d.published).length;
  const draftCount = documents.filter((d) => !d.published).length;
  const totalDownloads = documents.reduce((sum, d) => sum + d.downloadCount, 0);

  return (
    <>
      <AdminHeader
        title="Gestion des Documents"
        subtitle={`${documents.length} documents au total — ${publishedCount} publiés, ${draftCount} brouillons`}
        action={
          <a
            href="/admin/documents/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-lg transition-all hover:brightness-110"
            style={{ backgroundColor: '#1a5c2a', color: '#fff' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nouveau document
          </a>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total', value: documents.length, color: '#1a5c2a', icon: '📄' },
          { label: 'Publiés', value: publishedCount, color: '#2d7a3a', icon: '✅' },
          { label: 'Brouillons', value: draftCount, color: '#e65100', icon: '📝' },
          { label: 'Téléchargements', value: totalDownloads, color: '#1565c0', icon: '⬇️' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <span className="text-2xl">{stat.icon}</span>
            <div>
              <p className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un document..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
        >
          {DOCUMENT_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label || 'Toutes catégories'}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100" style={{ backgroundColor: '#f9fafb' }}>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Titre</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider hidden sm:table-cell">Catégorie</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider hidden md:table-cell">Type</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider hidden lg:table-cell">Taille</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider hidden lg:table-cell">Date</th>
                <th className="text-center px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Statut</th>
                <th className="text-right px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-gray-400 text-sm">
                    Aucun document trouvé.
                  </td>
                </tr>
              ) : (
                filtered.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-800 line-clamp-1 max-w-xs">{doc.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 hidden sm:block">{doc.description}</p>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 whitespace-nowrap">
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: FILE_TYPE_COLORS[doc.fileType] || '#6b7280',
                          color: '#fff',
                        }}
                      >
                        {doc.fileType}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs hidden lg:table-cell whitespace-nowrap">{doc.fileSize}</td>
                    <td className="px-5 py-4 text-gray-500 text-xs hidden lg:table-cell whitespace-nowrap">
                      {formatDate(doc.createdAt || new Date().toISOString())}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => togglePublish(doc.id!)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                          doc.published
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        }`}
                        title={doc.published ? 'Passer en brouillon' : 'Publier'}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${doc.published ? 'bg-green-500' : 'bg-orange-500'}`} />
                        {doc.published ? 'Publié' : 'Brouillon'}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/admin/documents/${doc.id}/edit`}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-green-700 hover:bg-green-50 transition-all"
                          title="Modifier"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </a>
                        <button
                          onClick={() => confirmDelete(doc.id!)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                          title="Supprimer"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-center text-gray-800 mb-2">Supprimer ce document ?</h3>
            <p className="text-sm text-center text-gray-500 mb-6">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 text-sm font-semibold rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                style={{ color: '#fff' }}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
