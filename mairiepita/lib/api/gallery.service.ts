import { API_BASE_URL } from './config';
import { authService } from './auth.service';

export interface GalleryMedia {
  _id: string;
  titre: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  publicId: string;
  thumbnailUrl?: string;
  duration?: number;
  categorie: 'Événements' | 'Infrastructure' | 'Cérémonies' | 'Vie quotidienne' | 'Actualités' | 'Autres';
  date: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryStats {
  total: number;
  published: number;
  draft: number;
  totalImages: number;
  totalVideos: number;
  byCategory: { _id: string; count: number }[];
}

class GalleryService {
  // Récupérer toutes les photos/vidéos (public)
  async getAll(params?: {
    categorie?: string;
    search?: string;
    mediaType?: 'image' | 'video' | 'all';
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.categorie) queryParams.append('categorie', params.categorie);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.mediaType) queryParams.append('mediaType', params.mediaType);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await fetch(`${API_BASE_URL}/gallery?${queryParams}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des médias');
    return await response.json();
  }

  // Récupérer toutes les photos/vidéos (admin)
  async getAllAdmin(): Promise<GalleryMedia[]> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}/gallery/admin/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Erreur lors de la récupération des médias');
    return await response.json();
  }

  // Récupérer un média
  async getById(id: string): Promise<GalleryMedia> {
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`);
    if (!response.ok) throw new Error('Média non trouvé');
    return await response.json();
  }

  // Upload un média (photo ou vidéo)
  async upload(formData: FormData): Promise<GalleryMedia> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    try {
      const response = await fetch(`${API_BASE_URL}/gallery/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      console.log('Upload response status:', response.status);

      if (!response.ok) {
        let errorMessage = 'Erreur lors de l\'upload du média';
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
          console.error('Backend error:', error);
        } catch (e) {
          console.error('Cannot parse error response:', e);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('Upload result:', result);
      return result;
    } catch (error: any) {
      console.error('Upload error:', error);
      throw new Error(error.message || 'Erreur lors de l\'upload du média');
    }
  }

  // Mettre à jour un média
  async update(id: string, data: Partial<GalleryMedia>): Promise<GalleryMedia> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    return await response.json();
  }

  // Toggle published
  async togglePublished(id: string): Promise<GalleryMedia> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}/gallery/${id}/toggle`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    return await response.json();
  }

  // Supprimer un média
  async delete(id: string): Promise<void> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Erreur lors de la suppression');
  }

  // Statistiques
  async getStats(): Promise<GalleryStats> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}/gallery/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Erreur lors de la récupération des statistiques');
    return await response.json();
  }
}

export const galleryService = new GalleryService();
