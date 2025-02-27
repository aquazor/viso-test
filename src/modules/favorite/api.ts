import { queryOptions } from '@tanstack/react-query';
import { MealDto } from '../meals/types';

export const favoriteApi = {
  baseKey: 'favorite',

  getFavoriteQueryOptions: () =>
    queryOptions({
      queryKey: [favoriteApi.baseKey, 'list'],
      queryFn: favoriteApi.getFavorite,
      staleTime: 1000 * 60 * 10,
    }),

  getFavorite: async () => {
    await new Promise((res) => setTimeout(res, 100));

    const favorite = JSON.parse(localStorage.getItem('favorite') || '[]') as MealDto[];
    return favorite;
  },

  addFavorite: async (item: MealDto) => {
    await new Promise((res) => setTimeout(res, 100));

    const favorite = JSON.parse(localStorage.getItem('favorite') || '[]') as MealDto[];
    localStorage.setItem('favorite', JSON.stringify([...favorite, item]));
    return favorite;
  },

  removeFavorite: async (id: MealDto['idMeal']) => {
    await new Promise((res) => setTimeout(res, 100));

    const favorite = JSON.parse(localStorage.getItem('favorite') || '[]') as MealDto[];
    localStorage.setItem(
      'favorite',
      JSON.stringify(favorite.filter((meal) => meal.idMeal !== id))
    );
    return favorite;
  },
};
