import { Link, Outlet } from 'react-router-dom';
import { useFavorite } from '../../modules/favorite/useFavorite';

export function AppbarLayout() {
  const { data } = useFavorite();
  const count = data?.length;

  return (
    <>
      <header className="bg-gray-800 p-2 text-white flex justify-between items-center gap-4">
        <nav>
          <ul className="flex gap-4 text-lg">
            <li>
              <Link className="underline underline-offset-2" to={'/'}>
                Home
              </Link>
            </li>

            <li>
              <Link className="underline underline-offset-2" to={'/favorite'}>
                Favorite
              </Link>
            </li>
          </ul>
        </nav>

        <Link to={'/favorite'}>Favorite items: {count}</Link>
      </header>

      <div className="mx-auto max-w-[1600px] p-4">
        <Outlet />
      </div>
    </>
  );
}
