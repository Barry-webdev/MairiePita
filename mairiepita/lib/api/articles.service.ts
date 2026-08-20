import { API_BASE_URL, API_ENDPOINTS } from './config';
import { authService } from './auth.service';

export interface Article {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  category: string;
  categoryColor: string;
  excerpt: string;
  content: string;
  author: string;
  published: boolean;
  imageBg: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

class ArticlesService {
  // Récupérer tous les articles
  async getAll(filters?: { category?: string; published?: boolean }): Promise<Article[]> {
    let url = `${API_BASE_URL}${API_ENDPOINTS.ARTICLES}`;
    
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
      throw new Error('Erreur lors de la récupération des articles');
    }

    const articles = await response.json();
    
    // Convertir _id en id pour compatibilité avec le frontend
    return articles.map((article: any) => ({
      ...article,
      id: article._id || article.id,
      date: article.createdAt,
    }));
  }

  // Récupérer un article par ID
  async getById(id: string): Promise<Article> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ARTICLE_BY_ID(id)}`);
    
    if (!response.ok) {
      throw new Error('Article non trouvé');
    }

    const article = await response.json();
    return {
      ...article,
      id: article._id || article.id,
      date: article.createdAt,
    };
  }

  // Récupérer un article par slug
  async getBySlug(slug: string): Promise<Article> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ARTICLE_BY_SLUG(slug)}`);
    
    if (!response.ok) {
      throw new Error('Article non trouvé');
    }

    const article = await response.json();
    return {
      ...article,
      id: article._id || article.id,
      date: article.createdAt,
    };
  }

  // Créer un article (admin uniquement)
  async create(articleData: Partial<Article>): Promise<Article> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ARTICLES}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création');
    }

    const result = await response.json();
    return result.article;
  }

  // Mettre à jour un article
  async update(id: string, articleData: Partial<Article>): Promise<Article> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ARTICLE_BY_ID(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour');
    }

    const result = await response.json();
    return result.article;
  }

  // Supprimer un article
  async delete(id: string): Promise<void> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ARTICLE_BY_ID(id)}`, {
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

export const articlesService = new ArticlesService();
