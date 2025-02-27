import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { AppbarLayout } from './pages/_layouts/appbar-layout';
import { Favorite, Home, Meal } from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppbarLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/:id" element={<Meal />} />
    </Route>
  )
);
export function App() {
  return <RouterProvider router={router} />;
}
