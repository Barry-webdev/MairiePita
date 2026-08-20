'use client';

import { useState, useMemo, useEffect } from 'react';
import { appelsOffresService } from '@/lib/api/appelsOffres.service';

const ITEMS_PER_PAGE = 9;

// Catégories disponibles
const CATEGORIES = [
  { value: '', label: 'Toutes' },
  { value: 'Travaux', label: 'Travaux' },
  { value: 'Fournitures', label: 'Fournitures' },
  { value: 'Services', label: 'Services' },
  { value: 'Études', label: 'Études' },
  { value: 'Autre', label: 'Autre' },
];

// Statuts disponibles
const STATUTS = [
  { value: '', label: 'Tous' },
  { value: 'Ouvert', label: 'Ouvert' },
  { value: 'Fermé', label: 'Fermé' },
  { value: 'Attribué', label: 'Attribué' },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatBudget(budget: number) {
  return new Intl.NumberFormat('fr-GN', {
    style: 'currency',
    currency: 'GNF',
    maximumFractionDigits: 0,
  }).format(budget);
}

export default function AppelsOffresList() {
  const [appels, setAppels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Charger les appels d'offres depuis l'API
  useEffect(() => {
    async function fetchAppels() {
      try {
        setLoading(true);
        const data = await appelsOffresService.getAll({ published: true });
        // Trier par date de clôture (les plus récents en premier)
        const sorted = data.sort((a: any, b: any) => 
          new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
        );
        setAppels(sorted);
      } catch (error) {
        console.error('Erreur lors du chargement des appels d\'offres:', error);
        setAppels([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAppels();
  }, []);

  const filtered = useMemo(() => {
    return appels.filter((a) => {
      const matchCat = selectedCategory ? a.category === selectedCategory : true;
      const matchStatus = selectedStatus ? a.status === selectedStatus : true;
      const matchSearch = search
        ? a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.reference.toLowerCase().includes(search.toLowerCase()) ||
          a.description.toLowerCase().includes(search.toLowerCase())
        : true;
      return matchCat && matchStatus && matchSearch;
    });
  }, [appels, selectedCategory, selectedStatus, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  function handleCategory(cat: string) {
    setSelectedCategory(cat);
    setPage(1);
  }

  function handleStatus(status: string) {
    setSelectedStatus(status);
    setPage(1);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setPage(1);
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'Ouvert': return { bg: '#e8f5e9', color: '#2e7d32' };
      case 'Fermé': return { bg: '#ffebee', color: '#c62828' };
      case 'Attribué': return { bg: '#e3f2fd', color: '#1565c0' };
      default: return { bg: '#f5f5f5', color: '#616161' };
    }
  }

  // État de chargement
  if (loading) {
    return (
      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Pas d'appels d'offres dans la base
  if (appels.length === 0) {
    return (
      <section className="py-16 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-xl p-12 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto mb-4 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Aucun appel d'offres disponible
            </h2>
            <p className="text-gray-500">
              Les prochains appels d'offres seront publiés prochainement.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-7xl mx-auto">

        {/* Search + Filters */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Search */}
          <div className="relative max-w-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Rechercher un appel d'offres..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategory(cat.value)}
                  className="px-3 py-2 text-xs font-semibold rounded-lg border transition-all"
                  style={
                    selectedCategory === cat.value
                      ? { backgroundColor: '#1a5c2a', color: '#fff', borderColor: '#1a5c2a' }
                      : { backgroundColor: '#fff', color: '#374151', borderColor: '#d1d5db' }
                  }
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Status filter */}
            <div className="flex flex-wrap gap-2">
              {STATUTS.map((stat) => (
                <button
                  key={stat.value}
                  onClick={() => handleStatus(stat.value)}
                  className="px-3 py-2 text-xs font-semibold rounded-lg border transition-all"
                  style={
                    selectedStatus === stat.value
                      ? { backgroundColor: '#1a5c2a', color: '#fff', borderColor: '#1a5c2a' }
                      : { backgroundColor: '#fff', color: '#374151', borderColor: '#d1d5db' }
                  }
                >
                  {stat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {filtered.length} appel{filtered.length !== 1 ? 's' : ''} d'offre{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Appels grid */}
        {paginated.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm">Aucun appel d'offres trouvé.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((appel) => {
              const statusStyle = getStatusColor(appel.status);
              return (
                <div
                  key={appel._id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col gap-4"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-gray-500">{appel.reference}</span>
                    <span
                      className="px-2.5 py-1 text-xs font-bold rounded"
                      style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}
                    >
                      {appel.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-gray-800 leading-snug line-clamp-2">
                    {appel.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 line-clamp-2 flex-1">
                    {appel.description}
                  </p>

                  {/* Meta */}
                  <div className="space-y-2 text-xs text-gray-600 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Catégorie :</span>
                      <span className="text-gray-500">{appel.category}</span>
                    </div>
                    {appel.budget && (
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Budget :</span>
                        <span className="font-bold" style={{ color: '#1a5c2a' }}>
                          {formatBudget(appel.budget)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Date limite :</span>
                      <span className="text-gray-500">{formatDate(appel.deadline)}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  {appel.documentUrl && (
                    <a
                      href={appel.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-lg transition-all hover:shadow-md"
                      style={{ backgroundColor: '#1a5c2a' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Télécharger le dossier
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:border-green-600 hover:text-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Précédent
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="w-9 h-9 text-sm font-bold rounded-lg border transition-all"
                style={
                  p === page
                    ? { backgroundColor: '#1a5c2a', color: '#fff', borderColor: '#1a5c2a' }
                    : { backgroundColor: '#fff', color: '#374151', borderColor: '#d1d5db' }
                }
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:border-green-600 hover:text-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Suivant
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
