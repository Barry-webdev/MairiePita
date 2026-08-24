import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Histoire — La Commune — Mairie de Pita' };

const timeline = [
  { year: '1954', title: 'Création de la commune', desc: 'Création officielle de la commune de Pita sous l\'administration coloniale française.' },
  { year: '1958', title: 'Indépendance de la Guinée', desc: 'La Guinée accède à l\'indépendance. Pita devient une commune de la République de Guinée.' },
  { year: '1970', title: 'Développement des infrastructures', desc: 'Lancement des premiers grands projets d\'infrastructures locales : routes, écoles et centres de santé.' },
  { year: '1984', title: 'Réorganisation administrative', desc: 'Réforme administrative nationale. Pita est confirmée comme commune urbaine de la région de Mamou.' },
  { year: '2000', title: 'Décentralisation', desc: 'Renforcement de l\'autonomie des communes. Mise en place d\'un conseil communal élu.' },
  { year: '2024', title: 'Modernisation numérique', desc: 'Lancement du portail web officiel et digitalisation des services administratifs.' },
];

export default function HistoirePage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <div className="py-12 px-4 text-white" style={{ backgroundColor: '#1a5c2a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <a href="/" className="hover:text-white">Accueil</a><span>/</span>
            <a href="/la-commune" className="hover:text-white">La Commune</a><span>/</span>
            <span className="text-white">Histoire</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">Histoire de Pita</h1>
          <p className="mt-2 text-sm max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>De la création en 1954 à nos jours — retour sur les grandes étapes de la commune.</p>
        </div>
      </div>

      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-4xl mx-auto flex flex-col gap-10">

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-black uppercase tracking-wide mb-8" style={{ color: '#1a5c2a' }}>Chronologie</h2>
            <div className="relative flex flex-col gap-0">
              {/* Vertical line */}
              <div className="absolute left-16 top-0 bottom-0 w-0.5" style={{ backgroundColor: '#1a5c2a', opacity: 0.2 }} />
              {timeline.map((item, i) => (
                <div key={item.year} className="flex gap-6 pb-8 last:pb-0 relative">
                  {/* Year badge */}
                  <div className="flex-shrink-0 w-14 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black z-10 relative" style={{ backgroundColor: i === timeline.length - 1 ? '#d4a017' : '#1a5c2a' }}>
                      {item.year.slice(2)}
                    </div>
                    <span className="text-xs font-black mt-1" style={{ color: '#1a5c2a' }}>{item.year}</span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="font-black text-sm text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patrimoine culturel */}
          <div>
            <h2 className="text-lg font-black uppercase tracking-wide mb-5" style={{ color: '#1a5c2a' }}>Patrimoine culturel</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { 
                  icon: <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>, 
                  title: 'Traditions Peulh', 
                  desc: 'La commune est le cœur de la culture Peulh, avec ses cérémonies, contes, musiques et danses traditionnelles transmises de génération en génération.' 
                },
                { 
                  icon: <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>, 
                  title: 'Architecture traditionnelle', 
                  desc: 'L\'habitat traditionnel du Fouta Djallon, avec ses cases rondes et ses greniers, témoigne d\'un savoir-faire architectural ancestral.' 
                },
                { 
                  icon: <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>, 
                  title: 'Artisanat local', 
                  desc: 'Tissage, poterie, maroquinerie et bijouterie : les artisans de Pita perpétuent des techniques séculaires reconnues dans toute la Guinée.' 
                },
              ].map((c) => (
                <div key={c.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-3">
                  {c.icon}
                  <h3 className="font-black text-sm uppercase tracking-wide" style={{ color: '#1a5c2a' }}>{c.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
