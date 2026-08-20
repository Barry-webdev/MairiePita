import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArticleDetail from '@/components/actualites/ArticleDetail';

export default async function ActualiteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main>
      <TopBar />
      <Navbar />
      <ArticleDetail slug={slug} />
      <Footer />
    </main>
  );
}
