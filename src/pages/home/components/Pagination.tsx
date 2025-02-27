interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];

    if (totalPages <= 10) {
      // Якщо сторінок 10 або менше, показуємо всі
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 7) {
        // Якщо користувач на сторінці 1-7
        pages.push(...Array.from({ length: 7 }, (_, i) => i + 1));
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 6) {
        // Якщо користувач на останніх 7 сторінках
        pages.push(1);
        pages.push('...');
        pages.push(...Array.from({ length: 7 }, (_, i) => totalPages - 6 + i));
      } else {
        // Якщо користувач десь посередині (наприклад, на 8, 9, 10)
        pages.push(1);
        pages.push('...');
        pages.push(
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2
        );
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center mt-6 gap-2">
      {/* Кнопка "Назад" */}
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>

      {/* Відображення сторінок */}
      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            className={`px-3 py-1 border rounded ${
              currentPage === page ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-3 py-1">
            {page}
          </span>
        )
      )}

      {/* Кнопка "Вперед" */}
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
}
