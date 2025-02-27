import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { mealApi } from './api';

export function useMealsByIds(ids: string[]) {
  return useQuery({
    queryKey: [mealApi.baseKey, ids],
    queryFn: ({ signal }) => mealApi.getMealByIds(ids, { signal }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10,
    enabled: !!ids && ids.length > 0,
  });
}
