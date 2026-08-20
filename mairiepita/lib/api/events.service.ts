import { API_BASE_URL, API_ENDPOINTS } from './config';
import { authService } from './auth.service';

export interface Event {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  category?: string;
  imageUrl?: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

class EventsService {
  // Récupérer tous les événements
  async getAll(filters?: { category?: string; published?: boolean }): Promise<Event[]> {
    let url = `${API_BASE_URL}${API_ENDPOINTS.EVENTS}`;
    
    if (filters) {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.published !== undefined) params.append('published', filters.published.toString());
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des événements');
    }

    const events = await response.json();
    
    return events.map((event: any) => ({
      ...event,
      id: event._id || event.id,
    }));
  }

  // Récupérer un événement par ID
  async getById(id: string): Promise<Event> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.EVENT_BY_ID(id)}`);
    
    if (!response.ok) {
      throw new Error('Événement non trouvé');
    }

    const event = await response.json();
    return {
      ...event,
      id: event._id || event.id,
    };
  }

  // Créer un événement (admin uniquement)
  async create(eventData: Partial<Event>): Promise<Event> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.EVENTS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création');
    }

    const result = await response.json();
    return result.event;
  }

  // Mettre à jour un événement
  async update(id: string, eventData: Partial<Event>): Promise<Event> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.EVENT_BY_ID(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour');
    }

    const result = await response.json();
    return result.event;
  }

  // Supprimer un événement
  async delete(id: string): Promise<void> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.EVENT_BY_ID(id)}`, {
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

export const eventsService = new EventsService();
