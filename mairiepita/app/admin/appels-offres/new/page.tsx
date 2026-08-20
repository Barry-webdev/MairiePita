import AppelOffreForm from '@/components/admin/AppelOffreForm';
import AdminHeader from '@/components/admin/AdminHeader';

export default function NewAppelOffrePage() {
  return (
    <>
      <AdminHeader
        title="Nouvel appel d'offres"
        subtitle="Créez un nouvel appel d'offres pour la commune"
      />
      <AppelOffreForm mode="create" />
    </>
  );
}
