import AppelOffreForm from '@/components/admin/AppelOffreForm';
import AdminHeader from '@/components/admin/AdminHeader';
import { mockAppelsOffres } from '@/lib/mockAppelsOffres';

export const metadata = {
  title: "Modifier un appel d'offres — Administration Mairie de Pita",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditAppelOffrePage({ params }: Props) {
  const { id } = await params;
  const appel = mockAppelsOffres.find((a) => a.id === id);

  if (!appel) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <p className="text-lg font-semibold">Appel d&apos;offres introuvable</p>
        <a href="/admin/appels-offres" className="mt-4 text-sm text-green-700 hover:underline">
          Retour à la liste
        </a>
      </div>
    );
  }

  return (
    <>
      <AdminHeader
        title="Modifier l'appel d'offres"
        subtitle={`${appel.reference} — ${appel.title}`}
        action={
          <a
            href="/admin/appels-offres"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </a>
        }
      />
      <AppelOffreForm mode="edit" initialData={appel} />
    </>
  );
}
