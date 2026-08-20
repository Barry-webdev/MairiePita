import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DocumentsList from '@/components/documents/DocumentsList';
export const metadata = {
  title: 'Documents — Mairie de Pita',
  description: 'Documents administratifs et officiels de la Commune Urbaine de Pita.',
};

export default function DocumentsPage() {
  return (
    <main>
      <TopBar />
      <Navbar />

      {/* Hero banner */}
      <div
        className="py-12 px-4 text-white"
        style={{ backgroundColor: '#1a5c2a' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-3">
            <a href="/" className="hover:text-white transition-colors">Accueil</a>
            <span>/</span>
            <span className="text-white">Documents</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
            Documents
          </h1>
          <p className="mt-2 text-white/80 text-sm max-w-xl">
            Téléchargez les documents administratifs et officiels de la commune.
          </p>
        </div>
      </div>

      {/* Content */}
      <DocumentsList />

      <Footer />
    </main>
  );
}
