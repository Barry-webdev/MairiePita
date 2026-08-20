import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppelsOffresList from '@/components/appelsOffres/AppelsOffresList';

export const metadata = {
  title: 'Appels d\'offres — Mairie de Pita',
  description: 'Consultez les appels d\'offres et marchés publics de la Commune Urbaine de Pita.',
};

export default function AppelsOffresPage() {
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
            <span className="text-white">Appels d'offres</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
            Appels d'offres
          </h1>
          <p className="mt-2 text-white/80 text-sm max-w-xl">
            Consultez les appels d'offres et marchés publics lancés par la commune.
          </p>
        </div>
      </div>

      {/* Content */}
      <AppelsOffresList />

      <Footer />
    </main>
  );
}
