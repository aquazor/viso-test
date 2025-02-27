import { useQuery } from '@tanstack/react-query';
import { mealApi } from './api';

export function useMealsByCategories({
  categories,
}: {
  categories: string[] | undefined;
}) {
  return useQuery({
    queryKey: [mealApi.baseKey, 'list', categories],
    queryFn: () => mealApi.getBasicMealsByCategories(categories),
    staleTime: 1000 * 60 * 10,
    enabled: !!categories,
    select: (data) => data.map((meals) => meals),
  });
}
