import { useMutation, useQueryClient } from '@tanstack/react-query';
import { favoriteApi } from './api';

export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favoriteApi.addFavorite,
    onMutate: async (item) => {
      await queryClient.cancelQueries({ queryKey: favoriteApi.baseKey });

      const prevFavorite = queryClient.getQueryData(
        favoriteApi.getFavoriteQueryOptions().queryKey
      );

      queryClient.setQueryData(favoriteApi.getFavoriteQueryOptions().queryKey, (prev) =>
        prev ? [...prev, item] : prev
      );

      return { prevFavorite };
    },
    onError: (_error, _item, context) => {
      queryClient.setQueryData(
        favoriteApi.getFavoriteQueryOptions().queryKey,
        context?.prevFavorite
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(favoriteApi.getFavoriteQueryOptions());
    },
  });
}
