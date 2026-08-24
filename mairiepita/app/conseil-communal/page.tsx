import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Conseil Communal — Mairie de Pita' };

const members = [
  { name: 'Alpha Diallo', role: 'Président du Conseil', commission: 'Bureau', initials: 'AD', color: '#1a5c2a' },
  { name: 'Mariama Bah', role: 'Vice-Présidente', commission: 'Bureau', initials: 'MB', color: '#2d7a3a' },
  { name: 'Ibrahima Sow', role: 'Conseiller', commission: 'Finances', initials: 'IS', color: '#1565c0' },
  { name: 'Fatoumata Barry', role: 'Conseillère', commission: 'Social & Culture', initials: 'FB', color: '#6a1b9a' },
  { name: 'Mamadou Baldé', role: 'Conseiller', commission: 'Travaux', initials: 'MB', color: '#e65100' },
  { name: 'Aissatou Diallo', role: 'Conseillère', commission: 'Environnement', initials: 'AD', color: '#388e3c' },
  { name: 'Oumar Camara', role: 'Conseiller', commission: 'Sécurité', initials: 'OC', color: '#b71c1c' },
  { name: 'Kadiatou Bah', role: 'Conseillère', commission: 'Finances', initials: 'KB', color: '#00695c' },
];

const commissions = [
  { 
    title: 'Commission des Finances', 
    icon: <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>, 
    desc: 'Examen et suivi du budget communal, des recettes et des dépenses.' 
  },
  { 
    title: 'Commission Urbanisme & Travaux', 
    icon: <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>, 
    desc: 'Planification urbaine, travaux publics et gestion du patrimoine communal.' 
  },
  { 
    title: 'Commission Sociale & Culturelle', 
    icon: <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>, 
    desc: 'Affaires sociales, éducation, santé, culture et sport.' 
  },
  { 
    title: 'Commission Agriculture & Environnement', 
    icon: <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>, 
    desc: 'Développement agricole, protection de l\'environnement et gestion des ressources naturelles.' 
  },
  { 
    title: 'Commission Sécurité & Justice', 
    icon: <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>, 
    desc: 'Ordre public, médiation des conflits et relations avec les services de sécurité.' 
  },
];

export default function ConseilCommunalPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <div className="py-12 px-4 text-white" style={{ backgroundColor: '#1a5c2a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <a href="/" className="hover:text-white">Accueil</a><span>/</span>
            <span className="text-white">Conseil Communal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">Conseil Communal</h1>
          <p className="mt-2 text-sm max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>Composition, commissions et fonctionnement du Conseil Communal de Pita.</p>
        </div>
      </div>

      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto flex flex-col gap-12">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { 
                label: 'Conseillers', 
                value: '33', 
                icon: <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              },
              { 
                label: 'Commissions', 
                value: '5', 
                icon: <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              },
              { 
                label: 'Sessions/an', 
                value: '4', 
                icon: <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center gap-2">
                {s.icon}
                <span className="text-3xl font-black" style={{ color: '#1a5c2a' }}>{s.value}</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Members */}
          <div>
            <h2 className="text-xl font-black uppercase tracking-wide mb-5" style={{ color: '#1a5c2a' }}>Composition du Conseil</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {members.map((m) => (
                <div key={m.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col items-center text-center gap-3">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-base" style={{ backgroundColor: m.color }}>
                    {m.initials}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-800">{m.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{m.role}</p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 text-xs font-semibold rounded-full text-white" style={{ backgroundColor: m.color }}>
                      {m.commission}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commissions */}
          <div>
            <h2 className="text-xl font-black uppercase tracking-wide mb-5" style={{ color: '#1a5c2a' }}>Les Commissions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {commissions.map((c) => (
                <div key={c.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-3">
                  {c.icon}
                  <h3 className="font-black text-sm" style={{ color: '#1a5c2a' }}>{c.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="/conseil-communal/deliberations" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:border-green-300 hover:shadow-md transition-all">
              <svg className="w-10 h-10 text-[#1a5c2a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <h3 className="font-black text-sm" style={{ color: '#1a5c2a' }}>Délibérations</h3>
                <p className="text-xs text-gray-500 mt-0.5">Consulter les délibérations du Conseil</p>
              </div>
            </a>
            <a href="/conseil-communal/seances" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:border-green-300 hover:shadow-md transition-all">
              <svg className="w-10 h-10 text-[#1a5c2a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <h3 className="font-black text-sm" style={{ color: '#1a5c2a' }}>Séances</h3>
                <p className="text-xs text-gray-500 mt-0.5">Calendrier et compte-rendus des séances</p>
              </div>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
