'use client';

import { useState } from 'react';

type HeroData = {
  titre: string;
  sousTitre: string;
  ctaPrincipal: string;
  ctaSecondaire: string;
  badge: string;
};

type AccesRapideItem = {
  label: string;
  cta: string;
  lien: string;
};

type ContactData = {
  telephone: string;
  email: string;
  adresse: string;
  horairesSemaine: string;
  horairesSamedi: string;
  facebook: string;
  twitter: string;
  youtube: string;
  instagram: string;
};

type SeoData = {
  titre: string;
  description: string;
  motsCles: string;
};

type TabId = 'hero' | 'acces' | 'contact' | 'seo';

const TABS: { id: TabId; label: string }[] = [
  { id: 'hero', label: 'Héro' },
  { id: 'acces', label: 'Accès rapides' },
  { id: 'contact', label: 'Contact' },
  { id: 'seo', label: 'SEO' },
];

export default function AdminAccueilForm() {
  const [activeTab, setActiveTab] = useState<TabId>('hero');
  const [saving, setSaving] = useState(false);
  const [savedTab, setSavedTab] = useState<TabId | null>(null);

  const [hero, setHero] = useState<HeroData>({
    titre: 'Ensemble, construisons le Pita de demain',
    sousTitre: '',
    ctaPrincipal: 'Découvrir la Commune',
    ctaSecondaire: 'Nos Services',
    badge: 'Commune Urbaine de Pita',
  });

  const [acces, setAcces] = useState<AccesRapideItem[]>([
    { label: 'Services aux citoyens', cta: 'Découvrir', lien: '/services' },
    { label: "Appels d'offres", cta: 'Consulter', lien: '/appels-offres' },
    { label: 'Communiqués officiels', cta: 'Lire', lien: '/actualites' },
    { label: 'Documents à télécharger', cta: 'Accéder', lien: '/documents' },
    { label: 'Événements à venir', cta: 'Voir le calendrier', lien: '/evenements' },
  ]);

  const [contact, setContact] = useState<ContactData>({
    telephone: '+224 123 45 67 89',
    email: 'contact@mairiepita.gov.gn',
    adresse: '',
    horairesSemaine: '08h00 - 17h00',
    horairesSamedi: '08h00 - 12h00',
    facebook: '',
    twitter: '',
    youtube: '',
    instagram: '',
  });

  const [seo, setSeo] = useState<SeoData>({
    titre: '',
    description: '',
    motsCles: '',
  });

  async function handleSave(tab: TabId) {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSavedTab(tab);
    setTimeout(() => setSavedTab(null), 3000);
  }

  function updateAcces(index: number, field: keyof AccesRapideItem, value: string) {
    setAcces((prev) => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
    setSavedTab(null);
  }

  const inputClass = 'w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors';
  const labelClass = 'block text-xs font-semibold text-gray-600 mb-1.5';

  return (
    <div className="flex flex-col gap-6">
      {/* Tab buttons */}
      <div className="flex gap-1 bg-white rounded-xl shadow-sm border border-gray-100 p-1.5">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-all ${
              activeTab === tab.id
                ? 'text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            style={activeTab === tab.id ? { backgroundColor: '#1a5c2a' } : {}}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Success toast */}
      {savedTab && (
        <div className="px-4 py-3 rounded-xl bg-green-50 border border-green-100 text-sm text-green-700 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Modifications enregistrées avec succès !
        </div>
      )}

      {/* Tab: Héro */}
      {activeTab === 'hero' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">Section Héro</h2>
          <div>
            <label className={labelClass}>Titre principal</label>
            <input type="text" value={hero.titre} onChange={(e) => setHero((p) => ({ ...p, titre: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Sous-titre</label>
            <textarea value={hero.sousTitre} onChange={(e) => setHero((p) => ({ ...p, sousTitre: e.target.value }))} rows={2} className={inputClass + ' resize-none'} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Texte du bouton CTA principal</label>
              <input type="text" value={hero.ctaPrincipal} onChange={(e) => setHero((p) => ({ ...p, ctaPrincipal: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Texte du bouton secondaire</label>
              <input type="text" value={hero.ctaSecondaire} onChange={(e) => setHero((p) => ({ ...p, ctaSecondaire: e.target.value }))} className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Badge texte</label>
            <input type="text" value={hero.badge} onChange={(e) => setHero((p) => ({ ...p, badge: e.target.value }))} className={inputClass} />
          </div>
          <div className="pt-2">
            <button type="button" onClick={() => handleSave('hero')} disabled={saving} className="py-2.5 px-6 text-sm font-bold rounded-lg text-white transition-all hover:brightness-110 disabled:opacity-50" style={{ backgroundColor: '#1a5c2a' }}>
              {saving ? 'Enregistrement...' : 'Enregistrer cette section'}
            </button>
          </div>
        </div>
      )}

      {/* Tab: Accès rapides */}
      {activeTab === 'acces' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">Accès rapides</h2>
          {acces.map((item, index) => (
            <div key={index} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Accès #{index + 1}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>Label</label>
                  <input type="text" value={item.label} onChange={(e) => updateAcces(index, 'label', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Texte CTA</label>
                  <input type="text" value={item.cta} onChange={(e) => updateAcces(index, 'cta', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Lien</label>
                  <input type="text" value={item.lien} onChange={(e) => updateAcces(index, 'lien', e.target.value)} className={inputClass} />
                </div>
              </div>
            </div>
          ))}
          <div className="pt-2">
            <button type="button" onClick={() => handleSave('acces')} disabled={saving} className="py-2.5 px-6 text-sm font-bold rounded-lg text-white transition-all hover:brightness-110 disabled:opacity-50" style={{ backgroundColor: '#1a5c2a' }}>
              {saving ? 'Enregistrement...' : 'Enregistrer cette section'}
            </button>
          </div>
        </div>
      )}

      {/* Tab: Contact */}
      {activeTab === 'contact' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">Informations de contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Téléphone</label>
              <input type="text" value={contact.telephone} onChange={(e) => setContact((p) => ({ ...p, telephone: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" value={contact.email} onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))} className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Adresse</label>
            <textarea value={contact.adresse} onChange={(e) => setContact((p) => ({ ...p, adresse: e.target.value }))} rows={2} className={inputClass + ' resize-none'} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Horaires Lun–Ven</label>
              <input type="text" value={contact.horairesSemaine} onChange={(e) => setContact((p) => ({ ...p, horairesSemaine: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Horaires Samedi</label>
              <input type="text" value={contact.horairesSamedi} onChange={(e) => setContact((p) => ({ ...p, horairesSamedi: e.target.value }))} className={inputClass} />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Réseaux sociaux</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {([
                { key: 'facebook', label: 'Facebook URL' },
                { key: 'twitter', label: 'Twitter / X URL' },
                { key: 'youtube', label: 'YouTube URL' },
                { key: 'instagram', label: 'Instagram URL' },
              ] as { key: keyof ContactData; label: string }[]).map(({ key, label }) => (
                <div key={key}>
                  <label className={labelClass}>{label}</label>
                  <input type="url" value={contact[key]} onChange={(e) => setContact((p) => ({ ...p, [key]: e.target.value }))} placeholder="https://" className={inputClass} />
                </div>
              ))}
            </div>
          </div>
          <div className="pt-2">
            <button type="button" onClick={() => handleSave('contact')} disabled={saving} className="py-2.5 px-6 text-sm font-bold rounded-lg text-white transition-all hover:brightness-110 disabled:opacity-50" style={{ backgroundColor: '#1a5c2a' }}>
              {saving ? 'Enregistrement...' : 'Enregistrer cette section'}
            </button>
          </div>
        </div>
      )}

      {/* Tab: SEO */}
      {activeTab === 'seo' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">Référencement (SEO)</h2>
          <div>
            <label className={labelClass}>Titre de la page</label>
            <input type="text" value={seo.titre} onChange={(e) => setSeo((p) => ({ ...p, titre: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Description meta</label>
            <textarea
              value={seo.description}
              onChange={(e) => setSeo((p) => ({ ...p, description: e.target.value.slice(0, 160) }))}
              rows={2}
              className={inputClass + ' resize-none'}
            />
            <p className={`text-xs mt-1 ${seo.description.length >= 150 ? 'text-orange-500' : 'text-gray-400'}`}>
              {seo.description.length} / 160 caractères
            </p>
          </div>
          <div>
            <label className={labelClass}>Mots-clés (séparés par des virgules)</label>
            <input type="text" value={seo.motsCles} onChange={(e) => setSeo((p) => ({ ...p, motsCles: e.target.value }))} placeholder="mairie, pita, commune, guinée..." className={inputClass} />
          </div>
          <div className="pt-2">
            <button type="button" onClick={() => handleSave('seo')} disabled={saving} className="py-2.5 px-6 text-sm font-bold rounded-lg text-white transition-all hover:brightness-110 disabled:opacity-50" style={{ backgroundColor: '#1a5c2a' }}>
              {saving ? 'Enregistrement...' : 'Enregistrer cette section'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
