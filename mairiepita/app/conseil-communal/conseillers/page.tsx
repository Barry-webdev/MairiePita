'use client';

import { useEffect, useState } from 'react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { conseillersService } from '@/lib/api/conseillers.service';
import { Filter } from 'lucide-react';

export default function ConseillersPage() {
  const [conseillers, setConseillers] = useState<any[]>([]);
  const [filteredConseillers, setFilteredConseillers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterFonction, setFilterFonction] = useState('tous');

  useEffect(() => {
    loadConseillers();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filterFonction, conseillers]);

  const loadConseillers = async () => {
    try {
      const data = await conseillersService.getAll();
      setConseillers(data);
      setFilteredConseillers(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = () => {
    if (filterFonction === 'tous') {
      setFilteredConseillers(conseillers);
    } else {
      setFilteredConseillers(
        conseillers.filter((c) => c.fonction.toLowerCase().includes(filterFonction.toLowerCase()))
      );
    }
  };

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
            <a href="/" className="hover:text-white transition-colors">Accueil</a>
            <span>/</span>
            <a href="/conseil-communal" className="hover:text-white transition-colors">Conseil Communal</a>
            <span>/</span>
            <span className="text-white">Conseillers</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
            Nos Conseillers Communaux
          </h1>
          <p className="mt-2 text-sm max-w-2xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
            {loading ? 'Chargement...' : `${filteredConseillers.length} conseiller${filteredConseillers.length > 1 ? 's' : ''} au service de la commune de Pita.`}
          </p>
        </div>
      </div>

      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto">

          <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5" style={{ color: '#1a5c2a' }} />
              <h3 className="font-black uppercase text-sm">Filtrer par fonction</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {['tous', 'président', 'vice', 'conseiller'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFilterFonction(filter)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    filterFonction === filter
                      ? 'text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={filterFonction === filter ? { backgroundColor: '#1a5c2a' } : {}}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  {filter !== 'tous' && filter !== 'vice' ? 's' : ''}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-green-600"></div>
              <p className="mt-4 text-gray-600">Chargement des conseillers...</p>
            </div>
          ) : filteredConseillers.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <p className="text-gray-500">Aucun conseiller trouvé avec ce filtre.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {filteredConseillers.map((conseiller, index) => (
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
      </section>

      <Footer />
    </main>
  );
}
