import ArticleForm from '@/components/admin/ArticleForm';
import AdminHeader from '@/components/admin/AdminHeader';
import { mockArticles } from '@/lib/mockData';

export const metadata = {
  title: 'Modifier un article — Administration Mairie de Pita',
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const article = mockArticles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <p className="text-lg font-semibold">Article introuvable</p>
        <a href="/admin/actualites" className="mt-4 text-sm text-green-700 hover:underline">
          Retour à la liste
        </a>
      </div>
    );
  }

  return (
    <>
      <AdminHeader
        title="Modifier l'article"
        subtitle={article.title}
        action={
          <a
            href="/admin/actualites"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </a>
        }
      />
      <ArticleForm mode="edit" initialData={article} />
    </>
  );
}
