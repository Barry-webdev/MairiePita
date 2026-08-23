import { API_BASE_URL } from './config';
import { authService } from './auth.service';

export interface Archive {
  _id?: string;
  id?: string;
  nom: string;
  titre: string;
  mandat: string;
  photo?: string;
  biographie?: string;
  realisations?: string;
  email?: string;
  telephone?: string;
  archivedAt?: string;
}

class ArchivesService {
  // Public - récupérer toutes les archives
  async getAll(): Promise<Archive[]> {
    const response = await fetch(`${API_BASE_URL}/archives`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des archives');
    }

    const archives = await response.json();
    return archives.map((archive: any) => ({
      ...archive,
      id: archive._id || archive.id,
    }));
  }

  // Admin - créer une archive
  async create(data: Partial<Archive>): Promise<Archive> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}/archives`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création');
    }

    const result = await response.json();
    return result.archive;
  }

  // Admin - supprimer une archive
  async delete(id: string): Promise<void> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}/archives/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la suppression');
    }
  }
}

export const archivesService = new ArchivesService();
