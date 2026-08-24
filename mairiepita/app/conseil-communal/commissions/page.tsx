'use client';

import { useEffect, useState } from 'react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { commissionsService } from '@/lib/api/commissions.service';

export default function CommissionsPage() {
  const [commissions, setCommissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCommissions();
  }, []);

  const loadCommissions = async () => {
    try {
      const data = await commissionsService.getAll();
      setCommissions(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <TopBar />
      <Navbar />

      <div className="py-12 px-4 text-white" style={{ backgroundColor: '#1a5c2a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <a href="/" className="hover:text-white transition-colors">Accueil</a>
            <span>/</span>
            <a href="/conseil-communal" className="hover:text-white transition-colors">Conseil Communal</a>
            <span>/</span>
            <span className="text-white">Commissions</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
            Les Commissions du Conseil
          </h1>
          <p className="mt-2 text-sm max-w-2xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
            {loading ? 'Chargement...' : `${commissions.length} commission${commissions.length > 1 ? 's' : ''} thématique${commissions.length > 1 ? 's' : ''} pour un travail approfondi.`}
          </p>
        </div>
      </div>

      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto space-y-8">

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-black uppercase tracking-wide mb-4" style={{ color: '#1a5c2a' }}>
              Le rôle des commissions
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Les commissions du Conseil Communal sont des groupes de travail thématiques composés de conseillers élus. 
              Elles étudient les dossiers, préparent les délibérations et formulent des recommandations au conseil en séance plénière. 
              Chaque commission se spécialise dans un domaine spécifique du développement communal.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-green-600"></div>
              <p className="mt-4 text-gray-600">Chargement des commissions...</p>
            </div>
          ) : commissions.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto mb-4 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Aucune commission disponible
              </h2>
              <p className="text-gray-500">
                Les commissions seront publiées prochainement.
              </p>
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
      </section>

      <Footer />
    </main>
  );
}
