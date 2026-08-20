import AppelOffreEditContent from '@/components/admin/AppelOffreEditContent';

export default async function EditAppelOffrePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AppelOffreEditContent appelOffreId={id} />;
}
