'use client';

import { useState, useEffect } from 'react';
import { motMaireService } from '@/lib/api/motMaire.service';

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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [archiveSuccess, setArchiveSuccess] = useState('');
  const [imageKey, setImageKey] = useState(Date.now()); // Pour forcer le rechargement de l'image

  useEffect(() => {
    loadMotMaire();
  }, []);

  async function loadMotMaire() {
    try {
      setLoading(true);
      const data = await motMaireService.get();
      
      if (data) {
        setForm({
          nom: data.nom || '',
          titre: data.titre || 'Maire de la Commune Urbaine de Pita',
          email: data.email || '',
          telephone: data.telephone || '',
          mandat: data.mandat || '2022 — 2027',
          messageCourt: data.messageCourt || '',
          messageComplet: data.messageComplet || '',
          signature: data.signature || 'Le Maire',
        });
      }
    } catch (err: any) {
      console.error('Erreur chargement:', err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
    setError('');
  }

  async function handleSave(e: React.MouseEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await motMaireService.createOrUpdate(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setSaving(false);
    }
  }

  async function handleArchiveAndReset() {
    try {
      setArchiving(true);
      setError('');
      setArchiveSuccess('');
      
      const result = await motMaireService.archiveAndReset();
      
      // Fermer le modal
      setShowArchiveModal(false);
      
      // Afficher le message de succès du backend
      setArchiveSuccess(
        result.message || 'Maire archivé avec succès !' + 
        ' N\'oubliez pas de remplacer la photo maire.jpg dans le dossier public/ pour le nouveau maire.'
      );
      
      // Vider le formulaire
      setForm({
        nom: '',
        titre: 'Maire de la Commune Urbaine de Pita',
        email: '',
        telephone: '',
        mandat: '2022 — 2027',
        messageCourt: '',
        messageComplet: '',
        signature: 'Le Maire',
      });
      
      // Forcer le rechargement de l'image
      setImageKey(Date.now());
      
      // Recharger les données après 3 secondes
      setTimeout(() => {
        setArchiveSuccess('');
        loadMotMaire();
      }, 3000);
      
    } catch (error: any) {
      console.error('Erreur archivage:', error);
      setError(error.message || 'Erreur lors de l\'archivage');
      setShowArchiveModal(false);
    } finally {
      setArchiving(false);
    }
  }


  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main content */}
      <div className="flex-1 flex flex-col gap-6">

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">❌ {error}</p>
          </div>
        )}

        {archiveSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700 text-sm">{archiveSuccess}</p>
          </div>
        )}

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

          {/* Photo actuelle */}
          <div className="flex flex-col sm:flex-row gap-6 mb-5">
            <div className="flex-shrink-0">
              <p className="text-xs text-gray-500 mb-2 font-semibold">Photo actuelle :</p>
              <div className="w-28 h-36 rounded-lg overflow-hidden border-2 border-green-200" style={{ backgroundColor: '#e5e7eb' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={imageKey}
                  src={`/maire.jpg?t=${imageKey}`}
                  alt="Photo du Maire"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-full h-full flex flex-col items-center justify-center gap-1"><svg xmlns=\'http://www.w3.org/2000/svg\' class=\'h-10 w-10\' viewBox=\'0 0 24 24\' fill=\'#9ca3af\'><path d=\'M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z\'/></svg><span style=\'font-size:10px;color:#9ca3af\'>Aucune photo</span></div>';
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <div className="p-4 rounded-lg border border-blue-100 bg-blue-50">
                <p className="text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Comment changer la photo ?
                </p>
                <ol className="text-xs text-blue-700 flex flex-col gap-1.5 list-decimal list-inside">
                  <li>Préparez la photo au format <strong>JPG ou PNG</strong></li>
                  <li>Renommez le fichier exactement : <strong>maire.jpg</strong></li>
                  <li>Copiez-le dans le dossier : <strong>public/</strong> du projet</li>
                  <li>La photo s&apos;affichera automatiquement sur tout le site</li>
                </ol>
              </div>
              <div className="p-3 rounded-lg border border-gray-100 bg-gray-50 text-xs text-gray-500">
                <p className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  Chemin exact :
                </p>
                <code className="text-green-700 font-mono text-xs break-all">mairiepita/public/maire.jpg</code>
              </div>
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd" />
                </svg>
                Format recommandé : portrait, minimum 400×500px, fond neutre.
              </p>
            </div>
          </div>
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

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="w-full py-2.5 text-sm font-bold rounded-lg text-white transition-all hover:brightness-110 disabled:opacity-50"
              style={{ backgroundColor: '#1a5c2a' }}
            >
              {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
            
            {/* Bouton Archiver (seulement si un maire existe) */}
            {form.nom && (
              <button
                type="button"
                onClick={() => setShowArchiveModal(true)}
                className="flex-1 px-6 py-3 text-sm font-bold bg-orange-600 text-white rounded-lg transition-all hover:bg-orange-700"
              >
                Archiver et changer de maire
              </button>
            )}
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
      {/* Modal de confirmation archivage */}
      {showArchiveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-center text-gray-800 mb-2">
              Archiver le maire actuel ?
            </h3>
            <p className="text-sm text-center text-gray-600 mb-2">
              Le maire actuel <strong>{form.nom}</strong> sera archivé avec toutes ses informations.
            </p>
            <p className="text-sm text-center text-gray-500 mb-6">
              Le formulaire sera vidé pour que vous puissiez saisir le nouveau maire.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowArchiveModal(false)}
                className="flex-1 py-2.5 text-sm font-semibold rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleArchiveAndReset}
                disabled={archiving}
                className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-orange-600 hover:bg-orange-700 transition-colors text-white disabled:opacity-50"
              >
                {archiving ? 'Archivage...' : 'Archiver'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
