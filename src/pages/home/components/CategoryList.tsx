import { useCategories } from '../../../modules/categories/useCategories';

export function CategoryList() {
  const { data, error, isPending } = useCategories();

  if (isPending) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Something went wrong :/</div>;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {data?.map((category) => (
        <li key={category}>{category}</li>
      ))}
    </ul>
  );
}
