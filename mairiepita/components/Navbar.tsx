'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Accueil', href: '/', active: true },
  {
    label: 'La Commune',
    href: '#',
    dropdown: [
      { label: 'Présentation', href: '/la-commune' },
      { label: 'Géographie', href: '#' },
      { label: 'Histoire', href: '#' },
      { label: "Mot du Maire", href: '#' },
    ],
  },
  {
    label: 'Conseil Communal',
    href: '#',
    dropdown: [
      { label: 'Composition', href: '#' },
      { label: 'Délibérations', href: '#' },
      { label: 'Séances', href: '#' },
    ],
  },
  { label: 'Actualités', href: '/actualites' },
  {
    label: 'Services',
    href: '#',
    dropdown: [
      { label: 'État civil', href: '/services/etat-civil' },
      { label: 'Urbanisme', href: '/services/urbanisme' },
      { label: 'Recette communale', href: '/services/recette-communale' },
      { label: 'Déchets et salubrité', href: '/services/dechets-salubrite' },
      { label: 'Eau et assainissement', href: '/services/eau-assainissement' },
    ],
  },
  {
    label: 'Transparence',
    href: '#',
    dropdown: [
      { label: 'Budget communal', href: '/transparence/budget' },
      { label: 'Marchés publics', href: '/appels-offres' },
      { label: 'Rapports annuels', href: '/documents' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`w-full z-50 bg-white transition-shadow duration-300 ${
        isScrolled ? 'sticky top-0 shadow-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 flex-shrink-0">
            {/* Shield logo */}
            <div
              className="flex items-center justify-center w-12 h-14 rounded-t-full text-white font-bold text-lg flex-shrink-0"
              style={{ backgroundColor: '#1a5c2a', clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)' }}
            >
              MP
            </div>
            <div className="hidden sm:block">
              <div
                className="text-sm font-black uppercase tracking-widest leading-none"
                style={{ color: '#1a5c2a' }}
              >
                Mairie de Pita
              </div>
              <div className="text-xs text-gray-500 italic mt-0.5">
                Travail · Solidarité · Développement
              </div>
            </div>
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={link.href}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-colors rounded ${
                    link.active
                      ? 'border-b-2 border-[#1a5c2a] text-[#1a5c2a]'
                      : 'text-gray-700 hover:text-[#1a5c2a]'
                  }`}
                  style={{ color: link.active ? '#1a5c2a' : undefined }}
                >
                  {link.label}
                  {link.dropdown && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </a>

                {/* Dropdown */}
                {link.dropdown && openDropdown === link.label && (
                  <div className="absolute top-full left-0 w-52 bg-white shadow-lg border-t-2 border-[#1a5c2a] z-50 py-1">
                    {link.dropdown.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#1a5c2a] transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: search + mobile toggle */}
          <div className="flex items-center gap-2">
            <button
              className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors"
              style={{ color: '#1a5c2a' }}
              aria-label="Rechercher"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Mobile toggle */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded transition-colors hover:bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              style={{ color: '#1a5c2a' }}
            >
              {mobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          {navLinks.map((link) => (
            <div key={link.label}>
              <button
                className={`w-full flex items-center justify-between px-6 py-3 text-sm font-semibold border-b border-gray-100 ${
                  link.active ? 'text-[#1a5c2a] bg-green-50' : 'text-gray-700'
                }`}
                onClick={() =>
                  link.dropdown
                    ? setOpenDropdown(openDropdown === link.label ? null : link.label)
                    : setMobileOpen(false)
                }
              >
                {link.label}
                {link.dropdown && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
              {link.dropdown && openDropdown === link.label && (
                <div className="bg-gray-50">
                  {link.dropdown.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block px-10 py-2.5 text-sm text-gray-600 hover:text-[#1a5c2a] border-b border-gray-100"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
