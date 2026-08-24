import { API_BASE_URL, API_ENDPOINTS } from './config';
import { authService } from './auth.service';

export interface Conseiller {
  _id?: string;
  id?: string;
  nom: string;
  prenom: string;
  fonction: string;
  photo?: string;
  telephone?: string;
  email?: string;
  quartier?: string;
  mandat?: {
    debut?: string;
    fin?: string;
  };
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

class ConseillersService {
  // Récupérer tous les conseillers actifs
  async getAll(): Promise<Conseiller[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CONSEILLERS}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des conseillers');
    }

    const conseillers = await response.json();
    
    return conseillers.map((conseiller: any) => ({
      ...conseiller,
      id: conseiller._id || conseiller.id,
    }));
  }

  // Récupérer un conseiller par ID
  async getById(id: string): Promise<Conseiller> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CONSEILLER_BY_ID(id)}`);
    
    if (!response.ok) {
      throw new Error('Conseiller non trouvé');
    }

    const conseiller = await response.json();
    return {
      ...conseiller,
      id: conseiller._id || conseiller.id,
    };
  }

  // Créer un conseiller (admin uniquement)
  async create(conseillerData: Partial<Conseiller>): Promise<Conseiller> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CONSEILLERS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(conseillerData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création');
    }

    return await response.json();
  }

  // Mettre à jour un conseiller
  async update(id: string, conseillerData: Partial<Conseiller>): Promise<Conseiller> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CONSEILLER_BY_ID(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(conseillerData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour');
    }

    return await response.json();
  }

  // Archiver un conseiller
  async delete(id: string): Promise<void> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CONSEILLER_BY_ID(id)}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de l\'archivage');
    }
  }

  // Récupérer les conseillers archivés
  async getArchived(): Promise<Conseiller[]> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CONSEILLERS_ARCHIVES}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des archives');
    }

    const conseillers = await response.json();
    
    return conseillers.map((conseiller: any) => ({
      ...conseiller,
      id: conseiller._id || conseiller.id,
    }));
  }

  // Restaurer un conseiller
  async restore(id: string): Promise<Conseiller> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CONSEILLER_RESTORE(id)}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la restauration');
    }

    return await response.json();
  }
}

export const conseillersService = new ConseillersService();
