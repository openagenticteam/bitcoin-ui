import { forwardRef, useState, useEffect } from 'react'
import { type CurrencyInputProps } from './types'
import {
  CURRENCY_SYMBOLS,
  DEFAULT_PLACEHOLDERS,
  isValidAmount,
  formatCurrencyValue,
  parseFormattedValue,
  getInputMode,
} from './utils'

// Add CSS class for screen reader only content
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
 * CurrencyInput component that provides accessible currency input functionality with locale-aware formatting.
 * 
 * @example
 * ```tsx
 * <CurrencyInput 
 *   currency="USD" 
 *   locale="US" 
 *   label="Amount"
 *   onChange={(e) => console.log(e.target.value)}
 * />
 * ```
 * 
 * @example
 * ```tsx
 * <CurrencyInput 
 *   currency="BTC" 
 *   locale="EU" 
 *   value={amount}
 *   onChange={handleChange}
 * />
 * ```
 */
export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      currency,
      locale = 'US',
      label,
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      placeholder,
      className = '',
      autoFocus,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    
    // Determine if this is a controlled component
    const isControlled = value !== undefined
    
    // Initialize display value
    useEffect(() => {
      const initialValue = isControlled ? value : defaultValue
      if (initialValue) {
        setDisplayValue(formatCurrencyValue(String(initialValue), locale))
      }
    }, [value, defaultValue, locale, isControlled])
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value
      
      // Validate the input
      const rawValue = parseFormattedValue(inputValue, locale)
      if (!isValidAmount(rawValue, currency)) {
        return // Reject invalid input
      }
      
      // Update display value
      if (!isControlled) {
        setDisplayValue(inputValue)
      }
      
      // Create a new event with the raw value for the onChange callback
      const syntheticEvent = {
        ...event,
        target: {
          ...event.target,
          value: rawValue,
        },
      }
      
      onChange?.(syntheticEvent)
    }
    
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      onFocus?.(event)
    }
    
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      
      // Format the value on blur if not empty
      const rawValue = parseFormattedValue(event.target.value, locale)
      if (rawValue && !isControlled) {
        setDisplayValue(formatCurrencyValue(rawValue, locale))
      }
      
      onBlur?.(event)
    }
    
    // Get the current display value
    const currentDisplayValue = isControlled 
      ? (isFocused ? parseFormattedValue(displayValue, locale) : formatCurrencyValue(String(value || ''), locale))
      : displayValue
    
    // Build class names for styling hooks
    const baseClasses = [
      'currency-input', // Base component class
      `currency-input--${currency.toLowerCase()}`, // Currency class
      `currency-input--${locale.toLowerCase()}`, // Locale class
      isFocused && 'currency-input--focused',
      className,
    ]
      .filter(Boolean)
      .join(' ')
    
    const currencySymbol = CURRENCY_SYMBOLS[currency]
    const defaultPlaceholder = placeholder || DEFAULT_PLACEHOLDERS[currency]
    
    // Generate a unique ID for aria-describedby if no label is provided
    const ariaDescribedBy = label ? undefined : `${currency.toLowerCase()}-amount-input-${Math.random().toString(36).substr(2, 9)}`
    
    return (
      <div
        className={baseClasses}
        data-currency={currency}
        data-locale={locale}
        data-focused={isFocused}
        data-testid={testId ? `${testId}-wrapper` : 'currency-input-wrapper'}
      >
        <span
          className="currency-input__symbol"
          aria-hidden="true"
          data-testid={testId ? `${testId}-symbol` : 'currency-symbol'}
        >
          {currencySymbol}
        </span>
        
        {/* Hidden description for screen readers when no label is provided */}
        {!label && (
          <span id={ariaDescribedBy} style={srOnlyStyle}>
            {currency} amount input
          </span>
        )}
        
        <input
          ref={ref}
          type="text"
          inputMode={getInputMode(currency)}
          className="currency-input__input"
          value={currentDisplayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={defaultPlaceholder}
          autoFocus={autoFocus}
          aria-label={label}
          aria-describedby={ariaDescribedBy}
          data-testid={testId || 'currency-input'}
          data-currency={currency}
          data-locale={locale}
          {...props}
        />
      </div>
    )
  }
)

CurrencyInput.displayName = 'CurrencyInput'