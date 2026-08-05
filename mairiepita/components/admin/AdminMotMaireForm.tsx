'use client';

import { useState } from 'react';

type FormData = {
  nom: string;
  titre: string;
  email: string;
  telephone: string;
  mandat: string;
  messageCourt: string;
  messageComplet: string;
  signature: string;
};

export default function AdminMotMaireForm() {
  const [form, setForm] = useState<FormData>({
    nom: '',
    titre: 'Maire de la Commune Urbaine de Pita',
    email: '',
    telephone: '',
    mandat: '2022 — 2027',
    messageCourt: '',
    messageComplet: '',
    signature: 'Le Maire',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  async function handleSave(e: React.MouseEvent) {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main content */}
      <div className="flex-1 flex flex-col gap-6">

        {/* Identité */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Identité du Maire</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Nom complet du Maire <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.nom}
                onChange={(e) => handleChange('nom', e.target.value)}
                placeholder="Ex : Mamadou Cellou Diallo"
                required
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Titre / Fonction</label>
              <input
                type="text"
                value={form.titre}
                onChange={(e) => handleChange('titre', e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email du bureau</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="maire@mairiepita.gov.gn"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Téléphone du bureau</label>
              <input
                type="text"
                value={form.telephone}
                onChange={(e) => handleChange('telephone', e.target.value)}
                placeholder="+224 000 00 00 00"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Mandat</label>
              <input
                type="text"
                value={form.mandat}
                onChange={(e) => handleChange('mandat', e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Signature</label>
              <input
                type="text"
                value={form.signature}
                onChange={(e) => handleChange('signature', e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Message court */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Message court <span className="text-gray-400 font-normal normal-case">(affiché sur la page d'accueil)</span>
          </label>
          <textarea
            value={form.messageCourt}
            onChange={(e) => handleChange('messageCourt', e.target.value.slice(0, 300))}
            placeholder="Un message court et percutant pour la page d'accueil..."
            rows={3}
            className="w-full px-4 py-3 text-sm text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors resize-none"
          />
          <p className={`text-xs mt-1 ${form.messageCourt.length >= 280 ? 'text-orange-500' : 'text-gray-400'}`}>
            {form.messageCourt.length} / 300 caractères
          </p>
        </div>

        {/* Message complet */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Message complet <span className="text-gray-400 font-normal normal-case">(page /la-commune/mot-du-maire)</span>
          </label>
          <textarea
            value={form.messageComplet}
            onChange={(e) => handleChange('messageComplet', e.target.value)}
            placeholder="Rédigez ici le message complet du Maire destiné à la page dédiée..."
            rows={8}
            className="w-full px-4 py-3 text-sm text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors resize-y"
          />
          <p className="text-xs text-gray-400 mt-1">{form.messageComplet.length} caractères</p>
        </div>

        {/* Photo */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
            Photo du Maire
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer bg-gray-50 ${
              dragOver ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
          >
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Glissez la photo ici</p>
              <p className="text-xs text-gray-400 mt-1">ou <span className="text-green-600 font-semibold">parcourir les fichiers</span></p>
            </div>
            <p className="text-xs text-gray-400">PNG, JPG, WEBP — max 5 MB</p>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            💡 Fonctionnalité disponible après connexion à la base de données.
          </p>
        </div>

      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-6 flex-shrink-0">

        {/* Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Actions</h3>

          {saved && (
            <div className="mb-4 px-3 py-2 rounded-lg bg-green-50 border border-green-100 text-sm text-green-700 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Modifications enregistrées avec succès !
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="w-full py-2.5 text-sm font-semibold rounded-lg border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="w-full py-2.5 text-sm font-bold rounded-lg text-white transition-all hover:brightness-110 disabled:opacity-50"
              style={{ backgroundColor: '#1a5c2a' }}
            >
              {saving ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Publication...
                </span>
              ) : (
                'Publier les modifications'
              )}
            </button>
          </div>
        </div>

        {/* Preview card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Aperçu page d'accueil</h3>
          <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">
                  {form.nom || 'Nom du Maire'}
                </p>
                <p className="text-xs text-gray-500 truncate">{form.titre}</p>
                <p className="text-xs text-gray-400 mt-0.5">{form.mandat}</p>
              </div>
            </div>
            {form.messageCourt && (
              <p className="mt-3 text-xs text-gray-600 italic line-clamp-3">
                « {form.messageCourt} »
              </p>
            )}
            {!form.messageCourt && (
              <p className="mt-3 text-xs text-gray-400 italic">
                Le message court s'affichera ici...
              </p>
            )}
            <p className="mt-2 text-xs font-semibold" style={{ color: '#1a5c2a' }}>
              — {form.signature || 'Le Maire'}
            </p>
          </div>
        </div>

        {/* Lien */}
        <a
          href="/la-commune/mot-du-maire"
          target="_blank"
          className="flex items-center justify-center gap-2 py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Voir la page publique
        </a>

      </div>
    </div>
  );
}
