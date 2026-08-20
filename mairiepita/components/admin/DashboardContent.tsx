'use client';

import { useEffect, useState } from 'react';
import { articlesService } from '@/lib/api/articles.service';

export default function DashboardContent() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    try {
      const data = await articlesService.getAll();
      setArticles(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-500">Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">❌ Erreur : {error}</p>
      </div>
    );
  }

  const published = articles.filter((a) => a.published).length;
  const drafts = articles.filter((a) => !a.published).length;
  const recent = [...articles]
    .sort((a, b) => new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime())
    .slice(0, 5);

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Articles publiés', value: published, icon: '📰', color: '#1a5c2a' },
          { label: 'Brouillons', value: drafts, icon: '📝', color: '#e65100' },
          { label: 'Total articles', value: articles.length, icon: '📊', color: '#1565c0' },
          { label: 'Catégories actives', value: new Set(articles.map((a) => a.category)).size, icon: '🏷️', color: '#6a1b9a' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <span className="text-3xl">{s.icon}</span>
            <div>
              <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Nouvel article', href: '/admin/actualites/new', icon: '✍️', desc: 'Rédiger et publier une actualité' },
          { label: 'Voir les actualités', href: '/admin/actualites', icon: '📋', desc: 'Gérer tous les articles' },
          { label: 'Voir le site', href: '/', icon: '🌐', desc: 'Accéder au portail public', external: true },
          { label: 'Mot du Maire', href: '/admin/mot-du-maire', icon: '👤', desc: 'Modifier le message du Maire' },
          { label: "Page d'accueil", href: '/admin/accueil', icon: '🏠', desc: "Paramètres de la page d'accueil" },
          { label: 'Utilisateurs', href: '/admin/utilisateurs', icon: '👥', desc: 'Gérer les comptes administrateurs' },
        ].map((action) => (
          <a
            key={action.label}
            href={action.href}
            target={action.external ? '_blank' : undefined}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-green-300 hover:shadow-md transition-all flex items-start gap-4 group"
          >
            <span className="text-2xl">{action.icon}</span>
            <div>
              <p className="font-bold text-gray-800 text-sm group-hover:text-green-700 transition-colors">{action.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{action.desc}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Recent articles */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-800">Articles récents</h2>
          <a href="/admin/actualites" className="text-xs font-semibold hover:underline" style={{ color: '#1a5c2a' }}>
            Voir tous →
          </a>
        </div>
        {recent.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            <p>📝 Aucun article pour le moment</p>
            <a href="/admin/actualites/new" className="text-green-700 hover:underline text-sm mt-2 inline-block">
              Créer le premier article
            </a>
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {recent.map((a) => (
              <li key={a.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${a.categoryColor}20` }}>
                  <span className="text-lg">📄</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{a.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {a.category} · {new Date(a.createdAt || a.date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <span
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                    a.published ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {a.published ? 'Publié' : 'Brouillon'}
                </span>
                <a
                  href={`/admin/actualites/${a.id}/edit`}
                  className="text-gray-400 hover:text-green-700 transition-colors flex-shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
