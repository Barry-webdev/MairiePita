const newsItems = [
  {
    category: 'Conseil Communal',
    badgeBg: '#1a5c2a',
    title: 'Session ordinaire du Conseil communal',
    date: '28 Mai 2024',
    bgColor: '#1a5c2a',
    slug: 'session-ordinaire-conseil-communal',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    category: 'Environnement',
    badgeBg: '#4caf50',
    title: 'Campagne de reboisement : Pita se mobilise',
    date: '24 Mai 2024',
    bgColor: '#388e3c',
    slug: 'campagne-reboisement-pita',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    category: 'Éducation',
    badgeBg: '#1565c0',
    title: "Réhabilitation de l'école primaire de Daremagnan",
    date: '20 Mai 2024',
    bgColor: '#1976d2',
    slug: 'rehabilitation-ecole-daremagnan',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  },
  {
    category: 'Eau & Assainissement',
    badgeBg: '#00838f',
    title: "Nouveau château d'eau pour le quartier Koliady",
    date: '18 Mai 2024',
    bgColor: '#00695c',
    slug: 'chateau-eau-koliady',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
];

export default function ActualitesRecentes() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl font-black uppercase tracking-widest" style={{ color: '#1a5c2a' }}>
            Actualités Récentes
          </h2>
          <div className="mt-2 h-1 w-20 rounded" style={{ backgroundColor: '#1a5c2a' }} />
          <p className="mt-4 text-gray-500 text-sm text-center max-w-xl">
            Restez informés des dernières nouvelles et activités de la Commune Urbaine de Pita.
          </p>
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item) => (
            <a
              key={item.title}
              href={`/actualites/${item.slug}`}
              className="group flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              {/* Image placeholder */}
              <div
                className="h-40 flex items-center justify-center relative"
                style={{ backgroundColor: item.bgColor }}
              >
                {item.icon}
                {/* Badge */}
                <div className="absolute bottom-3 left-3">
                  <span
                    className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded text-white"
                    style={{ backgroundColor: item.badgeBg }}
                  >
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-3 p-4 flex-1">
                <h3 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-[#1a5c2a] transition-colors line-clamp-3">
                  {item.title}
                </h3>
                {/* Date */}
                <div className="mt-auto flex items-center gap-1.5 text-xs text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {item.date}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <a
            href="/actualites"
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-wider rounded border-2 transition-all hover:bg-green-50"
            style={{ borderColor: '#1a5c2a', color: '#1a5c2a' }}
          >
            Voir toutes les actualités
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
