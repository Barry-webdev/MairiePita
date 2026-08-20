import AdminHeader from '@/components/admin/AdminHeader';
import DashboardContent from '@/components/admin/DashboardContent';

export const metadata = {
  title: 'Tableau de bord — Administration Mairie de Pita',
};

export default function AdminDashboardPage() {
  return (
    <>
      <AdminHeader
        title="Tableau de bord"
        subtitle="Bienvenue dans l'espace d'administration de la Mairie de Pita"
      />
      <DashboardContent />
    </>
  );
}
