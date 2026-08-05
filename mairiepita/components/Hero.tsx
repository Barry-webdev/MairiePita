import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative flex items-center justify-start overflow-hidden"
      style={{ minHeight: "520px" }}
    >
      {/* Background image */}
      <Image
        src="/hotel-de-ville.jpg"
        alt="Hôtel de Ville de Pita"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark green overlay pour lisibilité du texte */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(15,50,20,0.88) 0%, rgba(15,50,20,0.75) 50%, rgba(15,50,20,0.35) 100%)",
        }}
      />

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28 w-full">
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
          <p
            className="text-base md:text-lg leading-relaxed mb-10 max-w-xl"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            La Mairie de Pita s&apos;engage chaque jour pour améliorer le cadre de
            vie des citoyens et promouvoir un développement durable et inclusif.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/la-commune"
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
              href="/services/etat-civil"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold uppercase tracking-wider text-sm rounded border-2 border-white text-white transition-all hover:bg-white/10"
            >
              Nos Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
