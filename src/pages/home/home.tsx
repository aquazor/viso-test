import { useCategories } from '../../modules/categories/useCategories';
import { useMealsByCategories } from '../../modules/meals/useMealsByCategories';
import MealList from './components/MealList';
import { Search } from './components/Search';
import { CategoryList } from './components/CategoryList';

export function Home() {
  const { data: categories } = useCategories();
  const { data: meals } = useMealsByCategories({ categories });

  return (
    <div>
      <Search />

      <div className="flex flex-col gap-2 mb-5">
        <h2 className="font-semibold text-2xl">Categories</h2>
        <CategoryList />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-2xl">Meals</h2>
        <MealList data={meals} />
      </div>
    </div>
  );
}
