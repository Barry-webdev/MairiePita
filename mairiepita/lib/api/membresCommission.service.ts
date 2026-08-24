import { API_BASE_URL, API_ENDPOINTS } from './config';
import { authService } from './auth.service';

export interface MembreCommission {
  _id?: string;
  id?: string;
  commissionId: string;
  nom: string;
  prenom: string;
  fonction: string;
  photo?: string;
  telephone?: string;
  email?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

class MembresCommissionService {
  // Récupérer les membres d'une commission
  async getByCommission(commissionId: string): Promise<MembreCommission[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.MEMBRES_BY_COMMISSION(commissionId)}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des membres');
    }

    const membres = await response.json();
    
    return membres.map((membre: any) => ({
      ...membre,
      id: membre._id || membre.id,
    }));
  }

  // Récupérer un membre par ID
  async getById(id: string): Promise<MembreCommission> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.MEMBRE_COMMISSION_BY_ID(id)}`);
    
    if (!response.ok) {
      throw new Error('Membre non trouvé');
    }

    const membre = await response.json();
    return {
      ...membre,
      id: membre._id || membre.id,
    };
  }

  // Créer un membre (admin uniquement)
  async create(membreData: Partial<MembreCommission>): Promise<MembreCommission> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.MEMBRES_COMMISSION}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(membreData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création');
    }

    return await response.json();
  }

  // Mettre à jour un membre
  async update(id: string, membreData: Partial<MembreCommission>): Promise<MembreCommission> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.MEMBRE_COMMISSION_BY_ID(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(membreData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour');
    }

    return await response.json();
  }

  // Archiver un membre
  async delete(id: string): Promise<void> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.MEMBRE_COMMISSION_BY_ID(id)}`, {
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

  // Récupérer les membres archivés d'une commission
  async getArchivedByCommission(commissionId: string): Promise<MembreCommission[]> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.MEMBRES_COMMISSION_ARCHIVES(commissionId)}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des archives');
    }

    const membres = await response.json();
    
    return membres.map((membre: any) => ({
      ...membre,
      id: membre._id || membre.id,
    }));
  }

  // Restaurer un membre
  async restore(id: string): Promise<MembreCommission> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.MEMBRE_COMMISSION_RESTORE(id)}`, {
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

export const membresCommissionService = new MembresCommissionService();
