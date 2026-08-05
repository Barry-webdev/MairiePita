import AdminHeader from '@/components/admin/AdminHeader'
import AdminAccueilForm from '@/components/admin/AdminAccueilForm'

export const metadata = { title: "Page d'accueil — Administration" }

export default function AdminAccueilPage() {
  return (
    <>
      <AdminHeader
        title="Paramètres de la page d'accueil"
        subtitle="Modifiez le contenu de la page d'accueil du portail"
      />
      <AdminAccueilForm />
    </>
  )
}
