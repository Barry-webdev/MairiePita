'use client';

import { use, useEffect, useState } from 'react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { commissionsService } from '@/lib/api/commissions.service';
import { membresCommissionService } from '@/lib/api/membresCommission.service';
import { ArrowLeft, Users, Mail, Phone } from 'lucide-react';

export default function CommissionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const commissionId = resolvedParams.slug;

  const [commission, setCommission] = useState<any>(null);
  const [membres, setMembres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [commissionId]);

  const loadData = async () => {
    try {
      const [commissionData, membresData] = await Promise.all([
        commissionsService.getById(commissionId),
        membresCommissionService.getByCommission(commissionId),
      ]);
      setCommission(commissionData);
      setMembres(membresData);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBadgeColor = (fonction: string) => {
    if (fonction.toLowerCase().includes('président')) return 'bg-red-100 text-red-800 border-red-200';
    if (fonction.toLowerCase().includes('vice')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (fonction.toLowerCase().includes('secrétaire')) return 'bg-purple-100 text-purple-800 border-purple-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const colors = ['#1a5c2a', '#2d7a3a', '#1565c0', '#6a1b9a', '#e65100', '#388e3c', '#b71c1c', '#00695c', '#00796b', '#0277bd'];
  
  const getInitials = (prenom: string, nom: string) => {
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
  };

  const getColor = (index: number) => {
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <main>
        <TopBar />
        <Navbar />
        <div className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
          <div className="max-w-7xl mx-auto text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-green-600"></div>
            <p className="mt-4 text-gray-600">Chargement...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!commission) {
    return (
      <main>
        <TopBar />
        <Navbar />
        <div className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
          <div className="max-w-7xl mx-auto text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Commission introuvable</h2>
            <a href="/conseil-communal/commissions" className="text-green-600 hover:underline">
              Retour aux commissions
            </a>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

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
            <a href="/conseil-communal/commissions" className="hover:text-white transition-colors">Commissions</a>
            <span>/</span>
            <span className="text-white">{commission.nom}</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <a
              href="/conseil-communal/commissions"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </a>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
              {commission.nom}
            </h1>
          </div>
          {commission.description && (
            <p className="mt-2 text-sm max-w-3xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {commission.description}
            </p>
          )}
        </div>
      </div>

      <section className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto space-y-8">

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-50">
                <Users className="w-10 h-10" style={{ color: '#1a5c2a' }} />
              </div>
              <div>
                <div className="text-3xl font-black" style={{ color: '#1a5c2a' }}>
                  {membres.length}
                </div>
                <div className="text-sm font-semibold text-gray-500 uppercase">
                  Membre{membres.length > 1 ? 's' : ''} de la commission
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wide mb-6" style={{ color: '#1a5c2a' }}>
              Composition de la commission
            </h2>

            {membres.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Aucun membre
                </h3>
                <p className="text-gray-500">
                  La composition de cette commission sera publiée prochainement.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {membres.map((membre, index) => (
                  <div
                    key={membre._id || membre.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center text-center gap-3 hover:border-green-300 hover:shadow-md transition-all"
                  >
                    {membre.photo ? (
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                        <img
                          src={membre.photo}
                          alt={`${membre.prenom} ${membre.nom}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                                <div class="w-20 h-20 rounded-full flex items-center justify-center text-white font-black text-lg" style="background-color: ${getColor(index)}">
                                  ${getInitials(membre.prenom, membre.nom)}
                                </div>
                              `;
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-black text-lg" style={{ backgroundColor: getColor(index) }}>
                        {getInitials(membre.prenom, membre.nom)}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-xs text-gray-800">
                        {membre.prenom} {membre.nom}
                      </p>
                      <span
                        className={`inline-block mt-2 px-2 py-0.5 text-xs font-bold uppercase rounded-full border ${getBadgeColor(
                          membre.fonction
                        )}`}
                      >
                        {membre.fonction}
                      </span>
                      {(membre.email || membre.telephone) && (
                        <div className="mt-2 pt-2 border-t border-gray-100 space-y-1">
                          {membre.email && (
                            <a
                              href={`mailto:${membre.email}`}
                              className="flex items-center justify-center gap-1 text-xs text-gray-600 hover:text-green-700"
                              title={membre.email}
                            >
                              <Mail className="w-3 h-3" />
                            </a>
                          )}
                          {membre.telephone && (
                            <a
                              href={`tel:${membre.telephone}`}
                              className="flex items-center justify-center gap-1 text-xs text-gray-600 hover:text-green-700"
                              title={membre.telephone}
                            >
                              <Phone className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
