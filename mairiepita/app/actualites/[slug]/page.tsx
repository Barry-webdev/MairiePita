import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockArticles } from '@/lib/mockData';
import Link from 'next/link';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export async function generateStaticParams() {
  return mockArticles
    .filter((a) => a.published)
    .map((a) => ({ slug: a.slug }));
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = mockArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main>
        <TopBar />
        <Navbar />
        <div className="py-12 px-4 text-white" style={{ backgroundColor: '#1a5c2a' }}>
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-black uppercase tracking-wide">Article introuvable</h1>
          </div>
        </div>
        <div className="py-20 px-4 text-center" style={{ backgroundColor: '#f5f5f5' }}>
          <p className="text-gray-600 mb-6">L&apos;article que vous recherchez n&apos;existe pas ou a été supprimé.</p>
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-lg"
            style={{ backgroundColor: '#1a5c2a' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux actualités
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const otherArticles = mockArticles
    .filter((a) => a.published && a.id !== article.id)
    .slice(0, 4);

  const allCategories = [...new Set(mockArticles.filter((a) => a.published).map((a) => a.category))];

  return (
    <main>
      <TopBar />
      <Navbar />

      {/* Green banner */}
      <div className="py-12 px-4 text-white" style={{ backgroundColor: '#1a5c2a' }}>
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'rgba(255,255,255,0.75)' }}>
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/actualites" className="hover:text-white transition-colors">Actualités</Link>
            <span>/</span>
            <span className="text-white line-clamp-1">{article.title}</span>
          </div>
          {/* Category badge */}
          <div className="mb-3">
            <span
              className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded text-white"
              style={{ backgroundColor: article.categoryColor }}
            >
              {article.category}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black leading-tight max-w-3xl">
            {article.title}
          </h1>
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(article.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {article.author}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Image placeholder */}
              <div
                className="w-full h-64 rounded-xl flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: article.imageBg }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" style={{ color: 'rgba(255,255,255,0.2)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="absolute bottom-4 left-4">
                  <span
                    className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded text-white"
                    style={{ backgroundColor: article.categoryColor }}
                  >
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Article body */}
              <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <p className="text-gray-700 leading-relaxed text-base">
                  {article.content}
                </p>
                <p className="text-gray-700 leading-relaxed text-base mt-4">
                  La Mairie de Pita s&apos;engage à informer régulièrement les citoyens des avancées et des décisions prises dans l&apos;intérêt de la commune. Pour tout renseignement complémentaire, n&apos;hésitez pas à contacter nos services.
                </p>
                <p className="text-gray-700 leading-relaxed text-base mt-4">
                  Nous restons à votre écoute et disponibles pour répondre à vos questions et préoccupations concernant le développement de notre commune.
                </p>
              </div>

              {/* Back button */}
              <div className="mt-6">
                <Link
                  href="/actualites"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg border-2 transition-all hover:bg-green-50"
                  style={{ borderColor: '#1a5c2a', color: '#1a5c2a' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Retour aux actualités
                </Link>
              </div>
            </div>

            {/* Right sidebar */}
            <aside className="hidden lg:flex flex-col gap-6 w-80 flex-shrink-0">
              {/* Recent articles */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100" style={{ backgroundColor: '#1a5c2a' }}>
                  <h3 className="font-bold text-sm text-white uppercase tracking-wider">Articles récents</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {otherArticles.map((a) => (
                    <Link key={a.id} href={`/actualites/${a.slug}`} className="block px-5 py-4 hover:bg-green-50 transition-colors group">
                      <div className="mb-1">
                        <span
                          className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded text-white"
                          style={{ backgroundColor: a.categoryColor }}
                        >
                          {a.category}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-[#1a5c2a] leading-snug line-clamp-2 mt-1">
                        {a.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{formatDate(a.date)}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100" style={{ backgroundColor: '#1a5c2a' }}>
                  <h3 className="font-bold text-sm text-white uppercase tracking-wider">Catégories</h3>
                </div>
                <div className="p-5 flex flex-wrap gap-2">
                  {allCategories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/actualites?category=${encodeURIComponent(cat)}`}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all hover:border-green-600 hover:text-green-700"
                      style={{ borderColor: '#d1d5db', color: '#374151' }}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
