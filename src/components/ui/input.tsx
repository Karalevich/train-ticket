import * as React from 'react'

import { cn } from '@/lib/utils'
import { ComponentProps } from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends ComponentProps<'input'> {
  error: string | null
  showErrorIcon?: boolean
}

function Input({ className, type, error, showErrorIcon = true, ...props }: InputProps) {
  const inputId = props.id || props.name
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div className="relative">
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary',
          'selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border',
          'bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex',
          'file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none',
          'disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          // Error state styling
          error && 'border-destructive focus-visible:border-destructive',
          // Add padding for error icon
          error && showErrorIcon && 'pr-10',
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={errorId}
        {...props}
      />

      {/* Error icon */}
      {error && showErrorIcon && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <AlertCircle className="h-4 w-4 text-destructive"/>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export { Input }
