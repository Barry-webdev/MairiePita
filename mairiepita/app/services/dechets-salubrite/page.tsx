import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Déchets & Salubrité — Services — Mairie de Pita' };

const calendrier = [
  { jour: 'Lundi', zone: 'Quartier Centre & Daremagnan', heure: '06h00 - 09h00' },
  { jour: 'Mardi', zone: 'Quartier Koliady & Hamdallaye', heure: '06h00 - 09h00' },
  { jour: 'Mercredi', zone: 'Quartier Gbérédou & Soyah', heure: '06h00 - 09h00' },
  { jour: 'Jeudi', zone: 'Marché central & environs', heure: '05h00 - 08h00' },
  { jour: 'Vendredi', zone: 'Quartier Badiyah & extensions', heure: '06h00 - 09h00' },
  { jour: 'Samedi', zone: 'Tous les quartiers (collecte spéciale)', heure: '07h00 - 11h00' },
];

export default function DechetsSalubritePage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <div className="py-12 px-4 text-white" style={{ backgroundColor: '#1a5c2a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <a href="/" className="hover:text-white">Accueil</a><span>/</span>
            <span className="text-white">Services — Déchets & Salubrité</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">Déchets & Salubrité</h1>
          <p className="mt-2 text-sm max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>Calendrier de collecte, règles de tri et signalement des problèmes.</p>
        </div>
      </div>
      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100"><h2 className="font-black uppercase tracking-wide text-sm" style={{ color: '#1a5c2a' }}>Calendrier de collecte des déchets</h2></div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead style={{ backgroundColor: '#f9fafb' }}>
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Jour</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Zone</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Horaire</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {calendrier.map((r) => (
                    <tr key={r.jour} className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-semibold" style={{ color: '#1a5c2a' }}>{r.jour}</td>
                      <td className="px-5 py-3 text-gray-600">{r.zone}</td>
                      <td className="px-5 py-3 text-gray-600 whitespace-nowrap">{r.heure}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-black uppercase tracking-wide text-sm mb-4" style={{ color: '#1a5c2a' }}>Règles à respecter</h2>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-600">
              {['Sortir les poubelles la veille au soir ou tôt le matin du jour de collecte', 'Utiliser des sacs hermétiques pour éviter la dispersion des déchets', 'Ne pas déposer de déchets en dehors des points de collecte désignés', 'Séparer les déchets organiques des déchets secs', 'Signaler tout dépôt sauvage à la mairie', 'Participer aux journées de salubrité organisées par la commune', 'Respecter les espaces verts et éviter de brûler les ordures'].map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: '#1a5c2a' }}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-center gap-4">
            <span className="text-4xl">🚨</span>
            <div className="flex-1 text-center sm:text-left"><h3 className="font-black text-sm" style={{ color: '#1a5c2a' }}>Signaler un problème</h3><p className="text-sm text-gray-600 mt-1">Dépôt sauvage, voirie non collectée ? Contactez-nous immédiatement.</p></div>
            <a href="/contact" className="px-6 py-2.5 text-sm font-bold text-white rounded-lg transition-all hover:brightness-110 flex-shrink-0" style={{ backgroundColor: '#1a5c2a' }}>Signaler</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
