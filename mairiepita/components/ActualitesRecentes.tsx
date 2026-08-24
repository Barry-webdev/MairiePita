'use client';

import { useState, useEffect } from 'react';
import { articlesService, Article } from '@/lib/api/articles.service';

// Couleurs par catégorie
const CATEGORY_COLORS: Record<string, { bg: string; badge: string }> = {
  'Conseil Communal': { bg: '#1a5c2a', badge: '#1a5c2a' },
  'Environnement': { bg: '#388e3c', badge: '#4caf50' },
  'Éducation': { bg: '#1976d2', badge: '#1565c0' },
  'Eau & Assainissement': { bg: '#00695c', badge: '#00838f' },
  'Santé': { bg: '#c62828', badge: '#d32f2f' },
  'Infrastructure': { bg: '#f57c00', badge: '#ff9800' },
  'Culture': { bg: '#7b1fa2', badge: '#9c27b0' },
  'Sport': { bg: '#0288d1', badge: '#03a9f4' },
  'default': { bg: '#1a5c2a', badge: '#1a5c2a' },
};

function getCategoryColor(category: string) {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function ActualitesRecentes() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    try {
      setLoading(true);
      // Récupérer les 4 derniers articles publiés
      const data = await articlesService.getAll({ published: true });
      setArticles(data.slice(0, 4));
    } catch (err) {
      console.error('Erreur chargement articles:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl font-black uppercase tracking-widest" style={{ color: '#1a5c2a' }}>
            Actualités Récentes
          </h2>
          <div className="mt-2 h-1 w-20 rounded" style={{ backgroundColor: '#1a5c2a' }} />
          <p className="mt-4 text-gray-500 text-sm text-center max-w-xl">
            Restez informés des dernières nouvelles et activités de la Commune Urbaine de Pita.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="h-40 bg-gray-200 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* News grid */}
        {!loading && articles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article) => {
              const colors = getCategoryColor(article.category);
              return (
                <a
                  key={article._id}
                  href={`/actualites/${article.slug}`}
                  className="group flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  {/* Image */}
                  <div
                    className="h-40 flex items-center justify-center relative bg-cover bg-center"
                    style={{
                      backgroundColor: colors.bg,
                      backgroundImage: article.imageUrl ? `url(${article.imageUrl})` : 'none',
                    }}
                  >
                    {!article.imageUrl && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    )}
                    {/* Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span
                        className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded text-white shadow-md"
                        style={{ backgroundColor: colors.badge }}
                      >
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-3 p-4 flex-1">
                    <h3 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-[#1a5c2a] transition-colors line-clamp-3">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-xs text-gray-500 line-clamp-2">{article.excerpt}</p>
                    )}
                    {/* Date */}
                    <div className="mt-auto flex items-center gap-1.5 text-xs text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(article.createdAt || new Date().toISOString())}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && articles.length === 0 && (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-gray-400">Aucune actualité pour le moment</p>
          </div>
        )}

        {/* CTA */}
        {articles.length > 0 && (
          <div className="flex justify-center mt-10">
            <a
              href="/actualites"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-wider rounded border-2 transition-all hover:bg-green-50"
              style={{ borderColor: '#1a5c2a', color: '#1a5c2a' }}
            >
              Voir toutes les actualités
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}

      </div>
    </section>
  );
}
