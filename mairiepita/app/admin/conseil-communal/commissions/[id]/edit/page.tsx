'use client';

import { use } from 'react';
import CommissionForm from '@/components/admin/CommissionForm';

export default function EditCommissionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return <CommissionForm commissionId={resolvedParams.id} />;
}
