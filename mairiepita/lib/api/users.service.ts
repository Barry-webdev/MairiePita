import { API_BASE_URL, API_ENDPOINTS } from './config';
import { authService } from './auth.service';

export interface User {
  _id?: string;
  id?: string;
  email?: string;
  fullName?: string;
  role: 'Super Admin' | 'Éditeur' | 'Lecteur';
  active?: boolean;
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserData {
  email?: string;
  password: string;
  fullName?: string;
  role: 'Super Admin' | 'Éditeur' | 'Lecteur';
}

export interface UpdateUserData {
  username?: string;
  email?: string;
  password?: string;
  fullName?: string;
  role?: 'Super Admin' | 'Éditeur' | 'Lecteur';
  active?: boolean;
  isActive?: boolean;
}

class UsersService {
  // Mapper les rôles français vers les rôles backend
  private mapRoleToBackend(role: string): string {
    const roleMap: Record<string, string> = {
      'Super Admin': 'admin',
      'Éditeur': 'editor',
      'Lecteur': 'viewer',
    };
    return roleMap[role] || 'editor';
  }

  // Mapper les rôles backend vers français
  private mapRoleToFrontend(role: string): 'Super Admin' | 'Éditeur' | 'Lecteur' {
    const roleMap: Record<string, 'Super Admin' | 'Éditeur' | 'Lecteur'> = {
      'admin': 'Super Admin',
      'editor': 'Éditeur',
      'viewer': 'Lecteur',
    };
    return roleMap[role] || 'Éditeur';
  }

  // Récupérer tous les utilisateurs
  async getAll(): Promise<User[]> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USERS}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des utilisateurs');
    }

    const users = await response.json();
    
    return users.map((user: any) => ({
      ...user,
      id: user._id || user.id,
      role: this.mapRoleToFrontend(user.role),
      active: user.isActive !== false,
    }));
  }

  // Créer un utilisateur
  async create(userData: CreateUserData): Promise<User> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        fullName: userData.fullName,
        role: this.mapRoleToBackend(userData.role),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création');
    }

    const result = await response.json();
    
    // Retourner l'utilisateur créé
    return {
      id: result.userId,
      email: userData.email,
      fullName: userData.fullName,
      role: userData.role,
      active: true,
    };
  }

  // Mettre à jour un utilisateur
  async update(id: string, userData: UpdateUserData): Promise<User> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    // Préparer les données à envoyer
    const updateData: any = {};
    
    if (userData.username) updateData.username = userData.username;
    if (userData.email) updateData.email = userData.email;
    if (userData.fullName) updateData.fullName = userData.fullName;
    if (userData.password) updateData.password = userData.password;
    if (userData.role) updateData.role = this.mapRoleToBackend(userData.role);
    if (userData.active !== undefined) updateData.isActive = userData.active;
    if (userData.isActive !== undefined) updateData.isActive = userData.isActive;

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USERS}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour');
    }

    const result = await response.json();
    const updatedUser = result.user || result;
    
    return {
      ...updatedUser,
      id: updatedUser._id || updatedUser.id,
      role: this.mapRoleToFrontend(updatedUser.role),
      active: updatedUser.isActive !== false,
    };
  }

  // Supprimer un utilisateur
  async delete(id: string): Promise<void> {
    const token = authService.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USERS}/${id}`, {
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

export const usersService = new UsersService();
