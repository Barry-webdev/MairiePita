import { API_BASE_URL, API_ENDPOINTS } from './config';
import { authService } from './auth.service';

export interface MotMaire {
  _id?: string;
  nom: string;
  titre: string;
  email: string;
  telephone: string;
  mandat: string;
  messageCourt: string;
  messageComplet: string;
  signature: string;
  photoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

class MotMaireService {
  // Récupérer le mot du maire
  async get(): Promise<MotMaire | null> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.MOT_MAIRE}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null; // Pas encore de mot du maire
        }
        throw new Error('Erreur lors de la récupération du mot du maire');
      }

      return await response.json();
    } catch (err) {
      console.error('Erreur get mot maire:', err);
      return null;
    }
  }

  // Créer ou mettre à jour le mot du maire
  async createOrUpdate(data: Partial<MotMaire>): Promise<MotMaire> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.MOT_MAIRE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la sauvegarde');
    }

    const result = await response.json();
    return result.motMaire || result;
  }
}

export const motMaireService = new MotMaireService();
