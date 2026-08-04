import DocumentForm from '@/components/admin/DocumentForm';
import AdminHeader from '@/components/admin/AdminHeader';

export const metadata = {
  title: 'Nouveau document — Administration Mairie de Pita',
};

export default function NewDocumentPage() {
  return (
    <>
      <AdminHeader
        title="Nouveau document"
        subtitle="Ajoutez et publiez un nouveau document"
        action={
          <a
            href="/admin/documents"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </a>
        }
      />
      <DocumentForm mode="create" />
    </>
  );
}
