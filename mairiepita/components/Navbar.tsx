'use client';

import { useState } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [laCommune, setLaCommune] = useState(false);
  const [conseilOpen, setConseilOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center transition-all duration-300 hover:scale-105">
            <div className="relative p-1 rounded-lg">
              <img 
                src="/logo.jpeg" 
                alt="Logo Mairie de Pita" 
                className="h-14 w-14 object-cover rounded-lg"
              />
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            <a
              href="/"
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#1a5c2a] hover:bg-gray-50 rounded transition-colors"
            >
              Accueil
            </a>

            {/* La Commune (dropdown) */}
            <div className="relative">
              <button
                onMouseEnter={() => setLaCommune(true)}
                onMouseLeave={() => setLaCommune(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#1a5c2a] hover:bg-gray-50 rounded transition-colors flex items-center gap-1"
              >
                La Commune
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {laCommune && (
                <div
                  onMouseEnter={() => setLaCommune(true)}
                  onMouseLeave={() => setLaCommune(false)}
                  className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2"
                >
                  <a
                    href="/la-commune/mot-du-maire"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a]"
                  >
                    Mot du Maire
                  </a>
                  <a
                    href="/la-commune/histoire"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a]"
                  >
                    Histoire
                  </a>
                  <a
                    href="/la-commune/geographie"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a]"
                  >
                    Géographie
                  </a>
                  <a
                    href="/la-commune/galerie"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a]"
                  >
                    Galerie Photo
                  </a>
                  <a
                    href="/la-commune/archives"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a]"
                  >
                    Archives
                  </a>
                  <a
                    href="/la-commune/rapport"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a]"
                  >
                    Rapport
                  </a>

                </div>
              )}
            </div>

            {/* Conseil Communal (dropdown) */}
            <div className="relative">
              <button
                onMouseEnter={() => setConseilOpen(true)}
                onMouseLeave={() => setConseilOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#1a5c2a] hover:bg-gray-50 rounded transition-colors flex items-center gap-1"
              >
                Conseil Communal
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {conseilOpen && (
                <div
                  onMouseEnter={() => setConseilOpen(true)}
                  onMouseLeave={() => setConseilOpen(false)}
                  className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2"
                >
                  <a
                    href="/conseil-communal"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a]"
                  >
                    Présentation
                  </a>
                  <a
                    href="/conseil-communal/seances"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a]"
                  >
                    Séances
                  </a>
                  <a
                    href="/conseil-communal/deliberations"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a]"
                  >
                    Délibérations
                  </a>
                </div>
              )}
            </div>

            <a
              href="/actualites"
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#1a5c2a] hover:bg-gray-50 rounded transition-colors"
            >
              Actualités
            </a>
            <a
              href="/evenements"
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#1a5c2a] hover:bg-gray-50 rounded transition-colors"
            >
              Événements
            </a>
            <a
              href="/services"
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#1a5c2a] hover:bg-gray-50 rounded transition-colors"
            >
              Services
            </a>
            <a
              href="/documents"
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#1a5c2a] hover:bg-gray-50 rounded transition-colors"
            >
              Documents
            </a>
            <a
              href="/appels-offres"
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#1a5c2a] hover:bg-gray-50 rounded transition-colors"
            >
              Appels d'offres
            </a>
            <a
              href="/contact"
              className="ml-2 px-5 py-2 text-sm font-bold text-white rounded-lg transition-all hover:shadow-md"
              style={{ backgroundColor: '#1a5c2a' }}
            >
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200 mt-2">
            <a
              href="/"
              className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a] rounded"
            >
              Accueil
            </a>
            <div className="px-4 py-2 text-sm font-bold text-gray-500 uppercase text-xs">
              La Commune
            </div>
              <a
                href="/la-commune/mot-du-maire"
                className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a] rounded"
              >
                Mot du Maire
              </a>
              <a
                href="/la-commune/histoire"
                className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a] rounded"
              >
                Histoire
              </a>
              <a
                href="/la-commune/geographie"
                className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a] rounded"
              >
                Géographie
              </a>
              <a
                href="/la-commune/galerie"
                className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a] rounded"
              >
                Galerie Photo
              </a>
              <a
                href="/la-commune/archives"
                className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a] rounded"
              >
                Archives
              </a>
              <a
                href="/la-commune/archives"
                className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a] rounded"
              >
                Rapport
              </a>

            <div className="px-4 py-2 text-sm font-bold text-gray-500 uppercase text-xs mt-2">
              Conseil Communal
            </div>
            <a
              href="/conseil-communal"
              className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a] rounded"
            >
              Présentation
            </a>
            <a
              href="/conseil-communal/seances"
              className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a] rounded"
            >
              Séances
            </a>
            <a
              href="/conseil-communal/deliberations"
              className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a] rounded"
            >
              Délibérations
            </a>
            <a
              href="/actualites"
              className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a] rounded mt-2"
            >
              Actualités
            </a>
            <a
              href="/evenements"
              className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a] rounded"
            >
              Événements
            </a>
            <a
              href="/services"
              className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a] rounded"
            >
              Services
            </a>
            <a
              href="/documents"
              className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a] rounded"
            >
              Documents
            </a>
            <a
              href="/appels-offres"
              className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#1a5c2a] rounded"
            >
              Appels d'offres
            </a>
            <a
              href="/contact"
              className="block px-4 py-2 mt-2 text-sm font-bold text-white rounded-lg"
              style={{ backgroundColor: '#1a5c2a' }}
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
