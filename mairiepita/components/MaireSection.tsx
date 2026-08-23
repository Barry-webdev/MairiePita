'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motMaireService } from '@/lib/api/motMaire.service';
import { articlesService } from '@/lib/api/articles.service';

interface MotMaire {
  nom: string;
  titre: string;
  messageCourt: string;
  signature: string;
}

interface FeaturedArticle {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt?: string;
  createdAt: string;
  imageUrl?: string;
}

function MairePhoto() {
  return (
    <div className="w-32 h-40 rounded-lg overflow-hidden relative" style={{ backgroundColor: '#e0e0e0' }}>
      <Image
        src="/maire.jpg"
        alt="Le Maire de Pita"
        fill
        className="object-cover object-top"
        sizes="128px"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    </div>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function MaireSection() {
  const [motMaire, setMotMaire] = useState<MotMaire | null>(null);
  const [featuredArticle, setFeaturedArticle] = useState<FeaturedArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      
      const maire = await motMaireService.get();
      if (maire) {
        setMotMaire(maire);
      }

      const articles = await articlesService.getAll({ published: true });
      if (articles.length > 0) {
        setFeaturedArticle(articles[0] as any);
      }
    } catch (err) {
      console.error('Erreur chargement:', err);
    } finally {
      setLoading(false);
    }
  }

  // Si rien à afficher, ne pas afficher la section
  if (!loading && !motMaire && !featuredArticle) {
    return null;
  }

  return (
    <section className="py-16 px-4" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ---- Left: Mot du Maire ---- */}
          {(loading || motMaire) && (
            <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col gap-6">
              <div>
                <h2 className="text-lg font-black uppercase tracking-widest" style={{ color: '#1a5c2a' }}>
                  Mot du Maire
                </h2>
                <div className="mt-1 h-1 w-16 rounded" style={{ backgroundColor: '#1a5c2a' }} />
              </div>

              {loading && (
                <div className="flex flex-col gap-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                </div>
              )}

              {!loading && motMaire && (
                <>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <MairePhoto />
                    </div>

                    <div className="flex flex-col gap-4">
                      <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">
                        {motMaire.messageCourt}
                      </p>

                      <p
                        className="italic text-base font-semibold"
                        style={{
                          fontFamily: 'Georgia, serif',
                          color: '#1a5c2a',
                        }}
                      >
                        — {motMaire.signature}
                      </p>
                    </div>
                  </div>

                  <div>
                    <a
                      href="/la-commune/mot-du-maire"
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold uppercase tracking-wider rounded border-2 transition-all hover:bg-green-50"
                      style={{ borderColor: '#1a5c2a', color: '#1a5c2a' }}
                    >
                      Lire la suite
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ---- Right: À la Une ---- */}
          {(loading || featuredArticle) && (
            <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black uppercase tracking-widest" style={{ color: '#1a5c2a' }}>
                    À la Une
                  </h2>
                  <div className="mt-1 h-1 w-16 rounded" style={{ backgroundColor: '#d4a017' }} />
                </div>
              </div>

              {loading && (
                <div className="flex flex-col gap-4">
                  <div className="w-full h-44 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              )}

              {!loading && featuredArticle && (
                <a href={`/actualites/${featuredArticle.slug}`} className="group flex flex-col gap-4 hover:opacity-95 transition-opacity">
                  <div
                    className="w-full h-44 rounded-lg flex items-center justify-center relative overflow-hidden bg-cover bg-center"
                    style={{
                      backgroundColor: '#2d7a3a',
                      backgroundImage: featuredArticle.imageUrl ? `url(${featuredArticle.imageUrl})` : 'none',
                    }}
                  >
                    {!featuredArticle.imageUrl && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    )}

                    <div className="absolute top-3 left-3">
                      <span
                        className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded text-white shadow-md"
                        style={{ backgroundColor: '#1a5c2a' }}
                      >
                        {featuredArticle.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3
                      className="font-bold text-base leading-snug group-hover:underline"
                      style={{ color: '#1a5c2a' }}
                    >
                      {featuredArticle.title}
                    </h3>
                    {featuredArticle.excerpt && (
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {featuredArticle.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(featuredArticle.createdAt)}
                    </div>
                  </div>
                </a>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
