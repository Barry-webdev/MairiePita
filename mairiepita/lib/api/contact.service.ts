import { API_BASE_URL } from './config';
import { authService } from './auth.service';

export interface Contact {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: 'non-lu' | 'lu' | 'traité';
  createdAt?: string;
}

export interface ContactStats {
  total: number;
  nonLu: number;
  lu: number;
  traite: number;
}

export interface CreateContactDto {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

class ContactService {
  // Public - créer un message de contact
  async create(data: CreateContactDto): Promise<Contact> {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de l\'envoi du message');
    }

    const result = await response.json();
    return {
      ...result.contact,
      id: result.contact._id || result.contact.id,
    };
  }

  // Admin - récupérer tous les messages
  async getAll(filters?: { status?: string; page?: number }): Promise<{ 
    contacts: Contact[]; 
    totalPages: number; 
    currentPage: number; 
    total: number;
  }> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    let url = `${API_BASE_URL}/contact`;
    
    if (filters) {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.page) params.append('page', filters.page.toString());
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des messages');
    }

    const data = await response.json();
    
    return {
      ...data,
      contacts: data.contacts.map((contact: any) => ({
        ...contact,
        id: contact._id || contact.id,
      })),
    };
  }

  // Admin - récupérer un message par ID
  async getById(id: string): Promise<Contact> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Message non trouvé');
    }

    const contact = await response.json();
    return {
      ...contact,
      id: contact._id || contact.id,
    };
  }

  // Admin - mettre à jour le statut
  async updateStatus(id: string, status: 'non-lu' | 'lu' | 'traité'): Promise<Contact> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}/contact/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour du statut');
    }

    const contact = await response.json();
    return {
      ...contact,
      id: contact._id || contact.id,
    };
  }

  // Admin - supprimer un message
  async delete(id: string): Promise<void> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
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

  // Admin - récupérer les statistiques
  async getStats(): Promise<ContactStats> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}/contact/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des statistiques');
    }

    return response.json();
  }
}

export const contactService = new ContactService();
