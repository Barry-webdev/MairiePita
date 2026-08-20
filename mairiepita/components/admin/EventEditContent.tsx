'use client';

import { useEffect, useState } from 'react';
import { eventsService, type Event } from '@/lib/api/events.service';
import EventForm from './EvenementForm';

interface Props {
  eventId: string;
}

export default function EventEditContent({ eventId }: Props) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEvent();
  }, [eventId]);

  async function loadEvent() {
    try {
      setLoading(true);
      const data = await eventsService.getById(eventId);
      setEvent(data);
    } catch (err: any) {
      setError(err.message || 'Événement introuvable');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-500">Chargement de l'événement...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <p className="text-red-700 text-center mb-4">
            {error || 'Événement introuvable'}
          </p>
          <a
            href="/admin/evenements"
            className="block text-center text-sm text-red-700 hover:underline"
          >
            Retour à la liste
          </a>
        </div>
      </div>
    );
  }

  return <EventForm mode="edit" initialData={event} eventId={eventId} />;
}
