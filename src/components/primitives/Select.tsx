import { SelectHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, size = 'md', fullWidth = false, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={clsx(
          // Base styles
          'border border-input rounded-lg bg-background text-foreground',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-input-focus',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-fast cursor-pointer',
          
          // Sizes
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-sm': size === 'md',
            'h-12 px-4 text-base': size === 'lg',
          },
          
          // Full width
          { 'w-full': fullWidth },
          
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = 'Select';
