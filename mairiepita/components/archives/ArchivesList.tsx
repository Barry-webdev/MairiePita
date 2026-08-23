'use client';

import { useState, useEffect } from 'react';
import { archivesService, type Archive } from '@/lib/api/archives.service';

export default function ArchivesList() {
  const [archives, setArchives] = useState<Archive[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArchives();
  }, []);

  async function loadArchives() {
    try {
      const data = await archivesService.getAll();
      setArchives(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#1a5c2a' }}></div>
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  if (archives.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
        <p className="text-gray-500 font-medium">Aucune archive disponible</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {archives.map((archive) => (
        <div
          key={archive.id}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
        >
          {/* Photo */}
          <div className="relative h-64 bg-gray-200">
            <img
              src={archive.photo || '/maire.jpg'}
              alt={archive.nom}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/maire.jpg';
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white font-bold text-lg">{archive.nom}</p>
              <p className="text-white/80 text-sm">{archive.titre}</p>
            </div>
          </div>

          {/* Infos */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" style={{ color: '#1a5c2a' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">
                Mandat : {archive.mandat}
              </span>
            </div>

            {archive.biographie && (
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 mb-4">
                {archive.biographie}
              </p>
            )}

            {archive.realisations && (
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Principales réalisations
                </p>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {archive.realisations}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
