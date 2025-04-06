import React, { forwardRef } from 'react';

type InputVariant = 'outline' | 'filled' | 'flushed';
type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: InputVariant;
  inputSize?: InputSize; // renamed to avoid conflict
  error?: string;
  success?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  helperText?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      variant = 'outline',
      inputSize = 'md',
      error,
      success,
      fullWidth = false,
      startIcon,
      endIcon,
      helperText,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = `block transition-colors duration-200 ease-in-out ${
      fullWidth ? 'w-full' : ''
    }`;

    const sizeClasses = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    };

    const variantClasses = {
      outline: `border ${
        error
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
          : success
          ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
      } rounded-md shadow-sm`,
      filled: `bg-gray-100 border-b-2 ${
        error
          ? 'border-red-500 focus:border-red-500'
          : success
          ? 'border-green-500 focus:border-green-500'
          : 'border-transparent focus:border-blue-500'
      } rounded-t-md`,
      flushed: `border-b-2 ${
        error
          ? 'border-red-500 focus:border-red-500'
          : success
          ? 'border-green-500 focus:border-green-500'
          : 'border-gray-300 focus:border-blue-500'
      } bg-transparent px-0`,
    };

    const iconClasses = {
      start: 'pl-10',
      end: 'pr-10',
      both: 'px-10',
    };

    const hasStartIcon = !!startIcon;
    const hasEndIcon = !!endIcon || error || success;

    return (
      <div className={`${fullWidth ? 'w-full' : 'w-auto'} ${className}`}>
        {label && (
          <label
            htmlFor={props.id}
            className={`block text-sm font-medium mb-1 ${
              error ? 'text-red-600' : success ? 'text-green-600' : 'text-gray-700'
            }`}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            className={`${baseClasses} ${sizeClasses[inputSize]} ${variantClasses[variant]} ${
              hasStartIcon && !hasEndIcon
                ? iconClasses.start
                : hasEndIcon && !hasStartIcon
                ? iconClasses.end
                : hasStartIcon && hasEndIcon
                ? iconClasses.both
                : ''
            } ${error ? 'text-red-900 placeholder-red-300' : ''}`}
            {...props}
          />

          {(endIcon || error || success) && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {error ? (
                <span className="text-red-500 text-sm">!</span>
              ) : success ? (
                <span className="text-green-500 text-sm">✔</span>
              ) : (
                endIcon
              )}
            </div>
          )}
        </div>

        {(helperText || error) && (
          <p
            className={`mt-1 text-sm ${
              error ? 'text-red-600' : success ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
