import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Séances — Conseil Communal — Mairie de Pita' };

const prochaines = [
  { date: '25 Juin 2024', type: 'Ordinaire', lieu: 'Salle de délibérations, Mairie de Pita', heure: '09h00' },
  { date: '25 Sept. 2024', type: 'Ordinaire', lieu: 'Salle de délibérations, Mairie de Pita', heure: '09h00' },
  { date: '15 Nov. 2024', type: 'Extraordinaire', lieu: 'Salle de délibérations, Mairie de Pita', heure: '10h00' },
];

const passees = [
  { date: '28 Mars 2024', type: 'Ordinaire', resume: 'Examen du budget rectificatif 2024' },
  { date: '15 Janv. 2024', type: 'Ordinaire', resume: 'Adoption du budget primitif 2024' },
  { date: '20 Nov. 2023', type: 'Extraordinaire', resume: 'Délibération sur les marchés publics' },
  { date: '25 Sept. 2023', type: 'Ordinaire', resume: 'Bilan à mi-mandat et perspectives' },
];

export default function SeancesPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <div className="py-12 px-4 text-white" style={{ backgroundColor: '#1a5c2a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <a href="/" className="hover:text-white">Accueil</a><span>/</span>
            <a href="/conseil-communal" className="hover:text-white">Conseil Communal</a><span>/</span>
            <span className="text-white">Séances</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">Séances du Conseil</h1>
        </div>
      </div>
      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-4xl mx-auto flex flex-col gap-10">

          {/* Prochaines */}
          <div>
            <h2 className="text-xl font-black uppercase tracking-wide mb-5" style={{ color: '#1a5c2a' }}>Prochaines séances</h2>
            <div className="flex flex-col gap-4">
              {prochaines.map((s, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-shrink-0 w-20 h-20 rounded-xl flex flex-col items-center justify-center text-white" style={{ backgroundColor: '#1a5c2a' }}>
                    <span className="text-lg font-black">{s.date.split(' ')[0]}</span>
                    <span className="text-xs font-semibold">{s.date.split(' ')[1]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 text-xs font-bold rounded text-white" style={{ backgroundColor: s.type === 'Ordinaire' ? '#1a5c2a' : '#d4a017' }}>{s.type}</span>
                    </div>
                    <p className="text-sm text-gray-600 flex items-center gap-1.5 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {s.lieu}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-1.5 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {s.heure}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Passées */}
          <div>
            <h2 className="text-xl font-black uppercase tracking-wide mb-5" style={{ color: '#1a5c2a' }}>Séances passées</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead style={{ backgroundColor: '#f9fafb' }}>
                  <tr>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Date</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Type</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider hidden sm:table-cell">Objet</th>
                    <th className="text-right px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">PV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {passees.map((s, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-5 py-4 font-medium text-gray-700 whitespace-nowrap">{s.date}</td>
                      <td className="px-5 py-4"><span className="px-2 py-0.5 text-xs font-bold rounded text-white" style={{ backgroundColor: s.type === 'Ordinaire' ? '#1a5c2a' : '#d4a017' }}>{s.type}</span></td>
                      <td className="px-5 py-4 text-gray-500 hidden sm:table-cell">{s.resume}</td>
                      <td className="px-5 py-4 text-right">
                        <a href="/documents" className="text-xs font-semibold hover:underline" style={{ color: '#1a5c2a' }}>Télécharger</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
