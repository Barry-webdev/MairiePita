import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Urbanisme — Services — Mairie de Pita' };

const services = [
  { icon: '🏗️', title: 'Permis de construire', desc: 'Autorisation obligatoire pour toute nouvelle construction ou extension de bâtiment sur le territoire communal.' },
  { icon: '📋', title: 'Certificat d\'urbanisme', desc: 'Document indiquant les règles d\'urbanisme applicables à un terrain donné.' },
  { icon: '🗺️', title: 'Plan de lotissement', desc: 'Demande de division d\'un terrain en plusieurs lots constructibles.' },
  { icon: '🔨', title: 'Autorisation de démolir', desc: 'Autorisation préalable requise pour la démolition totale ou partielle d\'un bâtiment.' },
];

export default function UrbanismePage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <div className="py-12 px-4 text-white" style={{ backgroundColor: '#1a5c2a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <a href="/" className="hover:text-white">Accueil</a><span>/</span>
            <span className="text-white">Services — Urbanisme</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">Urbanisme</h1>
          <p className="mt-2 text-sm max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>Permis, autorisations et planification urbaine de la Commune de Pita.</p>
        </div>
      </div>
      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-3">
                <span className="text-4xl">{s.icon}</span>
                <h3 className="font-black text-base" style={{ color: '#1a5c2a' }}>{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{s.desc}</p>
                <a href="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2 rounded-lg w-fit transition-all hover:brightness-110" style={{ backgroundColor: '#1a5c2a' }}>Faire une demande</a>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-center gap-4">
            <span className="text-4xl">📞</span>
            <div className="flex-1"><h3 className="font-black text-sm" style={{ color: '#1a5c2a' }}>Service Urbanisme</h3><p className="text-sm text-gray-600 mt-1">Mairie de Pita — Bureau n°3 | Lun-Ven 08h-17h | +224 123 45 67 89</p></div>
            <a href="/contact" className="px-6 py-2.5 text-sm font-bold text-white rounded-lg transition-all hover:brightness-110 flex-shrink-0" style={{ backgroundColor: '#1a5c2a' }}>Nous contacter</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
