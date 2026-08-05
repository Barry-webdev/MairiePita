import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Recette Communale — Services — Mairie de Pita' };

export default function RecetteCommunalePage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <div className="py-12 px-4 text-white" style={{ backgroundColor: '#1a5c2a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <a href="/" className="hover:text-white">Accueil</a><span>/</span>
            <span className="text-white">Services — Recette Communale</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">Recette Communale</h1>
          <p className="mt-2 text-sm max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>Collecte des taxes et redevances communales.</p>
        </div>
      </div>
      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-black uppercase tracking-wide mb-4" style={{ color: '#1a5c2a' }}>Types de taxes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '🏠', title: 'Taxe foncière', desc: 'Taxe annuelle sur les propriétés bâties et non bâties.' },
                { icon: '🛒', title: 'Taxe commerciale', desc: 'Taxe sur les activités commerciales et artisanales.' },
                { icon: '📦', title: 'Redevances diverses', desc: 'Redevances pour occupation du domaine public et autres services.' },
              ].map((t) => (
                <div key={t.title} className="bg-gray-50 rounded-lg p-4 flex flex-col gap-2">
                  <span className="text-3xl">{t.icon}</span>
                  <h3 className="font-black text-sm" style={{ color: '#1a5c2a' }}>{t.title}</h3>
                  <p className="text-xs text-gray-600">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-black uppercase tracking-wide mb-5" style={{ color: '#1a5c2a' }}>Comment payer ?</h2>
            <div className="flex flex-col gap-4">
              {[
                { step: '1', title: 'Renseignez-vous', desc: 'Contactez la recette communale pour connaître le montant de votre taxe.' },
                { step: '2', title: 'Effectuez le paiement', desc: 'Payez directement à la caisse de la recette communale (Mairie de Pita, bureau n°5).' },
                { step: '3', title: 'Récupérez votre reçu', desc: 'Un reçu de paiement officiel vous sera remis. Conservez-le précieusement.' },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black flex-shrink-0" style={{ backgroundColor: '#1a5c2a' }}>{s.step}</div>
                  <div><h3 className="font-bold text-sm text-gray-800">{s.title}</h3><p className="text-sm text-gray-600 mt-0.5">{s.desc}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-center gap-4">
            <span className="text-4xl">🕐</span>
            <div>
              <h3 className="font-black text-sm" style={{ color: '#1a5c2a' }}>Horaires de la recette</h3>
              <p className="text-sm text-gray-600 mt-1">Lundi — Vendredi : 08h00 — 15h30 | Mairie de Pita, Bureau n°5</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
