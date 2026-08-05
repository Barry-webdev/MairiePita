import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Budget Communal — Mairie de Pita' };

const categories = [
  { label: 'Fonctionnement', percent: 45, color: '#1a5c2a', amount: '1 102 500 000' },
  { label: 'Investissement', percent: 35, color: '#d4a017', amount: '857 500 000' },
  { label: 'Remboursement dettes', percent: 10, color: '#2563eb', amount: '238 000 000' },
  { label: 'Réserves', percent: 10, color: '#7c3aed', amount: '238 000 000' },
];

export default function BudgetPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <div className="py-12 px-4 text-white" style={{ backgroundColor: '#1a5c2a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <a href="/" className="hover:text-white">Accueil</a><span>/</span>
            <span className="text-white">Budget Communal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">Budget Communal</h1>
          <p className="mt-2 text-sm max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>Transparence financière : consultez le budget 2024 de la Commune Urbaine de Pita.</p>
        </div>
      </div>

      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-4xl mx-auto flex flex-col gap-10">

          {/* Budget 2024 summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: '📈', label: 'Recettes totales (GNF)', value: '2 450 000 000', color: '#1a5c2a' },
              { icon: '📉', label: 'Dépenses totales (GNF)', value: '2 380 000 000', color: '#d4a017' },
              { icon: '⚖️', label: 'Excédent prévisionnel (GNF)', value: '+ 70 000 000', color: '#16a34a' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center gap-2">
                <span className="text-3xl">{s.icon}</span>
                <span className="text-lg font-black" style={{ color: s.color }}>{s.value}</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Répartition */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h3 className="font-black text-sm uppercase tracking-wide mb-6 text-gray-700">Répartition des dépenses</h3>
            <div className="flex flex-col gap-5">
              {categories.map((c) => (
                <div key={c.label} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                      <span className="font-semibold text-gray-700">{c.label}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black" style={{ color: c.color }}>{c.percent}%</span>
                      <span className="text-xs text-gray-400 ml-2">({c.amount} GNF)</span>
                    </div>
                  </div>
                  <div className="w-full h-3 rounded-full bg-gray-200">
                    <div className="h-3 rounded-full" style={{ width: `${c.percent}%`, backgroundColor: c.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <a href="/documents" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white rounded-lg transition-all hover:brightness-110" style={{ backgroundColor: '#1a5c2a' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Télécharger le budget complet 2024
            </a>
          </div>

          {/* Années précédentes */}
          <div>
            <h2 className="text-xl font-black uppercase tracking-wide mb-5" style={{ color: '#1a5c2a' }}>Années précédentes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { year: '2023', recettes: '2 210 000 000', depenses: '2 145 000 000', resultat: '+65 000 000' },
                { year: '2022', recettes: '1 980 000 000', depenses: '1 920 000 000', resultat: '+60 000 000' },
              ].map((a) => (
                <div key={a.year} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-xl" style={{ color: '#1a5c2a' }}>Budget {a.year}</h3>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Exécuté</span>
                  </div>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between py-1.5 border-b border-gray-100"><span className="text-gray-500">Recettes</span><span className="font-bold text-gray-700">{a.recettes} GNF</span></div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100"><span className="text-gray-500">Dépenses</span><span className="font-bold text-gray-700">{a.depenses} GNF</span></div>
                    <div className="flex justify-between py-1.5"><span className="text-gray-500">Résultat</span><span className="font-black text-green-600">{a.resultat} GNF</span></div>
                  </div>
                  <a href="/documents" className="inline-flex items-center gap-2 text-xs font-bold transition-colors hover:underline" style={{ color: '#1a5c2a' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Télécharger le rapport {a.year}
                  </a>
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
