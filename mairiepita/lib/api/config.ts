export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  PROFILE: '/auth/profile',
  USERS: '/auth/users',

  // Articles
  ARTICLES: '/articles',
  ARTICLE_BY_ID: (id: string) => `/articles/${id}`,
  ARTICLE_BY_SLUG: (slug: string) => `/articles/slug/${slug}`,

  // Documents
  DOCUMENTS: '/documents',
  DOCUMENT_BY_ID: (id: string) => `/documents/${id}`,
  DOCUMENT_DOWNLOAD: (id: string) => `/documents/${id}/download`,

  // Events
  EVENTS: '/events',
  EVENT_BY_ID: (id: string) => `/events/${id}`,

  // Appels d'offres
  APPELS_OFFRES: '/appels-offres',
  APPEL_OFFRE_BY_ID: (id: string) => `/appels-offres/${id}`,

  // Mot du maire
  MOT_MAIRE: '/mot-maire',

  // Commissions
COMMISSIONS: '/commissions',
COMMISSION_BY_ID: (id: string) => `/commissions/${id}`,
COMMISSIONS_ARCHIVES: '/commissions/archives/list',
COMMISSION_RESTORE: (id: string) => `/commissions/${id}/restore`,

// Membres de commission
MEMBRES_COMMISSION: '/membres-commission',
MEMBRE_COMMISSION_BY_ID: (id: string) => `/membres-commission/${id}`,
MEMBRES_BY_COMMISSION: (commissionId: string) => `/membres-commission/commission/${commissionId}`,
MEMBRES_COMMISSION_ARCHIVES: (commissionId: string) => `/membres-commission/commission/${commissionId}/archives`,
MEMBRE_COMMISSION_RESTORE: (id: string) => `/membres-commission/${id}/restore`,

// Conseillers communaux
CONSEILLERS: '/conseillers',
CONSEILLER_BY_ID: (id: string) => `/conseillers/${id}`,
CONSEILLERS_ARCHIVES: '/conseillers/archives/list',
CONSEILLER_RESTORE: (id: string) => `/conseillers/${id}/restore`,
  
};
