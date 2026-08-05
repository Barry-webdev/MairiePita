import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'La Commune — Mairie de Pita' };

export default function LaCommunePage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <div className="py-12 px-4 text-white" style={{ backgroundColor: '#1a5c2a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <a href="/" className="hover:text-white transition-colors">Accueil</a>
            <span>/</span>
            <span className="text-white">La Commune</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">Présentation de la Commune</h1>
          <p className="mt-2 text-sm max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>Découvrez la Commune Urbaine de Pita, au cœur du Fouta Djallon guinéen.</p>
        </div>
      </div>

      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto flex flex-col gap-12">

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Population', value: '~50 000 hab.', icon: '👥' },
              { label: 'Superficie', value: '1 440 km²', icon: '🗺️' },
              { label: 'Altitude', value: '1 100 m', icon: '⛰️' },
              { label: 'Fondée', value: '1954', icon: '🏛️' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center gap-2">
                <span className="text-3xl">{s.icon}</span>
                <span className="text-xl font-black" style={{ color: '#1a5c2a' }}>{s.value}</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Présentation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-black uppercase tracking-wide mb-5" style={{ color: '#1a5c2a' }}>Présentation générale</h2>
            <div className="flex flex-col gap-4 text-gray-700 leading-relaxed text-sm">
              <p>La Commune Urbaine de Pita est située dans la Région Administrative de Labé, au cœur du massif du Fouta Djallon, en République de Guinée. Perchée à une altitude moyenne de 1 100 mètres, elle bénéficie d&apos;un climat tempéré et agréable qui contraste avec la chaleur des plaines côtières.</p>
              <p>Riche de ses traditions Peulh séculaires et de sa biodiversité remarquable, Pita est reconnue pour l&apos;excellence de ses productions agricoles — notamment les pommes de terre, le maïs et les fruits tropicaux — ainsi que pour la beauté de ses paysages montagneux qui attirent chaque année de nombreux visiteurs.</p>
            </div>
          </div>

          {/* Atouts */}
          <div>
            <h2 className="text-xl font-black uppercase tracking-wide mb-5" style={{ color: '#1a5c2a' }}>Nos atouts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: '🌾', title: 'Agriculture', desc: 'Terres fertiles du Fouta Djallon : pommes de terre, maïs, fruits et légumes de haute qualité.' },
                { icon: '🏔️', title: 'Tourisme', desc: 'Paysages montagneux, chutes d\'eau, randonnées et découverte de la culture Peulh authentique.' },
                { icon: '🛒', title: 'Commerce', desc: 'Carrefour économique de la région avec des marchés animés et une activité commerciale dynamique.' },
              ].map((a) => (
                <div key={a.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-3">
                  <span className="text-4xl">{a.icon}</span>
                  <h3 className="font-black text-base uppercase tracking-wide" style={{ color: '#1a5c2a' }}>{a.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation sub-pages */}
          <div>
            <h2 className="text-xl font-black uppercase tracking-wide mb-5" style={{ color: '#1a5c2a' }}>En savoir plus</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { href: '/la-commune/geographie', icon: '🗺️', title: 'Géographie', desc: 'Localisation, relief, climat et limites administratives.' },
                { href: '/la-commune/histoire', icon: '📜', title: 'Histoire', desc: 'De la création en 1954 à nos jours.' },
                { href: '/la-commune/mot-du-maire', icon: '🏅', title: 'Mot du Maire', desc: 'Le message et les engagements du Maire.' },
              ].map((item) => (
                <a key={item.title} href={item.href} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-3 hover:border-green-300 hover:shadow-md transition-all">
                  <span className="text-3xl">{item.icon}</span>
                  <h3 className="font-black text-base" style={{ color: '#1a5c2a' }}>{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  <span className="text-xs font-bold flex items-center gap-1 mt-auto" style={{ color: '#d4a017' }}>
                    Découvrir
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
