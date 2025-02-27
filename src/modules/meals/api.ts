import { apiInstance } from '../../shared/api/api-instance';
import { MealDto, MealListResponse, MealSummaryDto } from './types';

export const mealApi = {
  baseKey: 'meals',

  getBasicMealsByCategories: async (categories: string[] | undefined) => {
    if (!categories) {
      return [];
    }

    const result = await Promise.all(
      categories.map(async (name) =>
        apiInstance<MealListResponse<MealSummaryDto>>(`/filter.php?c=${name}`)
      )
    );

    return result.flatMap((data) => data.meals) as MealSummaryDto[];
  },

  getMealById: async (id: string, { signal }: { signal: AbortSignal }) => {
    const result = await apiInstance<MealListResponse<MealDto>>(`/lookup.php?i=${id}`, {
      signal,
    });

    return result.meals[0];
  },

  getMealsByName: (name: string, { signal }: { signal: AbortSignal }) => {
    return apiInstance<MealListResponse<MealDto>>(`/search.php?s=${name}`, { signal });
  },

  getMealByIds: async (ids: string[], { signal }: { signal: AbortSignal }) => {
    const result = await Promise.all(
      ids.map((id) =>
        apiInstance<MealListResponse<MealDto>>(`/lookup.php?i=${id}`, {
          signal,
        })
      )
    );

    return result.flatMap((data) => data.meals);
  },
};
