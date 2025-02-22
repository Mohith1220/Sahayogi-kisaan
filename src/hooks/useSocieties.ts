import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Society } from '../types';

export function useSocieties() {
  const [societies, setSocieties] = useState<Society[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSocieties() {
      try {
        const { data, error } = await supabase
          .from('societies')
          .select(`
            *,
            inventory_items (*)
          `);

        if (error) throw error;
        setSocieties(data || []);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error fetching societies');
      } finally {
        setLoading(false);
      }
    }

    fetchSocieties();
  }, []);

  return { societies, loading, error };
}