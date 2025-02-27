import { queryOptions } from '@tanstack/react-query';
import { apiInstance } from '../../shared/api/api-instance';
import { CategoryDto } from './types';

export const categoryApi = {
  baseKey: 'categories',

  getCategoriesQueryOptions: () =>
    queryOptions({
      queryKey: [categoryApi.baseKey, 'list'],
      queryFn: ({ signal }) =>
        apiInstance<{ meals: CategoryDto[] }>(`/list.php?c=list`, {
          signal,
        }),
      staleTime: 1000 * 60 * 10,
    }),
};
