import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedValue } from '../../../shared/hooks/useDebouncedValue';

export function Search() {
  const [params, setParams] = useSearchParams();
  const searchTerm = params.get('searchTerm') || '';
  const [inputValue, setInputValue] = useState(searchTerm);
  const debouncedValue = useDebouncedValue(inputValue, 500);

  useEffect(() => {
    if (debouncedValue !== searchTerm) {
      setParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (debouncedValue) {
          newParams.set('searchTerm', debouncedValue);
        } else {
          newParams.delete('searchTerm');
        }
        return newParams;
      });
    }
  }, [debouncedValue, searchTerm, setParams]);

  return (
    <div className="mb-2">
      <input
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        id="searchTerm"
        name="searchTerm"
        className="p-2 border-black border w-full sm:w-1/2"
        type="text"
        placeholder="Search..."
      />
    </div>
  );
}
