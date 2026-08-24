'use client';

import { useEffect, useState } from 'react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { conseillersService } from '@/lib/api/conseillers.service';
import { commissionsService } from '@/lib/api/commissions.service';

export default function ConseilCommunalPage() {
  const [conseillers, setConseillers] = useState<any[]>([]);
  const [commissions, setCommissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [conseillersData, commissionsData] = await Promise.all([
        conseillersService.getAll(),
        commissionsService.getAll(),
      ]);
      setConseillers(conseillersData);
      setCommissions(commissionsData);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  // Générer des couleurs pour les avatars
  const colors = ['#1a5c2a', '#2d7a3a', '#1565c0', '#6a1b9a', '#e65100', '#388e3c', '#b71c1c', '#00695c', '#00796b', '#0277bd'];
  
  const getInitials = (prenom: string, nom: string) => {
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
  };

  const getColor = (index: number) => {
    return colors[index % colors.length];
  };
  return (
    <main>
      <TopBar />
      <Navbar />
      <div className="py-12 px-4 text-white" style={{ backgroundColor: '#1a5c2a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <a href="/" className="hover:text-white">Accueil</a><span>/</span>
            <span className="text-white">Conseil Communal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">Conseil Communal</h1>
          <p className="mt-2 text-sm max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>Composition, commissions et fonctionnement du Conseil Communal de Pita.</p>
        </div>
      </div>

      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto flex flex-col gap-12">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { 
                label: 'Conseillers', 
                value: loading ? '...' : conseillers.length, 
                icon: <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              },
              { 
                label: 'Commissions', 
                value: loading ? '...' : commissions.length, 
                icon: <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              },
              { 
                label: 'Sessions/an', 
                value: '4', 
                icon: <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center gap-2">
                {s.icon}
                <span className="text-3xl font-black" style={{ color: '#1a5c2a' }}>{s.value}</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Members */}
          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-black uppercase tracking-wide" style={{ color: '#1a5c2a' }}>
                Composition du Conseil
              </h2>
              <a
                href="/conseil-communal/conseillers"
                className="text-sm font-bold hover:underline flex items-center gap-2"
                style={{ color: '#d4a017' }}
              >
                Voir tous
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-green-600"></div>
              </div>
            ) : conseillers.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
                Aucun conseiller disponible
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {conseillers.slice(0, 12).map((conseiller, index) => (
                  <div key={conseiller._id || conseiller.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center text-center gap-3 hover:border-green-300 hover:shadow-md transition-all">
                    {conseiller.photo ? (
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                        <img
                          src={conseiller.photo}
                          alt={`${conseiller.prenom} ${conseiller.nom}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                                <div class="w-20 h-20 rounded-full flex items-center justify-center text-white font-black text-lg" style="background-color: ${getColor(index)}">
                                  ${getInitials(conseiller.prenom, conseiller.nom)}
                                </div>
                              `;
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-black text-lg" style={{ backgroundColor: getColor(index) }}>
                        {getInitials(conseiller.prenom, conseiller.nom)}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-xs text-gray-800">{conseiller.prenom} {conseiller.nom}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{conseiller.fonction}</p>
                      {conseiller.quartier && (
                        <span className="inline-block mt-1.5 px-2 py-0.5 text-xs font-semibold rounded-full text-white" style={{ backgroundColor: getColor(index) }}>
                          {conseiller.quartier}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Commissions */}
          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-black uppercase tracking-wide" style={{ color: '#1a5c2a' }}>
                Les Commissions
              </h2>
              <a
                href="/conseil-communal/commissions"
                className="text-sm font-bold hover:underline flex items-center gap-2"
                style={{ color: '#d4a017' }}
              >
                Voir toutes
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-green-600"></div>
              </div>
            ) : commissions.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
                Aucune commission disponible
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {commissions.map((commission) => (
                  <a
                    key={commission._id || commission.id}
                    href={`/conseil-communal/commissions/${commission._id || commission.id}`}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-3 hover:border-green-300 hover:shadow-md transition-all"
                  >
                    <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="font-black text-sm" style={{ color: '#1a5c2a' }}>{commission.nom}</h3>
                    {commission.description && (
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{commission.description}</p>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="/conseil-communal/deliberations" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:border-green-300 hover:shadow-md transition-all">
              <svg className="w-10 h-10 text-[#1a5c2a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <h3 className="font-black text-sm" style={{ color: '#1a5c2a' }}>Délibérations</h3>
                <p className="text-xs text-gray-500 mt-0.5">Consulter les délibérations du Conseil</p>
              </div>
            </a>
            <a href="/conseil-communal/seances" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:border-green-300 hover:shadow-md transition-all">
              <svg className="w-10 h-10 text-[#1a5c2a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <h3 className="font-black text-sm" style={{ color: '#1a5c2a' }}>Séances</h3>
                <p className="text-xs text-gray-500 mt-0.5">Calendrier et compte-rendus des séances</p>
              </div>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
