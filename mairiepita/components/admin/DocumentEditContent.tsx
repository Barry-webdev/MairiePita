'use client';

import { useEffect, useState } from 'react';
import { documentsService, type Document } from '@/lib/api/documents.service';
import DocumentForm from './DocumentForm';

interface Props {
  documentId: string;
}

export default function DocumentEditContent({ documentId }: Props) {
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDocument();
  }, [documentId]);

  async function loadDocument() {
    try {
      setLoading(true);
      const data = await documentsService.getById(documentId);
      setDocument(data);
    } catch (err: any) {
      setError(err.message || 'Document introuvable');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-500">Chargement du document...</p>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <p className="text-red-700 text-center mb-4">
            {error || 'Document introuvable'}
          </p>
          <a
            href="/admin/documents"
            className="block text-center text-sm text-red-700 hover:underline"
          >
            Retour à la liste
          </a>
        </div>
      </div>
    );
  }

  return <DocumentForm mode="edit" initialData={document} documentId={documentId} />;
}
