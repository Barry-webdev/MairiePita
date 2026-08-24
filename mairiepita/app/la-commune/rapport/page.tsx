import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RapportPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#1a5c2a] to-[#2d7a3e] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Rapports d'Activités</h1>
            <p className="text-xl text-green-100 max-w-3xl">
              Découvrez les réalisations et les projets de la Mairie de Pita
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Transparence et Redevabilité</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              La Mairie de Pita s'engage à fournir des rapports détaillés sur ses activités, 
              ses projets et l'utilisation des ressources publiques. Ces rapports permettent 
              aux citoyens de suivre l'évolution des différents projets et initiatives entrepris 
              pour le développement de notre commune.
            </p>
          </div>

          {/* Rapports Section */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            
            {/* Rapport Annuel Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rapport Annuel 2024</h3>
              <p className="text-gray-600 text-sm mb-4">
                Bilan complet des activités et réalisations de l'année 2024
              </p>
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                À venir
              </span>
            </div>

            {/* Rapport Financier Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rapport Financier</h3>
              <p className="text-gray-600 text-sm mb-4">
                État des finances et utilisation du budget communal
              </p>
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                À venir
              </span>
            </div>

            {/* Projets en Cours Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Projets en Cours</h3>
              <p className="text-gray-600 text-sm mb-4">
                Suivi des projets d'infrastructure et de développement
              </p>
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                À venir
              </span>
            </div>

            {/* Rapport Social Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Actions Sociales</h3>
              <p className="text-gray-600 text-sm mb-4">
                Programmes sociaux et initiatives communautaires
              </p>
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                À venir
              </span>
            </div>

            {/* Rapport Environnement Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Environnement</h3>
              <p className="text-gray-600 text-sm mb-4">
                Actions pour la préservation de l'environnement
              </p>
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                À venir
              </span>
            </div>

            {/* Archives Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Archives</h3>
              <p className="text-gray-600 text-sm mb-4">
                Consultation des rapports des années précédentes
              </p>
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                À venir
              </span>
            </div>

          </div>

          {/* Info Message */}
          <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-bold text-blue-900 mb-2">Information</h4>
                <p className="text-blue-800 text-sm">
                  Les rapports d'activités seront publiés prochainement. Pour toute demande d'information, 
                  n'hésitez pas à nous contacter via la <a href="/contact" className="underline font-semibold">page de contact</a>.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </>
  );
}
