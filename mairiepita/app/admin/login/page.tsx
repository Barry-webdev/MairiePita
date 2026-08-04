import AdminLoginForm from '@/components/admin/AdminLoginForm';

export const metadata = {
  title: 'Connexion — Administration Mairie de Pita',
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#f0f4f0' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="flex items-center justify-center w-16 h-20 text-white font-bold text-2xl mb-4"
            style={{
              backgroundColor: '#1a5c2a',
              clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)',
            }}
          >
            MP
          </div>
          <h1 className="text-xl font-black uppercase tracking-widest text-center" style={{ color: '#1a5c2a' }}>
            Mairie de Pita
          </h1>
          <p className="text-sm text-gray-500 mt-1">Espace Administration</p>
        </div>

        <AdminLoginForm />

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2024 Mairie de Pita — Accès réservé aux agents autorisés
        </p>
      </div>
    </div>
  );
}
