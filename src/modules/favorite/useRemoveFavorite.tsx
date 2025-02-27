import { useMutation, useQueryClient } from '@tanstack/react-query';
import { favoriteApi } from './api';

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favoriteApi.removeFavorite,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: favoriteApi.baseKey });

      const prevFavorite = queryClient.getQueryData(
        favoriteApi.getFavoriteQueryOptions().queryKey
      );

      const updated = queryClient.setQueryData(
        favoriteApi.getFavoriteQueryOptions().queryKey,
        (prev) => (prev ? prev.filter((meal) => meal.idMeal !== id) : prev)
      );
      localStorage.setItem('favorite', JSON.stringify(updated));

      return { prevFavorite };
    },
    onError: (_error, _item, context) => {
      const reverted = queryClient.setQueryData(
        favoriteApi.getFavoriteQueryOptions().queryKey,
        context?.prevFavorite
      );
      localStorage.setItem('favorite', JSON.stringify(reverted));
    },
    onSettled: () => {
      queryClient.invalidateQueries(favoriteApi.getFavoriteQueryOptions());
    },
  });
}
