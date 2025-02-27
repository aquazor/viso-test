import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { mealApi } from './api';

export function useMealsByName(name: string) {
  return useQuery({
    queryKey: [mealApi.baseKey, name],
    queryFn: ({ signal }) => mealApi.getMealsByName(name, { signal }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10,
  });
}
