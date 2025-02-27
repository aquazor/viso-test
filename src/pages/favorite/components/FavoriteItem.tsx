import { Link } from 'react-router-dom';
import { useFavorite } from '../../../modules/favorite/useFavorite';
import { useAddFavorite } from '../../../modules/favorite/useAddFavorite';
import { useRemoveFavorite } from '../../../modules/favorite/useRemoveFavorite';
import { MealDto } from '../../../modules/meals/types';

export function FavoriteItem({ meal }: { meal: MealDto }) {
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

  const instructions = meal.strInstructions.split(/\n\n/).map((step) => step.trim());

  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const mealData = meal as unknown as Record<string, string | null>;
    const ingredient = mealData[`strIngredient${i + 1}`];
    const measure = mealData[`strMeasure${i + 1}`];
    return ingredient ? `${measure} ${ingredient}` : null;
  }).filter(Boolean);

  return (
    <li
      key={meal.idMeal}
      className="shadow-md flex flex-col bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="w-full sm:h-[30rem]">
        <Link to={`/${meal.idMeal}`} className="block h-full">
          <img
            className="w-full max-h-full object-cover block rounded-t-lg"
            src={meal.strMealThumb}
            alt={meal.strMeal}
          />
        </Link>
      </div>

      <div className="flex flex-col gap-2 p-3 grow">
        <div className="shrink-0 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h5 className="mb-3 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {meal.strMeal}
            </h5>

            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
              This is a{' '}
              <span className="text-gray-500 dark:text-gray-200">{meal.strArea}</span>{' '}
              dish
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Category:{' '}
              <span className="text-gray-500 dark:text-gray-200">{meal.strCategory}</span>
            </p>
          </div>

          <div className="mt-auto flex justify-between self-end gap-2 items-center">
            <div onClick={handleToggleFavorite}>
              <button
                className={`leading-6 text-2xl disabled:opacity-50 ${
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

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-1/4 p-1 bg-gray-50 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900">Ingredients:</h2>
            <ul className="list-disc list-inside mt-3 text-gray-800 text-lg px-2">
              {ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="lg:w-3/4 p-1 bg-gray-50 rounded-lg shadow h-fit">
            <h2 className="text-2xl font-semibold text-gray-900">Instructions:</h2>
            <div className="px-2 mt-3">
              {instructions.map((step, index) => (
                <p className="text-lg" key={index}>
                  {step}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
