import { FavoriteList } from './components/FavoriteList';
import { FavoriteSummary } from './components/FavoriteSummary';

export function Favorite() {
  return (
    <div>
      <h1 className="text-4xl mb-4">A list of your Favorite Recipes</h1>
      <FavoriteSummary />
      <FavoriteList />
    </div>
  );
}
