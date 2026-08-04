'use client';

import { useState } from 'react';
import { mockAppelsOffres, APPEL_CATEGORIES, STATUS_COLORS, type AppelOffre } from '@/lib/mockAppelsOffres';
import AdminHeader from './AdminHeader';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

type StatusFilter = '' | 'Ouvert' | 'Clôturé' | 'Attribué' | 'Annulé';

export default function AdminAppelsOffresDashboard() {
  const [appels, setAppels] = useState<AppelOffre[]>(mockAppelsOffres);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState<StatusFilter>('');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const filtered = appels.filter((a) => {
    const matchSearch = search
      ? a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.reference.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchCat = filterCategory ? a.category === filterCategory : true;
    const matchStatus = filterStatus ? a.status === filterStatus : true;
    return matchSearch && matchCat && matchStatus;
  });

  function confirmDelete(id: string) {
    setDeleteTarget(id);
  }

  function executeDelete() {
    if (deleteTarget) {
      setAppels((prev) => prev.filter((a) => a.id !== deleteTarget));
      setDeleteTarget(null);
    }
  }

  const ouvertCount = appels.filter((a) => a.status === 'Ouvert').length;
  const clotureCount = appels.filter((a) => a.status === 'Clôturé').length;
  const attribueCount = appels.filter((a) => a.status === 'Attribué').length;

  return (
    <>
      <AdminHeader
        title="Appels d'Offres"
        subtitle={`${appels.length} appels au total — ${ouvertCount} ouverts, ${clotureCount} clôturés, ${attribueCount} attribués`}
        action={
          <a
            href="/admin/appels-offres/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-lg transition-all hover:brightness-110"
            style={{ backgroundColor: '#1a5c2a', color: '#fff' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nouvel appel d'offres
          </a>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total', value: appels.length, color: '#1a5c2a', icon: '📋' },
          { label: 'Ouverts', value: ouvertCount, color: STATUS_COLORS['Ouvert'].text, icon: '🟢' },
          { label: 'Clôturés', value: clotureCount, color: STATUS_COLORS['Clôturé'].text, icon: '🔴' },
          { label: 'Attribués', value: attribueCount, color: STATUS_COLORS['Attribué'].text, icon: '🔵' },
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
            placeholder="Rechercher par titre ou référence..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
        >
          {APPEL_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label || 'Toutes catégories'}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as StatusFilter)}
          className="px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
        >
          <option value="">Tous les statuts</option>
          <option value="Ouvert">Ouvert</option>
          <option value="Clôturé">Clôturé</option>
          <option value="Attribué">Attribué</option>
          <option value="Annulé">Annulé</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100" style={{ backgroundColor: '#f9fafb' }}>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Référence</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Titre</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider hidden sm:table-cell">Catégorie</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider hidden md:table-cell">Budget</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider hidden lg:table-cell">Date limite</th>
                <th className="text-center px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Statut</th>
                <th className="text-right px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-gray-400 text-sm">
                    Aucun appel d&apos;offres trouvé.
                  </td>
                </tr>
              ) : (
                filtered.map((appel) => (
                  <tr key={appel.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                        {appel.reference}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-800 line-clamp-1 max-w-xs">{appel.title}</p>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 whitespace-nowrap">
                        {appel.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600 text-xs hidden md:table-cell whitespace-nowrap">{appel.budget}</td>
                    <td className="px-5 py-4 text-gray-500 text-xs hidden lg:table-cell whitespace-nowrap">{formatDate(appel.dateLimite)}</td>
                    <td className="px-5 py-4 text-center">
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                        style={{
                          backgroundColor: STATUS_COLORS[appel.status]?.bg || '#f3f4f6',
                          color: STATUS_COLORS[appel.status]?.text || '#6b7280',
                        }}
                      >
                        {appel.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/admin/appels-offres/${appel.id}/edit`}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-green-700 hover:bg-green-50 transition-all"
                          title="Modifier"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </a>
                        <button
                          onClick={() => confirmDelete(appel.id)}
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
            <h3 className="text-base font-bold text-center text-gray-800 mb-2">Supprimer cet appel d&apos;offres ?</h3>
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
