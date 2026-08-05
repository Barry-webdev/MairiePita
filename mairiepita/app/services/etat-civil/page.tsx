import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'État Civil — Services — Mairie de Pita' };

const services = [
  { icon: '📋', title: 'Acte de naissance', desc: 'Extrait ou copie intégrale de l\'acte de naissance.' },
  { icon: '💒', title: 'Acte de mariage', desc: 'Extrait ou copie intégrale de l\'acte de mariage.' },
  { icon: '🕊️', title: 'Acte de décès', desc: 'Extrait ou copie intégrale de l\'acte de décès.' },
  { icon: '📄', title: 'Certificat de vie', desc: 'Attestation certifiant qu\'une personne est en vie.' },
  { icon: '🆔', title: 'Carte d\'identité', desc: 'Orientation vers le service compétent pour la CNI.' },
  { icon: '📁', title: 'Extrait du registre', desc: 'Extrait du registre d\'état civil pour tout acte.' },
];

export default function EtatCivilPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <div className="py-12 px-4 text-white" style={{ backgroundColor: '#1a5c2a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <a href="/" className="hover:text-white">Accueil</a><span>/</span>
            <span className="text-white">Services — État Civil</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">État Civil</h1>
          <p className="mt-2 text-sm max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>Enregistrement et délivrance des actes d&apos;état civil pour les citoyens de Pita.</p>
        </div>
      </div>

      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto flex flex-col gap-10">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-3">
                <span className="text-4xl">{s.icon}</span>
                <h3 className="font-black text-sm uppercase tracking-wide" style={{ color: '#1a5c2a' }}>{s.title}</h3>
                <p className="text-sm text-gray-600 flex-1">{s.desc}</p>
                <a href="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2 rounded-lg w-fit transition-all hover:brightness-110" style={{ backgroundColor: '#1a5c2a' }}>Demander</a>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-base font-black uppercase tracking-wide mb-4" style={{ color: '#1a5c2a' }}>Documents requis</h2>
              <ul className="flex flex-col gap-2 text-sm text-gray-600">
                {['Pièce d\'identité valide (CNI ou passeport)', 'Justificatif de domicile', 'Acte de naissance des parents (si demande pour enfant)', 'Formulaire de demande rempli et signé', 'Reçu de paiement des frais administratifs'].map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: '#1a5c2a' }}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-base font-black uppercase tracking-wide mb-4" style={{ color: '#1a5c2a' }}>Délais de traitement</h2>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['Acte de naissance', '3 jours'],
                    ['Acte de mariage', '5 jours'],
                    ['Acte de décès', '3 jours'],
                    ['Certificat de vie', '1 jour'],
                    ['Extrait du registre', '7-15 jours'],
                  ].map(([s, d]) => (
                    <tr key={s}><td className="py-2.5 text-gray-600">{s}</td><td className="py-2.5 font-semibold text-right" style={{ color: '#1a5c2a' }}>{d}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-center gap-4">
            <span className="text-4xl">📞</span>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-black text-sm" style={{ color: '#1a5c2a' }}>Besoin d&apos;aide ?</h3>
              <p className="text-sm text-gray-600 mt-1">Contactez le service d&apos;état civil au +224 123 45 67 89 ou venez directement à la mairie.</p>
            </div>
            <a href="/contact" className="px-6 py-2.5 text-sm font-bold text-white rounded-lg transition-all hover:brightness-110 flex-shrink-0" style={{ backgroundColor: '#1a5c2a' }}>Nous contacter</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
