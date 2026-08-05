import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Délibérations — Conseil Communal — Mairie de Pita' };

export default function DeliberationsPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <div className="py-12 px-4 text-white" style={{ backgroundColor: '#1a5c2a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <a href="/" className="hover:text-white">Accueil</a><span>/</span>
            <a href="/conseil-communal" className="hover:text-white">Conseil Communal</a><span>/</span>
            <span className="text-white">Délibérations</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">Délibérations</h1>
        </div>
      </div>
      <section className="py-16 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
          <span className="text-6xl">📄</span>
          <h2 className="text-xl font-black text-gray-800">Consulter les délibérations</h2>
          <p className="text-gray-600 leading-relaxed">Les délibérations du Conseil Communal sont disponibles dans la section Documents. Vous y trouverez les procès-verbaux et délibérations classés par session.</p>
          <a href="/documents" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white rounded-lg transition-all hover:brightness-110" style={{ backgroundColor: '#1a5c2a' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Accéder aux documents
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
