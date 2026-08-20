import { API_BASE_URL, API_ENDPOINTS } from './config';
import { authService } from './auth.service';

export interface AppelOffre {
  _id?: string;
  id?: string;
  title: string;
  reference: string;
  description: string;
  category?: string;
  budget?: string;
  deadline: string;
  status: 'Ouvert' | 'Fermé' | 'En cours' | 'Attribué';
  documentUrl?: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

class AppelsOffresService {
  // Récupérer tous les appels d'offres
  async getAll(filters?: { status?: string; published?: boolean }): Promise<AppelOffre[]> {
    let url = `${API_BASE_URL}${API_ENDPOINTS.APPELS_OFFRES}`;
    
    if (filters) {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.published !== undefined) params.append('published', filters.published.toString());
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des appels d\'offres');
    }

    const appelsOffres = await response.json();
    
    return appelsOffres.map((ao: any) => ({
      ...ao,
      id: ao._id || ao.id,
      date: ao.createdAt,
    }));
  }

  // Récupérer un appel d'offre par ID
  async getById(id: string): Promise<AppelOffre> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.APPEL_OFFRE_BY_ID(id)}`);
    
    if (!response.ok) {
      throw new Error('Appel d\'offre non trouvé');
    }

    const appelOffre = await response.json();
    return {
      ...appelOffre,
      id: appelOffre._id || appelOffre.id,
      date: appelOffre.createdAt,
    };
  }

  // Créer un appel d'offre (admin uniquement)
  async create(appelOffreData: Partial<AppelOffre>): Promise<AppelOffre> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.APPELS_OFFRES}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(appelOffreData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création');
    }

    const result = await response.json();
    return result.appelOffre;
  }

  // Mettre à jour un appel d'offre
  async update(id: string, appelOffreData: Partial<AppelOffre>): Promise<AppelOffre> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.APPEL_OFFRE_BY_ID(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(appelOffreData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour');
    }

    const result = await response.json();
    return result.appelOffre;
  }

  // Supprimer un appel d'offre
  async delete(id: string): Promise<void> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.APPEL_OFFRE_BY_ID(id)}`, {
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

export const appelsOffresService = new AppelsOffresService();
