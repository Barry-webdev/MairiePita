import AdminHeader from '@/components/admin/AdminHeader'
import AdminMotMaireForm from '@/components/admin/AdminMotMaireForm'

export const metadata = { title: 'Mot du Maire — Administration' }

export default function AdminMotMairePage() {
  return (
    <>
      <AdminHeader
        title="Mot du Maire"
        subtitle="Gérez le message et les informations du Maire affichés sur le site"
      />
      <AdminMotMaireForm />
    </>
  )
}
