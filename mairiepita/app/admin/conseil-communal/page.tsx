'use client';

import { useRouter } from 'next/navigation';
import { FileText, Users, ArrowRight } from 'lucide-react';

export default function ConseilCommunalPage() {
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Conseil Communal</h1>
        <p className="text-gray-600">Gestion des commissions et des conseillers communaux</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Card Commissions */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Commissions</h2>
              <p className="text-sm text-gray-600">Gérer les commissions et leurs membres</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">
            Créez et gérez les différentes commissions communales (Finances, Urbanisme, etc.) 
            et ajoutez les membres de chaque commission.
          </p>

          <button
            onClick={() => router.push('/admin/conseil-communal/commissions')}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
          >
            Gérer les commissions
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Card Conseillers */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Conseillers Communaux</h2>
              <p className="text-sm text-gray-600">Gérer les membres du conseil</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">
            Ajoutez et gérez les conseillers communaux avec leurs fonctions, mandats 
            et informations de contact.
          </p>

          <button
            onClick={() => router.push('/admin/conseil-communal/conseillers')}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700"
          >
            Gérer les conseillers
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
