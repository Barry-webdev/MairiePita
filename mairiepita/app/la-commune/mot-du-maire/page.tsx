import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export const metadata = { title: 'Mot du Maire — Mairie de Pita' };

export default function MotDuMairePage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <div className="py-12 px-4 text-white" style={{ backgroundColor: '#1a5c2a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <a href="/" className="hover:text-white">Accueil</a><span>/</span>
            <a href="/la-commune" className="hover:text-white">La Commune</a><span>/</span>
            <span className="text-white">Mot du Maire</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">Mot du Maire</h1>
        </div>
      </div>

      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Photo */}
              <div className="flex-shrink-0 flex flex-col items-center gap-3">
                <div className="w-40 h-52 rounded-xl overflow-hidden" style={{ backgroundColor: '#e5e7eb' }}>
                  <Image
                    src="/maire.jpg"
                    alt="Le Maire de Pita"
                    width={160}
                    height={208}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="text-center">
                  <p className="font-black text-sm" style={{ color: '#1a5c2a' }}>Le Maire</p>
                  <p className="text-xs text-gray-500">Commune Urbaine de Pita</p>
                  <p className="text-xs text-gray-400 mt-1">Mandat 2022 — 2027</p>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-5 flex-1">
                <div>
                  <h2 className="text-lg font-black uppercase tracking-wide" style={{ color: '#1a5c2a' }}>Message aux citoyens</h2>
                  <div className="mt-1 h-1 w-16 rounded" style={{ backgroundColor: '#d4a017' }} />
                </div>
                <div className="flex flex-col gap-4 text-gray-700 leading-relaxed text-sm">
                  <p>Chers pitavoises, chers pitavois,</p>
                  <p>C&apos;est avec une immense fierté et un profond sentiment de responsabilité que je m&apos;adresse à vous en tant que Maire de notre belle commune. Notre commune dispose d&apos;énormes potentialités et atouts que nous devons valoriser ensemble pour construire le Pita que nous voulons tous.</p>
                  <p>Au cours de cette mandature, notre priorité absolue est l&apos;amélioration des conditions de vie de tous les citoyens : l&apos;accès à l&apos;eau potable, la réhabilitation de nos infrastructures routières, le renforcement de notre système éducatif et sanitaire, et la promotion de l&apos;économie locale.</p>
                  <p>C&apos;est ensemble, avec engagement et responsabilité, que nous bâtirons une ville moderne, propre, sûre et prospère. La Mairie de Pita reste à votre écoute et au service de tous. N&apos;hésitez pas à nous contacter, à participer aux réunions publiques et à contribuer au développement de notre commune.</p>
                  <p>Travail, Solidarité, Développement — tels sont les valeurs qui guident notre action quotidienne.</p>
                </div>
                <p className="text-xl font-semibold mt-2" style={{ fontFamily: 'Georgia, serif', color: '#1a5c2a' }}>
                  Le Maire
                </p>
                <div className="pt-4 border-t border-gray-100 flex flex-col gap-2 text-sm text-gray-500">
                  <p>📍 Mairie de Pita, Rue Administrative, Quartier Daremagnan</p>
                  <p>📞 +224 123 45 67 89</p>
                  <p>✉️ maire@mairiepita.gov.gn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
