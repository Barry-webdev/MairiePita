// Données mockées — à remplacer par des appels API/DB plus tard

export type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryColor: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  published: boolean;
  imageBg: string;
};

export const CATEGORIES = [
  { label: 'Tous', value: '' },
  { label: 'Conseil Communal', value: 'Conseil Communal' },
  { label: 'Environnement', value: 'Environnement' },
  { label: 'Éducation', value: 'Éducation' },
  { label: 'Eau & Assainissement', value: 'Eau & Assainissement' },
  { label: 'Infrastructures', value: 'Infrastructures' },
  { label: 'Santé', value: 'Santé' },
  { label: 'Culture', value: 'Culture' },
];

export const CATEGORY_COLORS: Record<string, string> = {
  'Conseil Communal': '#1a5c2a',
  'Environnement': '#388e3c',
  'Éducation': '#1565c0',
  'Eau & Assainissement': '#00695c',
  'Infrastructures': '#e65100',
  'Santé': '#c62828',
  'Culture': '#6a1b9a',
};

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Session ordinaire du Conseil communal',
    slug: 'session-ordinaire-conseil-communal',
    category: 'Conseil Communal',
    categoryColor: '#1a5c2a',
    excerpt: 'Le Conseil communal de Pita s\'est réuni en session ordinaire pour examiner les délibérations relatives au budget et aux projets de développement.',
    content: 'Le Conseil communal de Pita s\'est réuni en session ordinaire pour examiner les délibérations relatives au budget et aux projets de développement de la commune pour l\'exercice en cours.',
    author: 'Service Communication',
    date: '2024-05-28',
    published: true,
    imageBg: '#1a5c2a',
  },
  {
    id: '2',
    title: 'Campagne de reboisement : Pita se mobilise',
    slug: 'campagne-reboisement-pita',
    category: 'Environnement',
    categoryColor: '#388e3c',
    excerpt: 'Des centaines de citoyens se sont mobilisés pour planter des milliers d\'arbres dans le cadre de la campagne nationale de reboisement.',
    content: 'Des centaines de citoyens se sont mobilisés pour planter des milliers d\'arbres dans le cadre de la campagne nationale de reboisement. La Mairie de Pita salue cet élan citoyen.',
    author: 'Service Environnement',
    date: '2024-05-24',
    published: true,
    imageBg: '#388e3c',
  },
  {
    id: '3',
    title: "Réhabilitation de l'école primaire de Daremagnan",
    slug: 'rehabilitation-ecole-daremagnan',
    category: 'Éducation',
    categoryColor: '#1565c0',
    excerpt: 'Les travaux de réhabilitation de l\'école primaire de Daremagnan ont été lancés officiellement en présence du Maire et des autorités locales.',
    content: 'Les travaux de réhabilitation de l\'école primaire de Daremagnan ont été lancés officiellement en présence du Maire et des autorités locales. Ce projet bénéficiera à plus de 500 élèves.',
    author: 'Service Éducation',
    date: '2024-05-20',
    published: true,
    imageBg: '#1976d2',
  },
  {
    id: '4',
    title: "Nouveau château d'eau pour le quartier Koliady",
    slug: 'chateau-eau-koliady',
    category: 'Eau & Assainissement',
    categoryColor: '#00695c',
    excerpt: 'La construction d\'un nouveau château d\'eau au quartier Koliady permettra d\'améliorer l\'accès à l\'eau potable pour plus de 2000 habitants.',
    content: 'La construction d\'un nouveau château d\'eau au quartier Koliady permettra d\'améliorer l\'accès à l\'eau potable pour plus de 2000 habitants de la commune.',
    author: 'Service Hydraulique',
    date: '2024-05-18',
    published: true,
    imageBg: '#00695c',
  },
  {
    id: '5',
    title: 'Travaux de bitumage de la voirie urbaine',
    slug: 'travaux-bitumage-voirie',
    category: 'Infrastructures',
    categoryColor: '#e65100',
    excerpt: 'La Mairie de Pita poursuit les travaux de réhabilitation des rues et avenues pour un meilleur cadre de vie des citoyens.',
    content: 'La Mairie de Pita poursuit les travaux de réhabilitation des rues et avenues pour un meilleur cadre de vie des citoyens. Le projet couvre 15 km de voirie urbaine.',
    author: 'Service Travaux',
    date: '2024-05-31',
    published: true,
    imageBg: '#bf360c',
  },
  {
    id: '6',
    title: 'Journée mondiale de la santé célébrée à Pita',
    slug: 'journee-mondiale-sante-pita',
    category: 'Santé',
    categoryColor: '#c62828',
    excerpt: 'La commune de Pita a célébré la journée mondiale de la santé avec des consultations gratuites et des sensibilisations dans les quartiers.',
    content: 'La commune de Pita a célébré la journée mondiale de la santé avec des consultations gratuites et des sensibilisations dans les quartiers.',
    author: 'Service Santé',
    date: '2024-04-07',
    published: true,
    imageBg: '#b71c1c',
  },
  {
    id: '7',
    title: 'Festival culturel de Pita : appel à participation',
    slug: 'festival-culturel-pita',
    category: 'Culture',
    categoryColor: '#6a1b9a',
    excerpt: 'La Mairie de Pita lance un appel à participation pour le prochain festival culturel qui se tiendra en juillet 2024.',
    content: 'La Mairie de Pita lance un appel à participation pour le prochain festival culturel qui se tiendra en juillet 2024.',
    author: 'Service Culture',
    date: '2024-04-15',
    published: false,
    imageBg: '#4a148c',
  },
  {
    id: '8',
    title: 'Appel d\'offres : construction du marché central',
    slug: 'appel-offres-marche-central',
    category: 'Infrastructures',
    categoryColor: '#e65100',
    excerpt: 'La Mairie de Pita lance un appel d\'offres pour la construction du nouveau marché central de la commune.',
    content: 'La Mairie de Pita lance un appel d\'offres pour la construction du nouveau marché central de la commune. Les dossiers sont à déposer avant le 30 juin 2024.',
    author: 'Service Marchés Publics',
    date: '2024-04-20',
    published: true,
    imageBg: '#e65100',
  },
];
