import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalerieGrid from '@/components/galerie/GalerieGrid';

export const metadata = {
  title: 'Galerie Photo & Vidéo - Mairie de Pita',
  description: 'Découvrez les photos et vidéos de la commune de Pita',
};

export default function GaleriePage() {
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
            <a href="/la-commune" className="hover:text-white transition-colors">La Commune</a>
            <span>/</span>
            <span className="text-white">Galerie</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
            Galerie Photo & Vidéo
          </h1>
          <p className="mt-2 text-white/80 text-sm max-w-xl">
            Découvrez les moments marquants de la vie de notre commune à travers nos photos et vidéos
          </p>
        </div>
      </div>

      {/* Galerie Grid */}
      <GalerieGrid />

      <Footer />
    </main>
  );
}
