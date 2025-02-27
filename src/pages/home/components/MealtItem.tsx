import { Link } from 'react-router-dom';
import { MealDto } from '../../../modules/meals/types';
import { useAddFavorite } from '../../../modules/favorite/useAddFavorite';
import { useFavorite } from '../../../modules/favorite/useFavorite';
import { useRemoveFavorite } from '../../../modules/favorite/useRemoveFavorite';

export function MealItem({ meal }: { meal: MealDto }) {
  const { data: favorite } = useFavorite();
  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: removeFavorite } = useRemoveFavorite();

  const isInFavorite = favorite?.some((favMeal) => favMeal.idMeal === meal.idMeal);

  const handleToggleFavorite = () => {
    if (isInFavorite) {
      removeFavorite(meal.idMeal);
      return;
    }

    addFavorite(meal);
  };

  return (
    <li
      key={meal.idMeal}
      className="shadow-md flex flex-col bg-white max-w-xs sm:max-w-full border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="w-full h-72">
        <Link to={`/${meal.idMeal}`} className="block h-full">
          <img
            className="w-full max-h-full object-cover block rounded-t-lg"
            src={meal.strMealThumb}
            alt={meal.strMeal}
          />
        </Link>
      </div>

      <div className="grow flex flex-col p-3">
        <div>
          <h5 className="mb-3 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {meal.strMeal}
          </h5>

          <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
            This is a{' '}
            <span className="text-gray-500 dark:text-gray-200">{meal.strArea}</span> dish
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Category:{' '}
            <span className="text-gray-500 dark:text-gray-200">{meal.strCategory}</span>
          </p>
        </div>

        <div className="mt-auto flex justify-between items-center">
          <div onClick={handleToggleFavorite} className="self-end mb-2">
            <button
              className={`text-2xl disabled:opacity-50 ${
                isInFavorite ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              &lt;3
            </button>
          </div>

          <Link
            to={`/${meal.idMeal}`}
            className="mt-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </li>
  );
}
