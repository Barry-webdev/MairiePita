'use client';

import { useEffect, useState } from 'react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motMaireService } from '@/lib/api/motMaire.service';

export default function MotDuMairePage() {
  const [motMaire, setMotMaire] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMotMaire() {
      try {
        const data = await motMaireService.get();
        setMotMaire(data);
      } catch (error) {
        console.error('Erreur lors du chargement du mot du maire:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMotMaire();
  }, []);

  return (
    <main>
      <TopBar />
      <Navbar />

      {/* Hero banner */}
      <div
        className="py-12 px-4 text-white"
        style={{ backgroundColor: '#1a5c2a' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-3">
            <a href="/" className="hover:text-white transition-colors">Accueil</a>
            <span>/</span>
            <a href="/la-commune" className="hover:text-white transition-colors">La Commune</a>
            <span>/</span>
            <span className="text-white">Mot du Maire</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
            Mot du Maire
          </h1>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-5xl mx-auto">
          
          {loading ? (
            // Skeleton loading
            <div className="bg-white rounded-xl shadow-sm p-8 animate-pulse">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ) : !motMaire ? (
            // Pas de données
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Contenu non disponible
              </h2>
              <p className="text-gray-500">
                Le mot du maire sera publié prochainement.
              </p>
            </div>
          ) : (
            // Contenu chargé
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Header avec photo */}
              <div className="p-8 md:p-12 border-b border-gray-200">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Photo */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      <img
                        src="/maire.jpg"
                        alt={motMaire.nom}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          `;
                        }}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
                      {motMaire.nom}
                    </h2>
                    <p className="text-lg font-semibold mb-3" style={{ color: '#1a5c2a' }}>
                      {motMaire.titre}
                    </p>
                    {motMaire.mandat && (
                      <p className="text-sm text-gray-600 mb-3">
                        Mandat : {motMaire.mandat}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {motMaire.email && (
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <a href={`mailto:${motMaire.email}`} className="hover:underline">
                            {motMaire.email}
                          </a>
                        </div>
                      )}
                      {motMaire.telephone && (
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          <a href={`tel:${motMaire.telephone}`} className="hover:underline">
                            {motMaire.telephone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Message complet */}
              <div className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <div
                    className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                    style={{ fontSize: '1.05rem', lineHeight: '1.8' }}
                  >
                    {motMaire.messageComplet}
                  </div>
                </div>

                {/* Signature */}
                {motMaire.signature && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-gray-600 italic">{motMaire.signature}</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}
