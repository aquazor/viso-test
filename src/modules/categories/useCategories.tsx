import { useQuery } from '@tanstack/react-query';
import { categoryApi } from './api';

export function useCategories() {
  return useQuery({
    ...categoryApi.getCategoriesQueryOptions(),
    select: (data) => data?.meals.map((category) => category.strCategory),
  });
}
