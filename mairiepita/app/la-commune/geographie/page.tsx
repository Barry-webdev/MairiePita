import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Géographie — La Commune — Mairie de Pita' };

export default function GeographiePage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <div className="py-12 px-4 text-white" style={{ backgroundColor: '#1a5c2a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <a href="/" className="hover:text-white">Accueil</a><span>/</span>
            <a href="/la-commune" className="hover:text-white">La Commune</a><span>/</span>
            <span className="text-white">Géographie</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">Géographie</h1>
          <p className="mt-2 text-sm max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>Localisation, relief, climat et organisation territoriale de Pita.</p>
        </div>
      </div>

      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto flex flex-col gap-8">

          {/* Localisation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-black uppercase tracking-wide mb-4" style={{ color: '#1a5c2a' }}>Localisation</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">Pita est situé dans la Région Administrative de Labé, au cœur du Fouta Djallon. La commune est accessible depuis Conakry par la route nationale RN1 (environ 5h de route).</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {[
                { label: 'Latitude', value: '11°04\'N' },
                { label: 'Longitude', value: '12°16\'O' },
                { label: 'Altitude moy.', value: '1 100 m' },
                { label: 'Région', value: 'Labé' },
              ].map((c) => (
                <div key={c.label} className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-base font-black" style={{ color: '#1a5c2a' }}>{c.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{c.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Relief et Climat */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-lg font-black uppercase tracking-wide mb-4" style={{ color: '#1a5c2a' }}>Relief</h2>
              <p className="text-sm text-gray-700 leading-relaxed">Le territoire de Pita est caractérisé par un relief montagneux typique du Fouta Djallon, avec des plateaux, des vallées encaissées et des falaises spectaculaires. Les points culminants dépassent 1 500 m d&apos;altitude.</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-lg font-black uppercase tracking-wide mb-4" style={{ color: '#1a5c2a' }}>Climat</h2>
              <div className="flex flex-col gap-2 text-sm text-gray-700">
                <div className="flex justify-between border-b border-gray-100 py-2">
                  <span>Saison sèche</span><span className="font-semibold">Novembre — Avril</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 py-2">
                  <span>Saison des pluies</span><span className="font-semibold">Mai — Octobre</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Température moy.</span><span className="font-semibold">18 — 25°C</span>
                </div>
              </div>
            </div>
          </div>

          {/* Limites administratives */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-black uppercase tracking-wide mb-4" style={{ color: '#1a5c2a' }}>Communes voisines</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb' }}>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Direction</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Commune</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Région</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { dir: 'Nord', commune: 'Koubia', region: 'Labé' },
                    { dir: 'Sud', commune: 'Dalaba', region: 'Mamou' },
                    { dir: 'Est', commune: 'Labé', region: 'Labé' },
                    { dir: 'Ouest', commune: 'Télimélé', region: 'Kindia' },
                  ].map((r) => (
                    <tr key={r.dir} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-700">{r.dir}</td>
                      <td className="px-4 py-3 text-gray-600">{r.commune}</td>
                      <td className="px-4 py-3 text-gray-600">{r.region}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-black uppercase tracking-wide mb-4" style={{ color: '#1a5c2a' }}>Carte de la commune</h2>
            <div className="relative rounded-lg overflow-hidden h-64 flex items-center justify-center" style={{ backgroundColor: '#1a5c2a' }}>
              <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <defs><pattern id="g" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
                <rect width="100%" height="100%" fill="url(#g)" />
              </svg>
              <div className="relative flex flex-col items-center gap-3 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" style={{ color: '#d4a017' }} fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.013 3.5-4.749 3.5-8.275C19.79 5.637 16.226 2 12 2S4.21 5.637 4.21 8.843c0 3.526 1.557 6.262 3.5 8.275a19.579 19.579 0 002.684 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <p className="font-black text-lg">PITA</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Fouta Djallon — Guinée</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
