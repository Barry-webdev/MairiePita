export default function MaireSection() {
  return (
    <section className="py-16 px-4" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ---- Left: Mot du Maire ---- */}
          <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col gap-6">
            {/* Section title */}
            <div>
              <h2 className="text-lg font-black uppercase tracking-widest" style={{ color: '#1a5c2a' }}>
                Mot du Maire
              </h2>
              <div className="mt-1 h-1 w-16 rounded" style={{ backgroundColor: '#1a5c2a' }} />
            </div>

            {/* Content row */}
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Photo placeholder */}
              <div className="flex-shrink-0">
                <div
                  className="w-32 h-40 rounded-lg flex flex-col items-center justify-center"
                  style={{ backgroundColor: '#e0e0e0' }}
                >
                  {/* Silhouette */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16"
                    viewBox="0 0 24 24"
                    fill="#9e9e9e"
                  >
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                  <span className="text-xs text-gray-500 mt-1">Le Maire</span>
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-4">
                <p className="text-gray-700 leading-relaxed text-sm">
                  Chers pitavoises, chers pitavois,
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Notre commune dispose d'énormes potentialités et atouts.
                  C'est ensemble, avec engagement et responsabilité, que nous
                  bâtirons une ville moderne, propre, sûre et prospère. La
                  Mairie de Pita reste à votre écoute et au service de tous.
                </p>

                {/* Signature */}
                <p
                  className="italic text-base font-semibold"
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: '#1a5c2a',
                  }}
                >
                  Le Maire
                </p>
              </div>
            </div>

            {/* CTA */}
            <div>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold uppercase tracking-wider rounded border-2 transition-all hover:bg-green-50"
                style={{ borderColor: '#1a5c2a', color: '#1a5c2a' }}
              >
                Lire la suite
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* ---- Right: À la Une ---- */}
          <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black uppercase tracking-widest" style={{ color: '#1a5c2a' }}>
                  À la Une
                </h2>
                <div className="mt-1 h-1 w-16 rounded" style={{ backgroundColor: '#d4a017' }} />
              </div>
              {/* Navigation arrows */}
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-500 hover:border-green-700 hover:text-green-700 transition-colors"
                  aria-label="Précédent"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-500 hover:border-green-700 hover:text-green-700 transition-colors"
                  aria-label="Suivant"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Featured news card */}
            <a href="#" className="group flex flex-col gap-4 hover:opacity-95 transition-opacity">
              {/* Image placeholder */}
              <div
                className="w-full h-44 rounded-lg flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: '#2d7a3a' }}
              >
                {/* Construction icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded text-white"
                    style={{ backgroundColor: '#1a5c2a' }}
                  >
                    Infrastructures
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="flex flex-col gap-2">
                <h3
                  className="font-bold text-base leading-snug group-hover:underline"
                  style={{ color: '#1a5c2a' }}
                >
                  Travaux de bitumage de la voirie urbaine
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  La Mairie de Pita poursuit les travaux de réhabilitation des
                  rues et avenues pour un meilleur cadre de vie.
                </p>
                {/* Date */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  31 Mai 2024
                </div>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
