'use client';

import { useState, useMemo } from 'react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockEvenements, EVENEMENT_CATEGORIES, EVENEMENT_CATEGORY_COLORS } from '@/lib/mockEvenements';

const MONTH_NAMES_FR = [
  'JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUIN',
  'JUIL', 'AOÛT', 'SEP', 'OCT', 'NOV', 'DÉC',
];

function formatDateFull(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function EvenementsPage() {
  const [filter, setFilter] = useState<'tous' | 'avenir' | 'passes'>('tous');
  const [selectedCategory, setSelectedCategory] = useState('');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const published = mockEvenements.filter((e) => e.published);

  const filtered = useMemo(() => {
    return published.filter((e) => {
      const dateDebut = new Date(e.dateDebut);
      dateDebut.setHours(0, 0, 0, 0);
      const isUpcoming = dateDebut >= today;

      const matchTime =
        filter === 'tous' ? true :
        filter === 'avenir' ? isUpcoming :
        !isUpcoming;
      const matchCat = selectedCategory ? e.category === selectedCategory : true;
      return matchTime && matchCat;
    });
  }, [filter, selectedCategory]);

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
            <span className="text-white">Événements</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
            Événements
          </h1>
          <p className="mt-2 text-sm max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Découvrez les événements et manifestations organisés par la Commune Urbaine de Pita.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto">

          {/* Filter tabs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex gap-2 bg-white rounded-lg p-1 border border-gray-200 w-fit">
              {[
                { key: 'tous', label: 'Tous' },
                { key: 'avenir', label: 'À venir' },
                { key: 'passes', label: 'Passés' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as 'tous' | 'avenir' | 'passes')}
                  className="px-4 py-2 text-sm font-semibold rounded-md transition-all"
                  style={
                    filter === tab.key
                      ? { backgroundColor: '#1a5c2a', color: '#fff' }
                      : { color: '#374151' }
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {EVENEMENT_CATEGORIES.map((cat) => (
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

          <p className="text-sm text-gray-500 mb-6">
            {filtered.length} événement{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* Cards grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Aucun événement trouvé.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((ev) => {
                const catColor = EVENEMENT_CATEGORY_COLORS[ev.category] || { bg: '#f3f4f6', text: '#374151' };
                const dateDebut = new Date(ev.dateDebut);
                const day = dateDebut.getDate();
                const month = MONTH_NAMES_FR[dateDebut.getMonth()];
                return (
                  <div key={ev.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    {/* Colored band */}
                    <div
                      className="px-5 py-3 flex items-center justify-between"
                      style={{ backgroundColor: catColor.bg }}
                    >
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: catColor.text }}>
                        {ev.category}
                      </span>
                    </div>

                    {/* Date display */}
                    <div className="px-5 pt-5 pb-3 flex items-center gap-4">
                      <div
                        className="flex flex-col items-center justify-center w-16 h-16 rounded-xl flex-shrink-0"
                        style={{ backgroundColor: '#1a5c2a' }}
                      >
                        <span className="text-2xl font-black text-white leading-none">{day}</span>
                        <span className="text-xs font-bold mt-0.5" style={{ color: '#d4a017' }}>{month}</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">{formatDateFull(ev.dateDebut)}</p>
                        {ev.dateDebut !== ev.dateFin && (
                          <p className="text-xs text-gray-400">au {formatDateFull(ev.dateFin)}</p>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-5 pb-5 flex flex-col gap-3 flex-1">
                      <h3 className="font-bold text-gray-800 text-sm leading-snug">
                        {ev.title}
                      </h3>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>📍</span>
                          <span className="line-clamp-1">{ev.lieu}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>⏰</span>
                          <span>{ev.heureDebut} - {ev.heureFin}</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-3 border-t border-gray-100">
                        <a
                          href="#"
                          className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors hover:underline"
                          style={{ color: '#1a5c2a' }}
                        >
                          En savoir plus
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
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
