'use client';

import { useState, useMemo } from 'react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockAppelsOffres, APPEL_CATEGORIES, STATUS_COLORS } from '@/lib/mockAppelsOffres';

const STATUS_OPTIONS = [
  { label: 'Tous', value: '' },
  { label: 'Ouvert', value: 'Ouvert' },
  { label: 'Clôturé', value: 'Clôturé' },
  { label: 'Attribué', value: 'Attribué' },
  { label: 'Annulé', value: 'Annulé' },
];

function getDaysRemaining(dateLimite: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const limite = new Date(dateLimite);
  limite.setHours(0, 0, 0, 0);
  return Math.ceil((limite.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function AppelsOffresPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const published = mockAppelsOffres.filter((a) => a.published);

  const filtered = useMemo(() => {
    return published.filter((a) => {
      const matchCat = selectedCategory ? a.category === selectedCategory : true;
      const matchStatus = selectedStatus ? a.status === selectedStatus : true;
      const matchSearch = search
        ? a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.reference.toLowerCase().includes(search.toLowerCase()) ||
          a.description.toLowerCase().includes(search.toLowerCase())
        : true;
      return matchCat && matchStatus && matchSearch;
    });
  }, [search, selectedCategory, selectedStatus]);

  const countOuverts = published.filter((a) => a.status === 'Ouvert').length;
  const countClotures = published.filter((a) => a.status === 'Clôturé').length;
  const countAttribues = published.filter((a) => a.status === 'Attribué').length;

  return (
    <main>
      <TopBar />
      <Navbar />

      {/* Green banner */}
      <div className="py-12 px-4 text-white" style={{ backgroundColor: '#1a5c2a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.75)' }}>
            <a href="/" className="hover:text-white transition-colors">Accueil</a>
            <span>/</span>
            <span className="text-white">Appels d&apos;Offres</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
            Appels d&apos;Offres
          </h1>
          <p className="mt-2 text-sm max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Consultez les marchés publics et opportunités de la Commune Urbaine de Pita.
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="px-4 py-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4">
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm font-semibold text-gray-700">Ouverts</span>
            <span className="text-xl font-black" style={{ color: '#15803d' }}>{countOuverts}</span>
          </div>
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm font-semibold text-gray-700">Clôturés</span>
            <span className="text-xl font-black" style={{ color: '#b91c1c' }}>{countClotures}</span>
          </div>
          <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-5 py-3">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm font-semibold text-gray-700">Attribués</span>
            <span className="text-xl font-black" style={{ color: '#1d4ed8' }}>{countAttribues}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto">

          {/* Filters */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="relative max-w-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un appel d'offres..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              {/* Category filter */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-semibold text-gray-500 self-center mr-1">Catégorie:</span>
                {APPEL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all"
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
                <span className="text-xs font-semibold text-gray-500 self-center mr-1">Statut:</span>
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSelectedStatus(s.value)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all"
                    style={
                      selectedStatus === s.value
                        ? { backgroundColor: '#1a5c2a', color: '#fff', borderColor: '#1a5c2a' }
                        : { backgroundColor: '#fff', color: '#374151', borderColor: '#d1d5db' }
                    }
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            {filtered.length} appel{filtered.length !== 1 ? 's' : ''} d&apos;offres trouvé{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* List */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm">Aucun appel d&apos;offres trouvé.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map((ao) => {
                const statusStyle = STATUS_COLORS[ao.status] || STATUS_COLORS['Annulé'];
                const daysLeft = getDaysRemaining(ao.dateLimite);
                return (
                  <div key={ao.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col md:flex-row gap-4">
                    {/* Left: reference + status */}
                    <div className="flex md:flex-col items-start gap-2 md:w-40 flex-shrink-0">
                      <span
                        className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded text-white"
                        style={{ backgroundColor: '#1a5c2a' }}
                      >
                        {ao.reference}
                      </span>
                      <span
                        className="px-2.5 py-1 text-xs font-bold rounded"
                        style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                      >
                        {ao.status}
                      </span>
                    </div>

                    {/* Middle: info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 text-base leading-snug mb-1">
                        {ao.title}
                      </h3>
                      <p className="text-xs font-semibold mb-2" style={{ color: '#1a5c2a' }}>
                        {ao.category}
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                        {ao.description}
                      </p>
                    </div>

                    {/* Right: budget + date + button */}
                    <div className="flex md:flex-col items-start md:items-end gap-3 md:w-48 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-xs text-gray-400 mb-0.5">Budget estimé</p>
                        <p className="text-sm font-bold text-gray-800">{ao.budget}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 mb-0.5">Date limite</p>
                        <p className="text-sm font-semibold text-gray-700">{formatDate(ao.dateLimite)}</p>
                        {ao.status === 'Ouvert' && daysLeft > 0 && (
                          <p className="text-xs font-bold mt-0.5" style={{ color: daysLeft <= 7 ? '#b91c1c' : '#15803d' }}>
                            {daysLeft} jour{daysLeft !== 1 ? 's' : ''} restant{daysLeft !== 1 ? 's' : ''}
                          </p>
                        )}
                        {ao.status === 'Ouvert' && daysLeft <= 0 && (
                          <p className="text-xs font-bold mt-0.5 text-red-600">Expiré</p>
                        )}
                      </div>
                      <button
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-lg transition-all hover:brightness-110 whitespace-nowrap"
                        style={{ backgroundColor: '#1a5c2a' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Voir le dossier
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
