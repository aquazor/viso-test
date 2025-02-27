import { useQuery } from '@tanstack/react-query';
import { mealApi } from './api';

export function useMealById(id: string) {
  return useQuery({
    queryKey: [mealApi.baseKey, id],
    queryFn: ({ signal }) => mealApi.getMealById(id, { signal }),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
  });
}
