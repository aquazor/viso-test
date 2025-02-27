import { useState } from 'react';
import { MealSummaryDto } from '../../../modules/meals/types';
import { useMealsByIds } from '../../../modules/meals/useMealtsByIds';
import { MealItem } from './MealtItem';
import { Pagination } from './Pagination';

const ITEMS_PER_PAGE = 8;

const MealList = ({ data = [] }: { data?: MealSummaryDto[] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const indexOfLastMeal = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstMeal = indexOfLastMeal - ITEMS_PER_PAGE;
  const currentPageMeals = data?.slice(indexOfFirstMeal, indexOfLastMeal);

  const currentMealsIds = currentPageMeals.map((meal) => meal.idMeal);
  const { data: meals, isPending, isPlaceholderData } = useMealsByIds(currentMealsIds);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul
        className={`grid sm:grid-cols-2 min-[900px]:grid-cols-3 xl:grid-cols-4 justify-center gap-4 transition-opacity${
          isPlaceholderData ? ' opacity-85' : 'opacity-100'
        }`}
      >
        {meals?.map((meal) => (
          <MealItem key={meal.idMeal} meal={meal} />
        ))}
      </ul>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default MealList;
