'use client';

import { useEffect, useState } from 'react';
import { articlesService, type Article } from '@/lib/api/articles.service';
import ArticleForm from './ArticleForm';

interface Props {
  articleId: string;
}

export default function ArticleEditContent({ articleId }: Props) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadArticle();
  }, [articleId]);

  async function loadArticle() {
    try {
      setLoading(true);
      const data = await articlesService.getById(articleId);
      setArticle(data);
    } catch (err: any) {
      setError(err.message || 'Article introuvable');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-500">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <p className="text-red-700 text-center mb-4">
            {error || 'Article introuvable'}
          </p>
          <a
            href="/admin/actualites"
            className="block text-center text-sm text-red-700 hover:underline"
          >
            Retour à la liste
          </a>
        </div>
      </div>
    );
  }

  return <ArticleForm mode="edit" initialData={article} articleId={articleId} />;
}
