export default function Hero() {
  return (
    <section
      className="relative flex items-center justify-start overflow-hidden"
      style={{
        minHeight: "520px",
        background:
          "linear-gradient(135deg, #1a5c2a 0%, #2d7a3a 40%, #1a5c2a 70%, #0d3a1a 100%)",
      }}
    >
      {/* Decorative pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
          style={{ height: "60px" }}
        >
          <path
            d="M0 30 C360 60 1080 0 1440 30 L1440 60 L0 60 Z"
            fill="#f5f5f5"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span
              className="px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full text-white"
              style={{ backgroundColor: "#d4a017" }}
            >
              Commune Urbaine de Pita
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            Ensemble, construisons le{" "}
            <span style={{ color: "#d4a017" }}>Pita</span> de demain
          </h1>

          {/* Subtitle */}
          <p className="text-white/90 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
            La Mairie de Pita s'engage chaque jour pour améliorer le cadre de
            vie des citoyens et promouvoir un développement durable et inclusif.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold uppercase tracking-wider text-sm rounded transition-all hover:brightness-110 hover:scale-105"
              style={{ backgroundColor: "#d4a017", color: "#1a1a1a" }}
            >
              Découvrir la Commune
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold uppercase tracking-wider text-sm rounded border-2 border-white text-white transition-all hover:bg-white/10"
            >
              Nos Services
            </a>
          </div>
        </div>
      </div>

      {/* Right decorative element */}
      <div className="absolute right-0 top-0 bottom-0 hidden lg:flex items-center pr-16 opacity-20">
        <svg
          width="300"
          height="300"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M50 15 L85 30 L85 70 L50 85 L15 70 L15 30 Z"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
          <text x="50" y="55" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">MP</text>
        </svg>
      </div>
    </section>
  );
}
