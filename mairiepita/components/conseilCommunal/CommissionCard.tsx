'use client';

import { Users, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { membresCommissionService } from '@/lib/api/membresCommission.service';

interface CommissionCardProps {
  commission: {
    _id?: string;
    id?: string;
    nom: string;
    description?: string;
  };
}

export default function CommissionCard({ commission }: CommissionCardProps) {
  const [membresCount, setMembresCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMembresCount();
  }, [commission._id || commission.id]);

  const loadMembresCount = async () => {
    try {
      const id = commission._id || commission.id;
      if (!id) return;
      
      const membres = await membresCommissionService.getByCommission(id);
      setMembresCount(membres.length);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const commissionId = commission._id || commission.id;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:border-green-300 hover:shadow-md transition-all">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-lg bg-green-50">
          <Users className="w-8 h-8" style={{ color: '#1a5c2a' }} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-black text-gray-900 mb-2">{commission.nom}</h3>
          {commission.description && (
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              {commission.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>
            {loading ? '...' : `${membresCount} membre${membresCount > 1 ? 's' : ''}`}
          </span>
        </div>
        <a
          href={`/conseil-communal/commissions/${commissionId}`}
          className="flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all"
          style={{ color: '#1a5c2a' }}
        >
          Voir la composition
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
