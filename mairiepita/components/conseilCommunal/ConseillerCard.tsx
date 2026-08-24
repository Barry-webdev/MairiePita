'use client';

import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

interface ConseillerCardProps {
  conseiller: {
    _id?: string;
    id?: string;
    nom: string;
    prenom: string;
    fonction: string;
    photo?: string;
    email?: string;
    telephone?: string;
    quartier?: string;
    mandat?: {
      debut?: string;
      fin?: string;
    };
  };
}

export default function ConseillerCard({ conseiller }: ConseillerCardProps) {
  // Définir la couleur du badge selon la fonction
  const getBadgeColor = (fonction: string) => {
    if (fonction.toLowerCase().includes('président')) return 'bg-red-100 text-red-800 border-red-200';
    if (fonction.toLowerCase().includes('vice')) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:border-green-300 hover:shadow-md transition-all">
      {/* Photo */}
      <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
        {conseiller.photo ? (
          <img
            src={conseiller.photo}
            alt={`${conseiller.prenom} ${conseiller.nom}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling!.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={conseiller.photo ? 'hidden' : ''}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-5 space-y-3">
        {/* Nom */}
        <div>
          <h3 className="text-lg font-black text-gray-900">
            {conseiller.prenom} {conseiller.nom}
          </h3>
          <span
            className={`inline-block mt-2 px-3 py-1 text-xs font-bold uppercase rounded-full border ${getBadgeColor(
              conseiller.fonction
            )}`}
          >
            {conseiller.fonction}
          </span>
        </div>

        {/* Quartier */}
        {conseiller.quartier && (
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#1a5c2a' }} />
            <span>{conseiller.quartier}</span>
          </div>
        )}

        {/* Mandat */}
        {conseiller.mandat?.debut && (
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#1a5c2a' }} />
            <span>
              {new Date(conseiller.mandat.debut).getFullYear()}
              {conseiller.mandat.fin && ` - ${new Date(conseiller.mandat.fin).getFullYear()}`}
            </span>
          </div>
        )}

        {/* Contact */}
        <div className="pt-3 border-t border-gray-100 space-y-2">
          {conseiller.email && (
            <a
              href={`mailto:${conseiller.email}`}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="truncate">{conseiller.email}</span>
            </a>
          )}
          {conseiller.telephone && (
            <a
              href={`tel:${conseiller.telephone}`}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{conseiller.telephone}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
