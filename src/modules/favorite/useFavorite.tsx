import { useQuery } from '@tanstack/react-query';
import { favoriteApi } from './api';

export function useFavorite() {
  return useQuery({
    ...favoriteApi.getFavoriteQueryOptions(),
    staleTime: 1000 * 60 * 10,
  });
}
