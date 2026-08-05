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
  { title: 'Commission des Finances', icon: '💰', desc: 'Examen et suivi du budget communal, des recettes et des dépenses.' },
  { title: 'Commission Urbanisme & Travaux', icon: '🏗️', desc: 'Planification urbaine, travaux publics et gestion du patrimoine communal.' },
  { title: 'Commission Sociale & Culturelle', icon: '🎭', desc: 'Affaires sociales, éducation, santé, culture et sport.' },
  { title: 'Commission Agriculture & Environnement', icon: '🌿', desc: 'Développement agricole, protection de l\'environnement et gestion des ressources naturelles.' },
  { title: 'Commission Sécurité & Justice', icon: '⚖️', desc: 'Ordre public, médiation des conflits et relations avec les services de sécurité.' },
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
              { label: 'Conseillers', value: '33', icon: '👥' },
              { label: 'Commissions', value: '5', icon: '📋' },
              { label: 'Sessions/an', value: '4', icon: '📅' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center gap-2">
                <span className="text-3xl">{s.icon}</span>
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
                  <span className="text-3xl">{c.icon}</span>
                  <h3 className="font-black text-sm" style={{ color: '#1a5c2a' }}>{c.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="/conseil-communal/deliberations" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:border-green-300 hover:shadow-md transition-all">
              <span className="text-3xl">📄</span>
              <div>
                <h3 className="font-black text-sm" style={{ color: '#1a5c2a' }}>Délibérations</h3>
                <p className="text-xs text-gray-500 mt-0.5">Consulter les délibérations du Conseil</p>
              </div>
            </a>
            <a href="/conseil-communal/seances" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:border-green-300 hover:shadow-md transition-all">
              <span className="text-3xl">📅</span>
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
