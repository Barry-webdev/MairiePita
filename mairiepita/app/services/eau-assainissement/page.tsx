import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Eau & Assainissement — Services — Mairie de Pita' };

const projets = [
  { title: 'Nouveau château d\'eau — Koliady', status: 'En cours', progress: 65, desc: 'Construction d\'un château d\'eau d\'une capacité de 500m³ pour desservir plus de 2 000 habitants.' },
  { title: 'Extension du réseau AEP', status: 'En cours', progress: 40, desc: 'Extension du réseau d\'adduction d\'eau potable vers les quartiers périphériques de Pita.' },
  { title: 'Assainissement des eaux usées', status: 'Planifié', progress: 10, desc: 'Construction de caniveaux et d\'un système d\'assainissement pour le centre-ville.' },
];

export default function EauAssainissementPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <div className="py-12 px-4 text-white" style={{ backgroundColor: '#1a5c2a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <a href="/" className="hover:text-white">Accueil</a><span>/</span>
            <span className="text-white">Services — Eau & Assainissement</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">Eau & Assainissement</h1>
          <p className="mt-2 text-sm max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>État du réseau d&apos;eau potable et projets d&apos;assainissement en cours.</p>
        </div>
      </div>
      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-4xl mx-auto flex flex-col gap-8">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Accès à l\'eau', value: '62%', icon: '💧' },
              { label: 'Ménages desservis', value: '8 200', icon: '🏘️' },
              { label: 'Points d\'eau', value: '47', icon: '🚰' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col items-center text-center gap-2">
                <span className="text-3xl">{s.icon}</span>
                <span className="text-2xl font-black" style={{ color: '#1a5c2a' }}>{s.value}</span>
                <span className="text-xs text-gray-500">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Projets */}
          <div>
            <h2 className="text-lg font-black uppercase tracking-wide mb-5" style={{ color: '#1a5c2a' }}>Projets en cours</h2>
            <div className="flex flex-col gap-4">
              {projets.map((p) => (
                <div key={p.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-sm text-gray-800">{p.title}</h3>
                    <span className="px-2.5 py-1 text-xs font-bold rounded-full text-white" style={{ backgroundColor: p.status === 'En cours' ? '#1a5c2a' : '#d4a017' }}>{p.status}</span>
                  </div>
                  <p className="text-sm text-gray-600">{p.desc}</p>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs text-gray-500"><span>Avancement</span><span className="font-bold" style={{ color: '#1a5c2a' }}>{p.progress}%</span></div>
                    <div className="w-full h-2 rounded-full bg-gray-200"><div className="h-2 rounded-full" style={{ width: `${p.progress}%`, backgroundColor: '#1a5c2a' }} /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-center gap-4">
            <span className="text-4xl">🚨</span>
            <div className="flex-1"><h3 className="font-black text-sm" style={{ color: '#1a5c2a' }}>Signaler un problème</h3><p className="text-sm text-gray-600 mt-1">Fuite, coupure d&apos;eau ou problème d&apos;assainissement ? Contactez-nous.</p></div>
            <a href="/contact" className="px-6 py-2.5 text-sm font-bold text-white rounded-lg transition-all hover:brightness-110 flex-shrink-0" style={{ backgroundColor: '#1a5c2a' }}>Signaler</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
