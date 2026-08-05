'use client';

import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer>
      {/* ===== TOP SECTION (light background, 4 columns) ===== */}
      <div className="bg-white border-t border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Localisation */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📍</span>
              <h4 className="font-black uppercase text-sm tracking-widest" style={{ color: '#1a5c2a' }}>
                Localisation
              </h4>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Rue Administrative, Quartier Daremagnan,
              <br />
              Commune Urbaine de Pita,
              <br />
              Guinée
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
              style={{ color: '#1a5c2a' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Voir sur la carte
            </a>
          </div>

          {/* Col 2 — Horaires */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🕐</span>
              <h4 className="font-black uppercase text-sm tracking-widest" style={{ color: '#1a5c2a' }}>
                Horaires d'ouverture
              </h4>
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-medium">Lundi - Vendredi</span>
                <span>08h00 - 17h00</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-medium">Samedi</span>
                <span>08h00 - 12h00</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="font-medium">Dimanche</span>
                <span className="text-red-500">Fermé</span>
              </div>
            </div>
          </div>

          {/* Col 3 — Nous contacter */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📞</span>
              <h4 className="font-black uppercase text-sm tracking-widest" style={{ color: '#1a5c2a' }}>
                Nous Contacter
              </h4>
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <a href="tel:+22412345679" className="flex items-center gap-2 hover:text-green-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +224 123 45 67 89
              </a>
              <a href="mailto:contact@mairiepita.gov.gn" className="flex items-center gap-2 hover:text-green-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@mairiepita.gov.gn
              </a>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded text-white transition-all hover:brightness-110 w-fit"
              style={{ backgroundColor: '#1a5c2a' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Envoyer un message
            </a>
          </div>

          {/* Col 4 — Newsletter */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✉️</span>
              <h4 className="font-black uppercase text-sm tracking-widest" style={{ color: '#1a5c2a' }}>
                Lettre d'Information
              </h4>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Abonnez-vous pour recevoir les dernières actualités et informations de la Mairie de Pita.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse e-mail"
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                required
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded text-white transition-all hover:brightness-110"
                style={{ backgroundColor: '#1a5c2a' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                S'abonner
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* ===== BOTTOM SECTION (dark green) ===== */}
      <div style={{ backgroundColor: '#1a5c2a' }} className="text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

            {/* Logo + description */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              {/* Shield */}
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-12 h-14 text-white font-bold text-lg flex-shrink-0"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)',
                  }}
                >
                  MP
                </div>
                <div>
                  <div className="font-black uppercase tracking-widest text-xs">Mairie de Pita</div>
                  <div className="text-xs italic mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Guinée</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                La Mairie de Pita œuvre pour le bien-être des populations et le développement harmonieux de notre commune.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3 mt-1">
                {[
                  { label: 'Facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                ].map((s) => (
                  <a key={s.label} href="#" aria-label={s.label} className="hover:text-yellow-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
                <a href="#" aria-label="Twitter" className="hover:text-yellow-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" aria-label="YouTube" className="hover:text-yellow-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Liens Rapides */}
            <div className="flex flex-col gap-3">
              <h5 className="font-black uppercase text-xs tracking-widest border-b border-white/20 pb-2">
                Liens Rapides
              </h5>
              <ul className="flex flex-col gap-2">
                {[
                  { label: 'Accueil', href: '/' },
                  { label: 'La Commune', href: '/la-commune' },
                  { label: 'Conseil Communal', href: '#' },
                  { label: 'Actualités', href: '/actualites' },
                  { label: 'Contact', href: '/contact' },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm hover:text-white flex items-center gap-1.5 transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="flex flex-col gap-3">
              <h5 className="font-black uppercase text-xs tracking-widest border-b border-white/20 pb-2">
                Services
              </h5>
              <ul className="flex flex-col gap-2">
                {['État civil', 'Urbanisme', 'Recette communale', 'Déchets et salubrité', 'Eau et assainissement'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/70 hover:text-white flex items-center gap-1.5 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents */}
            <div className="flex flex-col gap-3">
              <h5 className="font-black uppercase text-xs tracking-widest border-b border-white/20 pb-2">
                Documents Utiles
              </h5>
              <ul className="flex flex-col gap-2">
                {[
                  { label: 'Budget communal', href: '/documents' },
                  { label: 'Plans & Rapports', href: '/documents' },
                  { label: 'Délibérations', href: '/documents' },
                  { label: 'Règlements communaux', href: '/documents' },
                  { label: 'Formulaires', href: '/documents' },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm hover:text-white flex items-center gap-1.5 transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map placeholder */}
            <div className="flex flex-col gap-3">
              <h5 className="font-black uppercase text-xs tracking-widest border-b border-white/20 pb-2">
                Localisation
              </h5>
              <div
                className="relative rounded-lg overflow-hidden h-40 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
              >
                {/* Map grid pattern */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern id="mapgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mapgrid)" />
                </svg>
                {/* Location pin */}
                <div className="relative flex flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" style={{ color: '#d4a017' }} fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.013 3.5-4.749 3.5-8.275C19.79 5.637 16.226 2 12 2S4.21 5.637 4.21 8.843c0 3.526 1.557 6.262 3.5 8.275a19.579 19.579 0 002.684 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-bold tracking-wider text-center">
                    PITA / MAMOU<br />GUINÉE
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ===== VERY BOTTOM BAR ===== */}
      <div
        className="px-4 py-4 text-xs border-t border-white/10"
        style={{ backgroundColor: '#0d3a1a', color: 'rgba(255,255,255,0.6)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2024 Mairie de Pita - Tous droits réservés</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>Mentions légales</a>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
            <a href="#" className="hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
