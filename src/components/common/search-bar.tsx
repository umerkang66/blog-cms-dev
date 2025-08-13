import { FormEventHandler, type FC, useState } from 'react';
import { BsSearch, BsX } from 'react-icons/bs';

type Props = { 
  onSubmit?: (query: string) => void;
  placeholder?: string;
  className?: string;
  showClearButton?: boolean;
};

const SearchBar: FC<Props> = ({ 
  onSubmit, 
  placeholder = "Search posts, tags, or content...",
  className = '',
  showClearButton = true
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit && onSubmit(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    onSubmit && onSubmit('');
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative group">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <BsSearch className="h-5 w-5 text-primary-400 dark:text-primary-500 group-focus-within:text-accent-500 transition-colors duration-200" />
        </div>

        {/* Input Field */}
        <input
          placeholder={placeholder}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-12 pr-12 py-3 bg-white dark:bg-primary-900 border border-primary-200 dark:border-primary-700 rounded-lg text-primary-900 dark:text-primary-100 placeholder-primary-400 dark:placeholder-primary-500 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-200"
          aria-label="Search"
        />

        {/* Clear Button */}
        {showClearButton && query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary-400 dark:text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            aria-label="Clear search"
          >
            <BsX className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Button (for mobile) */}
      <button
        type="submit"
        className="sr-only"
        aria-label="Search"
      >
        Search
      </button>
    </form>
  );
};

export { SearchBar };
