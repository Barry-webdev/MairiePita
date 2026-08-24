'use client';

import { use } from 'react';
import ConseillerForm from '@/components/admin/ConseillerForm';

export default function EditConseillerPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return <ConseillerForm conseillerId={resolvedParams.id} />;
}
