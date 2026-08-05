'use client';

import { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';

type Role = 'Super Admin' | 'Éditeur' | 'Lecteur';

type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  lastLogin: string;
  active: boolean;
};

const mockUsers: User[] = [
  { id: '1', name: 'Administrateur Principal', email: 'admin@mairiepita.gov.gn', role: 'Super Admin', lastLogin: '2024-05-31', active: true },
  { id: '2', name: 'Secrétaire Général', email: 'secretaire@mairiepita.gov.gn', role: 'Éditeur', lastLogin: '2024-05-28', active: true },
  { id: '3', name: 'Chargé Communication', email: 'communication@mairiepita.gov.gn', role: 'Éditeur', lastLogin: '2024-05-20', active: false },
];

type ModalType = 'create' | 'edit' | 'delete' | null;

type FormUser = {
  name: string;
  email: string;
  role: Role;
  password: string;
  confirmPassword: string;
  changePassword: boolean;
};

const emptyForm: FormUser = { name: '', email: '', role: 'Éditeur', password: '', confirmPassword: '', changePassword: false };

function roleBadge(role: Role) {
  if (role === 'Super Admin') return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' };
  if (role === 'Éditeur') return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' };
  return { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' };
}

export default function AdminUtilisateursDashboard() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [form, setForm] = useState<FormUser>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  function openCreate() {
    setForm(emptyForm);
    setFormError('');
    setSelectedUser(null);
    setModal('create');
  }

  function openEdit(user: User) {
    setForm({ name: user.name, email: user.email, role: user.role, password: '', confirmPassword: '', changePassword: false });
    setFormError('');
    setSelectedUser(user);
    setModal('edit');
  }

  function openDelete(user: User) {
    setSelectedUser(user);
    setModal('delete');
  }

  function closeModal() {
    setModal(null);
    setSelectedUser(null);
    setForm(emptyForm);
    setFormError('');
  }

  function toggleActive(id: string) {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, active: !u.active } : u));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { setFormError('Les mots de passe ne correspondent pas.'); return; }
    if (form.password.length < 6) { setFormError('Le mot de passe doit comporter au moins 6 caractères.'); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    const newUser: User = {
      id: String(Date.now()),
      name: form.name,
      email: form.email,
      role: form.role,
      lastLogin: '—',
      active: true,
    };
    setUsers((prev) => [...prev, newUser]);
    setSaving(false);
    closeModal();
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (form.changePassword && form.password !== form.confirmPassword) { setFormError('Les mots de passe ne correspondent pas.'); return; }
    if (!selectedUser) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setUsers((prev) => prev.map((u) => u.id === selectedUser.id ? { ...u, name: form.name, email: form.email, role: form.role } : u));
    setSaving(false);
    closeModal();
  }

  function handleDelete() {
    if (!selectedUser) return;
    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    closeModal();
  }

  const totalActifs = users.filter((u) => u.active).length;
  const totalInactifs = users.filter((u) => !u.active).length;

  const inputClass = 'w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors';
  const labelClass = 'block text-xs font-semibold text-gray-600 mb-1.5';

  return (
    <>
      <AdminHeader
        title="Gestion des Utilisateurs"
        subtitle="Gérez les comptes et les accès à l'espace d'administration"
        action={
          <button
            type="button"
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-lg text-white transition-all hover:brightness-110"
            style={{ backgroundColor: '#1a5c2a' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nouvel utilisateur
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total utilisateurs', value: users.length, color: '#1a5c2a' },
          { label: 'Actifs', value: totalActifs, color: '#15803d' },
          { label: 'Inactifs', value: totalInactifs, color: '#9ca3af' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div>
              <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800">Liste des utilisateurs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Rôle</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Dernière connexion</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="text-right px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => {
                const badge = roleBadge(user.role);
                return (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#1a5c2a' }}>
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-800">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {user.lastLogin === '—' ? '—' : new Date(user.lastLogin).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => toggleActive(user.id)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${user.active ? 'bg-green-500' : 'bg-gray-300'}`}
                        title={user.active ? 'Désactiver' : 'Activer'}
                      >
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${user.active ? 'translate-x-4' : 'translate-x-1'}`} />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button type="button" onClick={() => openEdit(user)} className="p-1.5 text-gray-400 hover:text-green-700 transition-colors rounded" title="Modifier">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button type="button" onClick={() => openDelete(user)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded" title="Supprimer">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {modal === 'create' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-800">Nouvel utilisateur</h2>
            </div>
            <form onSubmit={handleCreate} className="p-6 flex flex-col gap-4">
              {formError && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{formError}</p>}
              <div>
                <label className={labelClass}>Nom complet <span className="text-red-500">*</span></label>
                <input type="text" required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email <span className="text-red-500">*</span></label>
                <input type="email" required value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Rôle <span className="text-red-500">*</span></label>
                <select required value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value as Role }))} className={inputClass}>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Éditeur">Éditeur</option>
                  <option value="Lecteur">Lecteur</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Mot de passe <span className="text-red-500">*</span></label>
                <input type="password" required value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Confirmer le mot de passe <span className="text-red-500">*</span></label>
                <input type="password" required value={form.confirmPassword} onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))} className={inputClass} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 py-2.5 text-sm font-semibold rounded-lg border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">Annuler</button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 text-sm font-bold rounded-lg text-white transition-all hover:brightness-110 disabled:opacity-50" style={{ backgroundColor: '#1a5c2a' }}>
                  {saving ? 'Création...' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {modal === 'edit' && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-800">Modifier l'utilisateur</h2>
            </div>
            <form onSubmit={handleEdit} className="p-6 flex flex-col gap-4">
              {formError && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{formError}</p>}
              <div>
                <label className={labelClass}>Nom complet <span className="text-red-500">*</span></label>
                <input type="text" required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email <span className="text-red-500">*</span></label>
                <input type="email" required value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Rôle <span className="text-red-500">*</span></label>
                <select required value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value as Role }))} className={inputClass}>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Éditeur">Éditeur</option>
                  <option value="Lecteur">Lecteur</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input id="changePassword" type="checkbox" checked={form.changePassword} onChange={(e) => setForm((p) => ({ ...p, changePassword: e.target.checked }))} className="w-4 h-4 accent-green-700 cursor-pointer" />
                <label htmlFor="changePassword" className="text-sm text-gray-600 cursor-pointer">Changer le mot de passe</label>
              </div>
              {form.changePassword && (
                <>
                  <div>
                    <label className={labelClass}>Nouveau mot de passe</label>
                    <input type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Confirmer le mot de passe</label>
                    <input type="password" value={form.confirmPassword} onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))} className={inputClass} />
                  </div>
                </>
              )}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 py-2.5 text-sm font-semibold rounded-lg border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">Annuler</button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 text-sm font-bold rounded-lg text-white transition-all hover:brightness-110 disabled:opacity-50" style={{ backgroundColor: '#1a5c2a' }}>
                  {saving ? 'Mise à jour...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {modal === 'delete' && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
            <div className="p-6 text-center flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-800 mb-1">Supprimer l'utilisateur</h2>
                <p className="text-sm text-gray-500">Êtes-vous sûr de vouloir supprimer <strong>{selectedUser.name}</strong> ? Cette action est irréversible.</p>
              </div>
              <div className="flex gap-3 w-full pt-2">
                <button type="button" onClick={closeModal} className="flex-1 py-2.5 text-sm font-semibold rounded-lg border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">Annuler</button>
                <button type="button" onClick={handleDelete} className="flex-1 py-2.5 text-sm font-bold rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
