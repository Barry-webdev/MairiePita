export type Evenement = {
  id: string;
  title: string;
  category: string;
  lieu: string;
  dateDebut: string;
  dateFin: string;
  heureDebut: string;
  heureFin: string;
  description: string;
  published: boolean;
};

export const EVENEMENT_CATEGORIES = [
  { label: 'Tous', value: '' },
  { label: 'Conseil communal', value: 'Conseil communal' },
  { label: 'Cérémonie officielle', value: 'Cérémonie officielle' },
  { label: 'Santé', value: 'Santé' },
  { label: 'Éducation', value: 'Éducation' },
  { label: 'Culture & Sport', value: 'Culture & Sport' },
  { label: 'Environnement', value: 'Environnement' },
  { label: 'Formation', value: 'Formation' },
];

export const EVENEMENT_CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  'Conseil communal':   { bg: '#dcfce7', text: '#15803d' },
  'Cérémonie officielle': { bg: '#fef9c3', text: '#854d0e' },
  'Santé':              { bg: '#fee2e2', text: '#b91c1c' },
  'Éducation':          { bg: '#dbeafe', text: '#1d4ed8' },
  'Culture & Sport':    { bg: '#f3e8ff', text: '#7e22ce' },
  'Environnement':      { bg: '#d1fae5', text: '#065f46' },
  'Formation':          { bg: '#fce7f3', text: '#9d174d' },
};

export const mockEvenements: Evenement[] = [
  {
    id: '1',
    title: 'Session ordinaire du Conseil communal',
    category: 'Conseil communal',
    lieu: 'Salle du Conseil — Mairie de Pita',
    dateDebut: '2024-06-15',
    dateFin: '2024-06-15',
    heureDebut: '09:00',
    heureFin: '17:00',
    description: 'Session ordinaire du Conseil communal pour l\'examen du budget et des délibérations de mi-année.',
    published: true,
  },
  {
    id: '2',
    title: 'Fête nationale de la Guinée',
    category: 'Cérémonie officielle',
    lieu: 'Place de l\'Indépendance, Pita',
    dateDebut: '2024-10-02',
    dateFin: '2024-10-02',
    heureDebut: '08:00',
    heureFin: '13:00',
    description: 'Célébration de la fête nationale de la République de Guinée avec défilé militaire et civil.',
    published: true,
  },
  {
    id: '3',
    title: 'Campagne de vaccination — Phase 3',
    category: 'Santé',
    lieu: 'Centre de santé de Pita et sous-préfectures',
    dateDebut: '2024-07-01',
    dateFin: '2024-07-10',
    heureDebut: '08:00',
    heureFin: '16:00',
    description: 'Troisième phase de la campagne de vaccination contre la méningite et la polio. Vaccination gratuite pour tous les enfants de moins de 5 ans.',
    published: true,
  },
  {
    id: '4',
    title: 'Forum communal de l\'éducation',
    category: 'Éducation',
    lieu: 'Lycée de Pita',
    dateDebut: '2024-06-28',
    dateFin: '2024-06-29',
    heureDebut: '09:00',
    heureFin: '17:00',
    description: 'Forum réunissant enseignants, parents d\'élèves et autorités locales pour discuter de l\'amélioration du système éducatif à Pita.',
    published: true,
  },
  {
    id: '5',
    title: 'Festival culturel de Pita 2024',
    category: 'Culture & Sport',
    lieu: 'Stade municipal de Pita',
    dateDebut: '2024-07-20',
    dateFin: '2024-07-22',
    heureDebut: '14:00',
    heureFin: '23:00',
    description: 'Festival culturel annuel de la commune avec danses traditionnelles, musiques et expositions artisanales.',
    published: true,
  },
  {
    id: '6',
    title: 'Journée de reboisement communautaire',
    category: 'Environnement',
    lieu: 'Périphérie nord de Pita',
    dateDebut: '2024-06-05',
    dateFin: '2024-06-05',
    heureDebut: '07:00',
    heureFin: '13:00',
    description: 'Journée de reboisement organisée dans le cadre de la journée mondiale de l\'environnement. Plantation de 2000 arbres.',
    published: false,
  },
];
