import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Services — Mairie de Pita',
  description: 'Services administratifs et prestations de la Commune Urbaine de Pita.',
};

export default function ServicesPage() {
  const services = [
    {
      category: 'État Civil',
      items: [
        'Actes de naissance, mariage et décès',
        'Extraits d\'actes',
        'Légalisation de documents',
        'Certificat de résidence',
      ],
    },
    {
      category: 'Documents d\'identité',
      items: [
        'Carte d\'identité nationale',
        'Passeport',
        'Attestation d\'identité',
      ],
    },
    {
      category: 'Urbanisme',
      items: [
        'Permis de construire',
        'Autorisation de lotissement',
        'Certificat d\'urbanisme',
        'Déclaration de travaux',
      ],
    },
    {
      category: 'Services Municipaux',
      items: [
        'Paiement des taxes locales',
        'Eau et assainissement',
        'Gestion des déchets',
        'Voirie et éclairage public',
        'Marché municipal',
      ],
    },
  ];

  return (
    <main>
      <TopBar />
      <Navbar />

      {/* Hero banner */}
      <div
        className="py-12 px-4 text-white"
        style={{ backgroundColor: '#1a5c2a' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-3">
            <a href="/" className="hover:text-white transition-colors">Accueil</a>
            <span>/</span>
            <span className="text-white">Services</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
            Services
          </h1>
          <p className="mt-2 text-white/80 text-sm max-w-xl">
            Découvrez l'ensemble des services administratifs proposés par la Mairie de Pita.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto">
          
          {/* Horaires */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Horaires d'ouverture</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-700">Lundi - Vendredi</p>
                <p className="text-gray-600">8h00 - 16h00</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Samedi</p>
                <p className="text-gray-600">8h00 - 12h00</p>
              </div>
            </div>
          </div>

          {/* Services grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1a5c2a' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{service.category}</h3>
                </div>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
