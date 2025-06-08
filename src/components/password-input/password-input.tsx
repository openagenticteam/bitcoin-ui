import { forwardRef, useState } from 'react'
import { type PasswordInputProps } from './types'
import { getToggleText, getInputAriaLabel } from './utils'

// Screen reader only styles
const srOnlyStyle = {
  position: 'absolute' as const,
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap' as const,
  border: '0',
}

/**
 * PasswordInput component that provides accessible password input functionality with reveal/hide toggle.
 * 
 * @example
 * ```tsx
 * <PasswordInput 
 *   label="Password"
 *   placeholder="Enter your password"
 *   onChange={(e) => setPassword(e.target.value)}
 * />
 * ```
 * 
 * @example
 * ```tsx
 * <PasswordInput 
 *   label="Confirm Password"
 *   value={confirmPassword}
 *   onChange={handleConfirmPasswordChange}
 *   required
 * />
 * ```
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      className = '',
      style,
      'data-testid': testId,
      ...inputProps
    },
    ref
  ) => {
    const [isRevealed, setIsRevealed] = useState(false)
    
    const handleToggleReveal = () => {
      setIsRevealed(!isRevealed)
    }
    
    // Build class names for styling hooks
    const baseClasses = [
      'password-input', // Base component class
      isRevealed && 'password-input--revealed',
      className,
    ]
      .filter(Boolean)
      .join(' ')
    
    const toggleText = getToggleText(isRevealed, label)
    const inputAriaLabel = getInputAriaLabel(isRevealed, label)
    
    // Generate unique IDs for accessibility
    const inputId = `password-input-${Math.random().toString(36).substr(2, 9)}`
    const statusId = `password-status-${Math.random().toString(36).substr(2, 9)}`
    const descriptionId = `password-desc-${Math.random().toString(36).substr(2, 9)}`
    
    return (
      <div
        className={baseClasses}
        style={style}
        data-testid={testId ? `${testId}-wrapper` : 'password-input-wrapper'}
        data-revealed={isRevealed}
      >
        {/* Hidden description for screen readers */}
        <div id={descriptionId} style={srOnlyStyle}>
          Password input field. Use the toggle button to reveal or hide the password.
        </div>
        
        {/* Input field */}
        <input
          ref={ref}
          type={isRevealed ? 'text' : 'password'}
          id={inputId}
          className="password-input__input"
          aria-label={inputAriaLabel || label}
          aria-describedby={`${descriptionId} ${statusId}`}
          data-testid={testId || 'password-input'}
          data-revealed={isRevealed}
          {...inputProps}
        />
        
        {/* Toggle button */}
        <button
          type="button"
          className="password-input__toggle"
          onClick={handleToggleReveal}
          aria-pressed={isRevealed}
          aria-label={toggleText}
          aria-describedby={statusId}
          data-testid={testId ? `${testId}-toggle` : 'password-input-toggle'}
          tabIndex={-1} // Keep focus on input
        >
          {/* Eye icon placeholder - consumers can style this */}
          <span
            className="password-input__icon"
            aria-hidden="true"
            data-testid={testId ? `${testId}-icon` : 'password-input-icon'}
          >
            {isRevealed ? '👁️' : '👁️‍🗨️'}
          </span>
        </button>
        
        {/* Screen reader status announcements */}
        <div
          id={statusId}
          style={srOnlyStyle}
          aria-live="polite"
          aria-atomic="true"
          data-testid={testId ? `${testId}-status` : 'password-input-status'}
        >
          {isRevealed ? 'Password is now visible' : 'Password is now hidden'}
        </div>
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'