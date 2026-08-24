import { API_BASE_URL, API_ENDPOINTS } from './config';
import { authService } from './auth.service';

export interface Commission {
  _id?: string;
  id?: string;
  nom: string;
  description?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

class CommissionsService {
  // Récupérer toutes les commissions actives
  async getAll(): Promise<Commission[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COMMISSIONS}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des commissions');
    }

    const commissions = await response.json();
    
    return commissions.map((commission: any) => ({
      ...commission,
      id: commission._id || commission.id,
    }));
  }

  // Récupérer une commission par ID
  async getById(id: string): Promise<Commission> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COMMISSION_BY_ID(id)}`);
    
    if (!response.ok) {
      throw new Error('Commission non trouvée');
    }

    const commission = await response.json();
    return {
      ...commission,
      id: commission._id || commission.id,
    };
  }

  // Créer une commission (admin uniquement)
  async create(commissionData: Partial<Commission>): Promise<Commission> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COMMISSIONS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(commissionData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création');
    }

    return await response.json();
  }

  // Mettre à jour une commission
  async update(id: string, commissionData: Partial<Commission>): Promise<Commission> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COMMISSION_BY_ID(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(commissionData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour');
    }

    return await response.json();
  }

  // Archiver une commission
  async delete(id: string): Promise<void> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COMMISSION_BY_ID(id)}`, {
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

  // Récupérer les commissions archivées
  async getArchived(): Promise<Commission[]> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COMMISSIONS_ARCHIVES}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des archives');
    }

    const commissions = await response.json();
    
    return commissions.map((commission: any) => ({
      ...commission,
      id: commission._id || commission.id,
    }));
  }

  // Restaurer une commission
  async restore(id: string): Promise<Commission> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COMMISSION_RESTORE(id)}`, {
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

export const commissionsService = new CommissionsService();
