import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EvenementsList from '@/components/evenements/EvenementsList';

export const metadata = {
  title: 'Événements — Mairie de Pita',
  description: 'Calendrier des événements et activités de la Commune Urbaine de Pita.',
};

export default function EvenementsPage() {
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
            <span className="text-white">Événements</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
            Événements
          </h1>
          <p className="mt-2 text-white/80 text-sm max-w-xl">
            Découvrez le calendrier des événements et activités organisés par la Commune de Pita.
          </p>
        </div>
      </div>

      {/* Content */}
      <EvenementsList />

      <Footer />
    </main>
  );
}
