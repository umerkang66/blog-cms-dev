import type { FC, MouseEventHandler } from 'react';
import { BiLoader } from 'react-icons/bi';
import { forwardRef } from 'react';

type Props = {
  title: string;
  busy?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  className?: string;
};

const ActionButton: FC<Props> = forwardRef<HTMLButtonElement, Props>(({
  disabled = false,
  busy = false,
  title,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';
  
  const variantClasses = {
    primary: 'bg-accent-600 hover:bg-accent-700 text-white shadow-soft hover:shadow-glow focus:ring-accent-500',
    secondary: 'bg-primary-100 hover:bg-primary-200 dark:bg-primary-800 dark:hover:bg-primary-700 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700',
    ghost: 'text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-800',
    danger: 'bg-danger-600 hover:bg-danger-700 text-white shadow-soft hover:shadow-lg focus:ring-danger-500',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm space-x-2',
    md: 'px-6 py-3 text-base space-x-3',
    lg: 'px-8 py-4 text-lg space-x-3',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  return (
    <button
      ref={ref}
      className={classes}
      onClick={onClick}
      disabled={disabled || busy}
      aria-label={title}
      aria-busy={busy}
    >
      {icon && !busy && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span className="flex-shrink-0">{title}</span>
      {busy && (
        <BiLoader 
          className="animate-spin flex-shrink-0" 
          size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} 
        />
      )}
    </button>
  );
});

ActionButton.displayName = 'ActionButton';

export { ActionButton };
