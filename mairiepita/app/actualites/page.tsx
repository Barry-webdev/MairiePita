import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ActualitesList from '@/components/actualites/ActualitesList';

export const metadata = {
  title: 'Actualités — Mairie de Pita',
  description: 'Retrouvez toutes les actualités et informations officielles de la Commune Urbaine de Pita.',
};

export default function ActualitesPage() {
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
            <span className="text-white">Actualités</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
            Actualités
          </h1>
          <p className="mt-2 text-white/80 text-sm max-w-xl">
            Toutes les informations officielles, annonces et événements de la Commune Urbaine de Pita.
          </p>
        </div>
      </div>

      {/* Content */}
      <ActualitesList />

      <Footer />
    </main>
  );
}
