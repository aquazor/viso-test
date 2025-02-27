import { useParams } from 'react-router-dom';
import { useMealById } from '../../modules/meals/useMealById';

export function Meal() {
  const { id = '' } = useParams();
  const { data: meal, isError, isPending } = useMealById(id);

  if (isPending) {
    return (
      <div className="flex items-center justify-center mt-10 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center mt-10 text-red-500">
        Something went wrong :/
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="flex items-center justify-center mt-10 text-gray-500">
        Meal not found
      </div>
    );
  }

  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const mealData = meal as unknown as Record<string, string | null>;
    const ingredient = mealData[`strIngredient${i + 1}`];
    const measure = mealData[`strMeasure${i + 1}`];
    return ingredient ? `${measure} ${ingredient}` : null;
  }).filter(Boolean);

  const instructions = meal.strInstructions.split(/\n\n/).map((step) => step.trim());

  const tags = meal.strTags?.split(',').map((tag) => `#${tag}`);

  return (
    <div className="p-8 rounded-xl overflow-hidden">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">{meal.strMeal}</h1>

      <div className="flex lg:items-center gap-8 flex-col lg:flex-row">
        <div className="shrink-0 flex items-center justify-center">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="object-cover rounded-full bg-gray-100 h-[30rem]"
          />
        </div>

        <div className="grow">
          <div className="flex flex-wrap justify-between text-gray-700 text-lg">
            <p className="font-semibold">
              Category: <span className="text-gray-900 text-xl">{meal.strCategory}</span>
            </p>
            <div>
              <p className="font-semibold">
                Cuisine: <span className="text-gray-900 text-xl">{meal.strArea}</span>
              </p>
              {tags && (
                <p>
                  {tags.map((tag) => (
                    <span key={tag}>{tag} </span>
                  ))}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6 bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900">Ingredients:</h2>
            <ul className="list-disc list-inside mt-3 text-gray-800 text-lg">
              {ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            {meal?.strSource && (
              <div className="mt-4">
                <p>
                  Source:{' '}
                  <a href={meal.strSource} target="_blank" className="text-sky-500">
                    {meal.strSource}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-900">Instructions:</h2>
        <ol className="list-decimal list-inside mt-3 text-gray-700 text-lg leading-relaxed">
          {instructions.map((step, index) => (
            <li key={index}>{step}.</li>
          ))}
        </ol>
      </div>
      {meal?.strYoutube && (
        <div className="mt-6 text-center">
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Watch on YouTube
          </a>
        </div>
      )}
    </div>
  );
}
