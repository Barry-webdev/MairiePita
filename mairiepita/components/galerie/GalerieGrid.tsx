'use client';

import { useState, useMemo, useEffect } from 'react';
import { galleryService, type GalleryMedia } from '@/lib/api/gallery.service';

const ITEMS_PER_PAGE = 12;

const CATEGORIES = [
  { value: '', label: 'Toutes' },
  { value: 'Événements', label: 'Événements' },
  { value: 'Infrastructure', label: 'Infrastructure' },
  { value: 'Cérémonies', label: 'Cérémonies' },
  { value: 'Vie quotidienne', label: 'Vie quotidienne' },
  { value: 'Actualités', label: 'Actualités' },
  { value: 'Autres', label: 'Autres' },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function GalerieGrid() {
  const [medias, setMedias] = useState<GalleryMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'image' | 'video'>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);
  const [showLightbox, setShowLightbox] = useState(false);

  // Charger les médias depuis l'API
  useEffect(() => {
    async function fetchMedias() {
      try {
        setLoading(true);
        const response = await galleryService.getAll({ mediaType: 'all' });
        
        // Le backend retourne { photos: [], totalPages, currentPage, total }
        const mediaList = response.photos || [];
        
        // Les médias sont déjà filtrés par published: true côté backend
        setMedias(mediaList);
      } catch (error) {
        console.error('Erreur lors du chargement de la galerie:', error);
        setMedias([]);
      } finally {
        setLoading(false);
      }
    }
    fetchMedias();
  }, []);

  const filtered = useMemo(() => {
    return medias.filter((m) => {
      const matchCat = selectedCategory ? m.categorie === selectedCategory : true;
      const matchType = selectedType !== 'all' ? m.mediaType === selectedType : true;
      const matchSearch = search
        ? m.titre.toLowerCase().includes(search.toLowerCase()) ||
          (m.description && m.description.toLowerCase().includes(search.toLowerCase()))
        : true;
      return matchCat && matchType && matchSearch;
    });
  }, [medias, selectedCategory, selectedType, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  function handleCategory(cat: string) {
    setSelectedCategory(cat);
    setPage(1);
  }

  function handleType(type: 'all' | 'image' | 'video') {
    setSelectedType(type);
    setPage(1);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setPage(1);
  }

  function openLightbox(media: GalleryMedia) {
    setSelectedMedia(media);
    setShowLightbox(true);
  }

  function closeLightbox() {
    setShowLightbox(false);
    setSelectedMedia(null);
  }

  // État de chargement
  if (loading) {
    return (
      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Pas de médias dans la base
  if (medias.length === 0) {
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Aucun média disponible
            </h2>
            <p className="text-gray-500">
              La galerie photo et vidéo sera bientôt disponible.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-7xl mx-auto">

        {/* Search + Type filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
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
              placeholder="Rechercher un média..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Type filter */}
          <div className="flex gap-2">
            <button
              onClick={() => handleType('all')}
              className="px-4 py-2 text-xs font-semibold rounded-lg border transition-all"
              style={
                selectedType === 'all'
                  ? { backgroundColor: '#1a5c2a', color: '#fff', borderColor: '#1a5c2a' }
                  : { backgroundColor: '#fff', color: '#374151', borderColor: '#d1d5db' }
              }
            >
              Tous
            </button>
            <button
              onClick={() => handleType('image')}
              className="px-4 py-2 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5"
              style={
                selectedType === 'image'
                  ? { backgroundColor: '#2563eb', color: '#fff', borderColor: '#2563eb' }
                  : { backgroundColor: '#fff', color: '#374151', borderColor: '#d1d5db' }
              }
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Photos
            </button>
            <button
              onClick={() => handleType('video')}
              className="px-4 py-2 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5"
              style={
                selectedType === 'video'
                  ? { backgroundColor: '#9333ea', color: '#fff', borderColor: '#9333ea' }
                  : { backgroundColor: '#fff', color: '#374151', borderColor: '#d1d5db' }
              }
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Vidéos
            </button>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
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

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {filtered.length} média{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Media grid */}
        {paginated.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-4 opacity-40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Aucun média trouvé.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginated.map((media) => (
              <div
                key={media._id}
                onClick={() => openLightbox(media)}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 cursor-pointer"
              >
                {/* Preview */}
                <div className="relative aspect-video bg-gray-100">
                  {media.mediaType === 'image' ? (
                    <img
                      src={media.mediaUrl}
                      alt={media.titre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <video
                        src={media.mediaUrl}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      {media.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {Math.floor(media.duration / 60)}:{String(Math.floor(media.duration % 60)).padStart(2, '0')}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Badge Type */}
                  <div
                    className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1 ${
                      media.mediaType === 'image' ? 'bg-blue-600' : 'bg-purple-600'
                    }`}
                  >
                    {media.mediaType === 'image' ? (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-sm text-gray-800 mb-1 line-clamp-1">
                    {media.titre}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{media.categorie}</p>
                  {media.description && (
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                      {media.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-400">{formatDate(media.date)}</p>
                </div>
              </div>
            ))}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {showLightbox && selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.mediaType === 'image' ? (
              <img
                src={selectedMedia.mediaUrl}
                alt={selectedMedia.titre}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />
            ) : (
              <video
                src={selectedMedia.mediaUrl}
                controls
                autoPlay
                className="w-full h-auto max-h-[85vh] rounded-lg"
              />
            )}

            <div className="mt-4 text-white text-center">
              <h3 className="text-xl font-bold mb-2">{selectedMedia.titre}</h3>
              {selectedMedia.description && (
                <p className="text-sm text-gray-300 mb-2">{selectedMedia.description}</p>
              )}
              <p className="text-xs text-gray-400">
                {selectedMedia.categorie} • {formatDate(selectedMedia.date)}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
