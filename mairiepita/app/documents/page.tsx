'use client';

import { useState, useMemo } from 'react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockDocuments, DOCUMENT_CATEGORIES } from '@/lib/mockDocuments';

const FILE_TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  PDF:  { bg: '#fee2e2', color: '#dc2626' },
  DOCX: { bg: '#dbeafe', color: '#2563eb' },
  XLSX: { bg: '#dcfce7', color: '#16a34a' },
  ZIP:  { bg: '#f3f4f6', color: '#6b7280' },
};

function FileIcon({ fileType }: { fileType: string }) {
  const { color } = FILE_TYPE_COLORS[fileType] || FILE_TYPE_COLORS.ZIP;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function DocumentsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const published = mockDocuments.filter((d) => d.published);

  const filtered = useMemo(() => {
    return published.filter((d) => {
      const matchCat = selectedCategory ? d.category === selectedCategory : true;
      const matchSearch = search
        ? d.title.toLowerCase().includes(search.toLowerCase()) ||
          d.description.toLowerCase().includes(search.toLowerCase())
        : true;
      return matchCat && matchSearch;
    });
  }, [search, selectedCategory]);

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
            <span className="text-white">Documents</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
            Documents à télécharger
          </h1>
          <p className="mt-2 text-sm max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Consultez et téléchargez les documents officiels de la Commune Urbaine de Pita.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto">

          {/* Search + filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); }}
                placeholder="Rechercher un document..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {DOCUMENT_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
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
          </div>

          <p className="text-sm text-gray-500 mb-6">
            {filtered.length} document{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm">Aucun document trouvé.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((doc) => {
                const typeStyle = FILE_TYPE_COLORS[doc.fileType] || FILE_TYPE_COLORS.ZIP;
                return (
                  <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                    {/* File type icon area */}
                    <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100" style={{ backgroundColor: typeStyle.bg }}>
                      <FileIcon fileType={doc.fileType} />
                      <div>
                        <span
                          className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded text-white"
                          style={{ backgroundColor: typeStyle.color }}
                        >
                          {doc.fileType}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{doc.fileSize}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <h3 className="font-bold text-gray-800 text-sm leading-snug">
                        {doc.title}
                      </h3>
                      <div>
                        <span
                          className="px-2.5 py-1 text-xs font-semibold rounded-full"
                          style={{ backgroundColor: '#f0fdf4', color: '#15803d' }}
                        >
                          {doc.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">
                        {doc.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                        <span className="flex items-center gap-1.5 text-xs text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(doc.date)}
                        </span>
                        <button
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-lg transition-all hover:brightness-110"
                          style={{ backgroundColor: '#1a5c2a' }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Télécharger
                        </button>
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
