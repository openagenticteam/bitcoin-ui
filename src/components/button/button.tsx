import { forwardRef } from 'react'
import { type ButtonProps } from './types'

/**
 * Button component that provides accessible button functionality with customizable styling.
 * 
 * @example
 * ```tsx
 * <Button onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * ```
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" loading>
 *   Loading...
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      loadingText = 'Loading...',
      fullWidth = false,
      startIcon,
      endIcon,
      type = 'button',
      onClick,
      onKeyDown,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        event.preventDefault()
        return
      }
      onClick?.(event)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        event.preventDefault()
        return
      }
      
      // Handle space and enter keys
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        onClick?.(event as any)
      }
      
      onKeyDown?.(event)
    }

    // Build class names for styling hooks
    const baseClasses = [
      'btn', // Base component class
      `btn--${variant}`, // Variant class
      `btn--${size}`, // Size class
      fullWidth && 'btn--full-width',
      loading && 'btn--loading',
      isDisabled && 'btn--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button
        ref={ref}
        type={type}
        className={baseClasses}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-label={loading ? loadingText : props['aria-label']}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        data-testid={testId || 'button'}
        data-variant={variant}
        data-size={size}
        data-loading={loading}
        data-full-width={fullWidth}
        {...props}
      >
        {loading && (
          <span
            className="btn__loading-indicator"
            aria-hidden="true"
            data-testid="loading-indicator"
          >
            {/* Loading indicator - consumers can style this */}
            ⏳
          </span>
        )}
        
        {startIcon && !loading && (
          <span className="btn__start-icon" aria-hidden="true">
            {startIcon}
          </span>
        )}
        
        <span className="btn__content">
          {loading ? loadingText : children}
        </span>
        
        {endIcon && !loading && (
          <span className="btn__end-icon" aria-hidden="true">
            {endIcon}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'