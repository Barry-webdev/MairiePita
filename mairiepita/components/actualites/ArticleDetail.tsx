'use client';

import { useEffect, useState } from 'react';
import { articlesService } from '@/lib/api/articles.service';

// Couleurs par catégorie
const CATEGORY_COLORS: { [key: string]: string } = {
  'Environnement': '#10b981',
  'Éducation': '#3b82f6',
  'Santé': '#ef4444',
  'Infrastructure': '#f59e0b',
  'Événement': '#8b5cf6',
  'Annonce': '#ec4899',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

interface ArticleDetailProps {
  slug: string;
}

export default function ArticleDetail({ slug }: ArticleDetailProps) {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true);
        const data = await articlesService.getBySlug(slug);
        setArticle(data);
      } catch (err) {
        console.error('Erreur lors du chargement de l\'article:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

  // État de chargement
  if (loading) {
    return (
      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Erreur ou article non trouvé
  if (error || !article) {
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
              Article introuvable
            </h2>
            <p className="text-gray-500 mb-6">
              L'article que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <a
              href="/actualites"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-lg transition-colors"
              style={{ backgroundColor: '#1a5c2a' }}
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Retour aux actualités
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-gray-700 transition-colors">
            Accueil
          </a>
          <span>/</span>
          <a href="/actualites" className="hover:text-gray-700 transition-colors">
            Actualités
          </a>
          <span>/</span>
          <span className="text-gray-700 font-medium">{article.title}</span>
        </div>

        {/* Article card */}
        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header avec image de couverture */}
          <div
            className="h-72 flex items-center justify-center relative"
            style={{ backgroundColor: CATEGORY_COLORS[article.category] || '#6b7280' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-white/20"
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

            {/* Category badge */}
            <div className="absolute bottom-6 left-6">
              <span
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded text-white"
                style={{ backgroundColor: CATEGORY_COLORS[article.category] || '#6b7280' }}
              >
                {article.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Titre */}
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Meta info */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formatDate(article.createdAt)}
              </div>
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Mairie de Pita
              </div>
            </div>

            {/* Excerpt (chapeau) */}
            <div className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                {article.excerpt}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div
                className="text-gray-700 leading-relaxed"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {article.content}
              </div>
            </div>
          </div>
        </article>

        {/* Bouton retour */}
        <div className="mt-8 text-center">
          <a
            href="/actualites"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-lg transition-all hover:shadow-md"
            style={{ backgroundColor: '#1a5c2a' }}
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
            Retour aux actualités
          </a>
        </div>
      </div>
    </section>
  );
}
