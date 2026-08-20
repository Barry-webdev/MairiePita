import { API_BASE_URL, API_ENDPOINTS } from './config';
import { authService } from './auth.service';

export interface Document {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX' | 'ZIP';
  fileUrl: string;
  fileSize: string;
  description: string;
  published: boolean;
  downloadCount: number;
  createdAt?: string;
  updatedAt?: string;
}

class DocumentsService {
  // Récupérer tous les documents
  async getAll(filters?: { category?: string; published?: boolean }): Promise<Document[]> {
    let url = `${API_BASE_URL}${API_ENDPOINTS.DOCUMENTS}`;
    
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
      throw new Error('Erreur lors de la récupération des documents');
    }

    const documents = await response.json();
    
    return documents.map((doc: any) => ({
      ...doc,
      id: doc._id || doc.id,
      date: doc.createdAt,
    }));
  }

  // Récupérer un document par ID
  async getById(id: string): Promise<Document> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DOCUMENT_BY_ID(id)}`);
    
    if (!response.ok) {
      throw new Error('Document non trouvé');
    }

    const document = await response.json();
    return {
      ...document,
      id: document._id || document.id,
      date: document.createdAt,
    };
  }

  // Créer un document (admin uniquement)
  async create(documentData: Partial<Document>): Promise<Document> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DOCUMENTS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(documentData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création');
    }

    const result = await response.json();
    return result.document;
  }

  // Mettre à jour un document
  async update(id: string, documentData: Partial<Document>): Promise<Document> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DOCUMENT_BY_ID(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(documentData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour');
    }

    const result = await response.json();
    return result.document;
  }

  // Supprimer un document
  async delete(id: string): Promise<void> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DOCUMENT_BY_ID(id)}`, {
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

  // Incrémenter le compteur de téléchargement
  async incrementDownload(id: string): Promise<void> {
    await fetch(`${API_BASE_URL}${API_ENDPOINTS.DOCUMENT_DOWNLOAD(id)}`, {
      method: 'POST',
    });
  }
}

export const documentsService = new DocumentsService();
