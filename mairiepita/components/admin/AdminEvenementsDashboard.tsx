'use client';

import { useState } from 'react';
import { mockEvenements, EVENEMENT_CATEGORIES, EVENEMENT_CATEGORY_COLORS, type Evenement } from '@/lib/mockEvenements';
import AdminHeader from './AdminHeader';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatDateRange(dateDebut: string, dateFin: string) {
  if (dateDebut === dateFin) return formatDate(dateDebut);
  return `du ${formatDate(dateDebut)} au ${formatDate(dateFin)}`;
}

const today = new Date().toISOString().split('T')[0];

export default function AdminEvenementsDashboard() {
  const [evenements, setEvenements] = useState<Evenement[]>(mockEvenements);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const filtered = evenements.filter((e) => {
    const matchSearch = search
      ? e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.lieu.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchCat = filterCategory ? e.category === filterCategory : true;
    return matchSearch && matchCat;
  });

  function togglePublish(id: string) {
    setEvenements((prev) =>
      prev.map((e) => (e.id === id ? { ...e, published: !e.published } : e))
    );
  }

  function confirmDelete(id: string) {
    setDeleteTarget(id);
  }

  function executeDelete() {
    if (deleteTarget) {
      setEvenements((prev) => prev.filter((e) => e.id !== deleteTarget));
      setDeleteTarget(null);
    }
  }

  const publishedCount = evenements.filter((e) => e.published).length;
  const aVenirCount = evenements.filter((e) => e.dateDebut >= today).length;
  const passesCount = evenements.filter((e) => e.dateDebut < today).length;

  return (
    <>
      <AdminHeader
        title="Gestion des Événements"
        subtitle={`${evenements.length} événements — ${publishedCount} publiés, ${aVenirCount} à venir, ${passesCount} passés`}
        action={
          <a
            href="/admin/evenements/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-lg transition-all hover:brightness-110"
            style={{ backgroundColor: '#1a5c2a', color: '#fff' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nouvel événement
          </a>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total', value: evenements.length, color: '#1a5c2a', icon: '📅' },
          { label: 'Publiés', value: publishedCount, color: '#2d7a3a', icon: '✅' },
          { label: 'À venir', value: aVenirCount, color: '#1565c0', icon: '🔜' },
          { label: 'Passés', value: passesCount, color: '#6b7280', icon: '🕐' },
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
            placeholder="Rechercher un événement..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
        >
          {EVENEMENT_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label || 'Toutes catégories'}</option>
          ))}
        </select>
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-12 text-center text-gray-400 text-sm">
          Aucun événement trouvé.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((evt) => {
            const catColors = EVENEMENT_CATEGORY_COLORS[evt.category] || { bg: '#f3f4f6', text: '#6b7280' };
            const isPast = evt.dateDebut < today;
            return (
              <div
                key={evt.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
                    style={{ backgroundColor: catColors.bg, color: catColors.text }}
                  >
                    {evt.category}
                  </span>
                  {isPast && (
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap">Passé</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-800 text-sm leading-snug line-clamp-2">{evt.title}</h3>

                {/* Details */}
                <div className="flex flex-col gap-1.5 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <span>📍</span>
                    <span className="line-clamp-1">{evt.lieu}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>📅</span>
                    <span>{formatDateRange(evt.dateDebut, evt.dateFin)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>⏰</span>
                    <span>{evt.heureDebut} — {evt.heureFin}</span>
                  </div>
                </div>

                {/* Footer: status + actions */}
                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => togglePublish(evt.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      evt.published
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    }`}
                    title={evt.published ? 'Passer en brouillon' : 'Publier'}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${evt.published ? 'bg-green-500' : 'bg-orange-500'}`} />
                    {evt.published ? 'Publié' : 'Brouillon'}
                  </button>
                  <div className="flex items-center gap-1">
                    <a
                      href={`/admin/evenements/${evt.id}/edit`}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-green-700 hover:bg-green-50 transition-all"
                      title="Modifier"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </a>
                    <button
                      onClick={() => confirmDelete(evt.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                      title="Supprimer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-center text-gray-800 mb-2">Supprimer cet événement ?</h3>
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
