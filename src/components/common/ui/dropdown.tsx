import { FC, ReactNode, useState, useRef, useEffect } from 'react';
import { BsChevronDown } from 'react-icons/bs';

export type DropdownOption = {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  danger?: boolean;
};

type Props = {
  options: DropdownOption[];
  head: ReactNode;
  placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  className?: string;
};

const Dropdown: FC<Props> = ({
  head,
  options,
  placement = 'bottom-right',
  className = '',
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option: DropdownOption) => {
    if (option.onClick) {
      option.onClick();
    }
    setShowOptions(false);
  };

  const placementClasses = {
    'bottom-left': 'top-full left-0 mt-2',
    'bottom-right': 'top-full right-0 mt-2',
    'top-left': 'bottom-full left-0 mb-2',
    'top-right': 'bottom-full right-0 mb-2',
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setShowOptions(prev => !prev)}
        className="group flex items-center space-x-2 rounded-lg p-2 transition-all duration-200 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 dark:hover:bg-primary-800"
        aria-expanded={showOptions}
        aria-haspopup="true"
      >
        {head}
        <BsChevronDown
          className={`h-4 w-4 text-primary-500 transition-transform duration-200 dark:text-primary-400 ${
            showOptions ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {showOptions && (
        <div className={`absolute z-50 ${placementClasses[placement]}`}>
          <div className="min-w-[16rem] animate-scale-in rounded-xl border border-primary-200 bg-white shadow-large dark:border-primary-700 dark:bg-primary-900">
            <div className="p-2">
              {options.map((option, index) => (
                <button
                  key={`${option.label}-${index}`}
                  onClick={() => handleOptionClick(option)}
                  className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-all duration-200 hover:bg-primary-50 focus:bg-primary-50 focus:outline-none dark:hover:bg-primary-800 dark:focus:bg-primary-800 ${
                    option.danger
                      ? 'text-danger-600 dark:text-danger-400 hover:bg-danger-50 dark:hover:bg-danger-900/20'
                      : 'text-primary-700 dark:text-primary-300'
                  }`}
                >
                  {option.icon && (
                    <span className="flex-shrink-0 text-lg">{option.icon}</span>
                  )}
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Dropdown };
