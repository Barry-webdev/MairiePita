export type AppelOffre = {
  id: string;
  reference: string;
  title: string;
  category: string;
  status: 'Ouvert' | 'Clôturé' | 'Attribué' | 'Annulé';
  budget: string;
  datePublication: string;
  dateLimite: string;
  description: string;
  published: boolean;
};

export const APPEL_CATEGORIES = [
  { label: 'Toutes', value: '' },
  { label: 'Travaux', value: 'Travaux' },
  { label: 'Fournitures', value: 'Fournitures' },
  { label: 'Services', value: 'Services' },
  { label: 'Études', value: 'Études' },
];

export const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  'Ouvert':   { bg: '#dcfce7', text: '#15803d' },
  'Clôturé':  { bg: '#fee2e2', text: '#b91c1c' },
  'Attribué': { bg: '#dbeafe', text: '#1d4ed8' },
  'Annulé':   { bg: '#f3f4f6', text: '#6b7280' },
};

export const mockAppelsOffres: AppelOffre[] = [
  { id: '1', reference: 'AO-2024-001', title: 'Construction du marché central de Pita', category: 'Travaux', status: 'Ouvert', budget: '850 000 000 GNF', datePublication: '2024-04-20', dateLimite: '2024-06-30', description: 'Construction d\'un marché central moderne incluant boutiques, sanitaires et espaces communs.', published: true },
  { id: '2', reference: 'AO-2024-002', title: 'Fourniture de matériels informatiques', category: 'Fournitures', status: 'Clôturé', budget: '120 000 000 GNF', datePublication: '2024-03-01', dateLimite: '2024-04-15', description: 'Acquisition d\'ordinateurs, imprimantes et accessoires pour les services municipaux.', published: true },
  { id: '3', reference: 'AO-2024-003', title: 'Réhabilitation de la voirie urbaine — Phase 2', category: 'Travaux', status: 'Ouvert', budget: '2 500 000 000 GNF', datePublication: '2024-05-10', dateLimite: '2024-07-15', description: 'Travaux de bitumage et réhabilitation de 8 km de voirie dans la commune urbaine.', published: true },
  { id: '4', reference: 'AO-2024-004', title: 'Étude de faisabilité — Réseau d\'eau potable', category: 'Études', status: 'Attribué', budget: '45 000 000 GNF', datePublication: '2024-02-10', dateLimite: '2024-03-20', description: 'Étude pour l\'extension du réseau d\'eau potable dans les quartiers périphériques.', published: true },
  { id: '5', reference: 'AO-2024-005', title: 'Collecte et gestion des déchets solides', category: 'Services', status: 'Ouvert', budget: '300 000 000 GNF', datePublication: '2024-05-25', dateLimite: '2024-07-01', description: 'Contrat de prestation pour la collecte, le transport et le traitement des déchets solides.', published: true },
  { id: '6', reference: 'AO-2024-006', title: 'Acquisition de véhicules de service', category: 'Fournitures', status: 'Annulé', budget: '200 000 000 GNF', datePublication: '2024-01-20', dateLimite: '2024-02-28', description: 'Achat de véhicules utilitaires pour les équipes techniques de la mairie.', published: false },
];
