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
              { 
                label: 'Population', 
                value: '~50 000 hab.', 
                icon: <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              },
              { 
                label: 'Superficie', 
                value: '1 440 km²', 
                icon: <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              },
              { 
                label: 'Altitude', 
                value: '1 100 m', 
                icon: <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              },
              { 
                label: 'Fondée', 
                value: '1954', 
                icon: <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center gap-2">
                {s.icon}
                <span className="text-xl font-black" style={{ color: '#1a5c2a' }}>{s.value}</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Présentation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-black uppercase tracking-wide mb-5" style={{ color: '#1a5c2a' }}>Présentation générale</h2>
            <div className="flex flex-col gap-4 text-gray-700 leading-relaxed text-sm">
              <p>La Commune Urbaine de Pita est située dans la Région Administrative de Mamou, au cœur du massif du Fouta Djallon, en République de Guinée. Perchée à une altitude moyenne de 1 100 mètres, elle bénéficie d'un climat tempéré et agréable qui contraste avec la chaleur des plaines côtières.</p>
              <p>Riche de ses traditions Peulh séculaires et de sa biodiversité remarquable, Pita est reconnue pour l&apos;excellence de ses productions agricoles — notamment les pommes de terre, le maïs et les fruits tropicaux — ainsi que pour la beauté de ses paysages montagneux qui attirent chaque année de nombreux visiteurs.</p>
            </div>
          </div>

          {/* Atouts */}
          <div>
            <h2 className="text-xl font-black uppercase tracking-wide mb-5" style={{ color: '#1a5c2a' }}>Nos atouts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { 
                  icon: <svg className="w-12 h-12 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>, 
                  title: 'Agriculture', 
                  desc: 'Terres fertiles du Fouta Djallon : pommes de terre, maïs, fruits et légumes de haute qualité.' 
                },
                { 
                  icon: <svg className="w-12 h-12 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>, 
                  title: 'Tourisme', 
                  desc: 'Paysages montagneux, chutes d\'eau, randonnées et découverte de la culture Peulh authentique.' 
                },
                { 
                  icon: <svg className="w-12 h-12 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>, 
                  title: 'Commerce', 
                  desc: 'Carrefour économique de la région avec des marchés animés et une activité commerciale dynamique.' 
                },
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
                { 
                  href: '/la-commune/geographie', 
                  icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>, 
                  title: 'Géographie', 
                  desc: 'Localisation, relief, climat et limites administratives.' 
                },
                { 
                  href: '/la-commune/histoire', 
                  icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>, 
                  title: 'Histoire', 
                  desc: 'De la création en 1954 à nos jours.' 
                },
                { 
                  href: '/la-commune/mot-du-maire', 
                  icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>, 
                  title: 'Mot du Maire', 
                  desc: 'Le message et les engagements du Maire.' 
                },
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
