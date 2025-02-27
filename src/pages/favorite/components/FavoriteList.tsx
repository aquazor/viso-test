import { useFavorite } from '../../../modules/favorite/useFavorite';
import { FavoriteItem } from './FavoriteItem';

export function FavoriteList() {
  const { data: favorite, isError, isPending } = useFavorite();

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

  return (
    <ul className="flex flex-col justify-center gap-4">
      {favorite?.map((meal) => (
        <FavoriteItem meal={meal} />
      ))}
    </ul>
  );
}
