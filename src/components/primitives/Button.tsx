import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          // Base styles
          'inline-flex items-center justify-center font-medium transition-smooth rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          
          // Variants
          {
            'bg-primary text-primary-foreground hover:bg-primary-hover active:scale-95': 
              variant === 'primary' && !disabled,
            'bg-secondary text-secondary-foreground hover:bg-secondary-hover active:scale-95': 
              variant === 'secondary' && !disabled,
            'bg-transparent text-foreground hover:bg-secondary active:scale-95': 
              variant === 'ghost' && !disabled,
            'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-95': 
              variant === 'destructive' && !disabled,
          },
          
          // Sizes
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-sm': size === 'md',
            'h-12 px-6 text-base': size === 'lg',
          },
          
          // Full width
          { 'w-full': fullWidth },
          
          className
        )}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
