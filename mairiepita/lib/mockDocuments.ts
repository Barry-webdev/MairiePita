export type Document = {
  id: string;
  title: string;
  category: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX' | 'ZIP';
  fileSize: string;
  description: string;
  date: string;
  published: boolean;
  downloadCount: number;
};

export const DOCUMENT_CATEGORIES = [
  { label: 'Tous', value: '' },
  { label: 'Budget', value: 'Budget' },
  { label: 'Délibérations', value: 'Délibérations' },
  { label: 'Règlements', value: 'Règlements' },
  { label: 'Rapports', value: 'Rapports' },
  { label: 'Formulaires', value: 'Formulaires' },
  { label: 'Plans & Cartes', value: 'Plans & Cartes' },
];

export const mockDocuments: Document[] = [
  { id: '1', title: 'Budget communal 2024', category: 'Budget', fileType: 'PDF', fileSize: '2.4 MB', description: 'Budget primitif de la commune de Pita pour l\'exercice 2024.', date: '2024-01-15', published: true, downloadCount: 42 },
  { id: '2', title: 'Délibérations — Session mars 2024', category: 'Délibérations', fileType: 'PDF', fileSize: '1.1 MB', description: 'Procès-verbal et délibérations de la session ordinaire de mars 2024.', date: '2024-03-28', published: true, downloadCount: 18 },
  { id: '3', title: 'Règlement intérieur du Conseil communal', category: 'Règlements', fileType: 'PDF', fileSize: '0.8 MB', description: 'Règlement intérieur adopté en session plénière.', date: '2023-11-10', published: true, downloadCount: 31 },
  { id: '4', title: 'Rapport annuel 2023', category: 'Rapports', fileType: 'PDF', fileSize: '5.2 MB', description: 'Rapport d\'activités annuel de la Mairie de Pita — exercice 2023.', date: '2024-02-20', published: true, downloadCount: 67 },
  { id: '5', title: 'Formulaire de demande d\'état civil', category: 'Formulaires', fileType: 'DOCX', fileSize: '0.2 MB', description: 'Formulaire à remplir pour toute demande d\'acte d\'état civil.', date: '2024-01-05', published: true, downloadCount: 124 },
  { id: '6', title: 'Plan d\'urbanisme de la commune', category: 'Plans & Cartes', fileType: 'PDF', fileSize: '8.7 MB', description: 'Plan d\'occupation des sols et carte d\'urbanisme de Pita.', date: '2023-09-15', published: false, downloadCount: 0 },
];
