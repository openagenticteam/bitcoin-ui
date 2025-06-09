import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import React, { forwardRef, useCallback, useEffect, useState } from "react"

import type { Currency, Locale } from "./utils"
import { formatCurrencyValue, isValidAmount } from "./utils"
import "./styles.css"

const CURRENCY_SYMBOLS = {
  BTC: "₿",
  USD: "$",
  EUR: "€",
}

const CURRENCY_PLACEHOLDERS = {
  BTC: "0.021",
  USD: "100.00",
  EUR: "100,00",
}

export interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  currency: Currency
  locale?: Locale
  label?: string
}

/**
 * CurrencyInput component wraps the input and prefixes the field with a
 * static currency symbol. Useful for forms that accept currency values.
 *
 * This component maintains the same API surface as a regular <input> element.
 */
export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({
    className = "",
    onChange,
    value,
    defaultValue,
    placeholder,
    currency = "USD",
    locale: rawLocale,
    label,
    ...props
  }, ref) => {
    const locale = rawLocale ?? (currency === "EUR" ? "EU" : "US")
    const isControlled = value !== undefined

    const formatNumber = useCallback(
      (numStr: string): string => {
        if (numStr === "") {
          return ""
        }
        return formatCurrencyValue(numStr, locale)
      },
      [locale],
    )

    const [internal, setInternal] = useState<string>(() => {
      const initial = isControlled
        ? (value as string) ?? ""
        : (defaultValue as string) ?? ""
      return formatNumber(initial.toString())
    })

    // Sync controlled value
    useEffect(() => {
      if (isControlled) {
        setInternal(formatNumber((value as string) ?? ""))
      }
    }, [value, isControlled, formatNumber])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawInput = e.target.value.replace(
        locale === "EU" ? /\./g : /,/g,
        "",
      )

      // Prevent leading zeros (e.g., 0100 -> should be 100)
      if (/^0\d+$/.test(rawInput)) {
        return
      }

      // Basic validation
      if (
        rawInput !== ""
        && !isValidAmount(rawInput, currency)
        // eslint-disable-next-line regexp/no-unused-capturing-group
        && !/^(\d+\.)?$/.test(rawInput)
      ) {
        return
      }

      const formatted = formatNumber(rawInput)

      // Always update internal for immediate UI feedback
      setInternal(formatted)

      if (onChange) {
        // Mutate event target value to raw version before propagating
        (e.target as HTMLInputElement).value = rawInput
        onChange(e)
      }
    }

    const ariaDescriptionLabel = label?.toLowerCase().replace(/\s+/g, "-")

    return (
      <div
        className={`btc-component btc-currency ${className}`}
        role="group"
        aria-label={label ? `${label} field` : `${currency} input field`}
      >
        {label && (
          <VisuallyHidden asChild>
            <label
              htmlFor={`currency-input-${currency}`}
              aria-live="polite"
            >
              {label}
            </label>
          </VisuallyHidden>
        )}

        <span className="btc-currency__symbol" aria-hidden="true">
          {CURRENCY_SYMBOLS[currency]}
        </span>

        <input
          ref={ref}
          id={`currency-input-${currency}`}
          type="text"
          inputMode="decimal"
          className="btc-currency__input"
          value={internal}
          onChange={handleChange}
          placeholder={placeholder ?? CURRENCY_PLACEHOLDERS[currency]}
          aria-label={label || `${currency} amount`}
          aria-describedby={ariaDescriptionLabel ? `currency-description-${ariaDescriptionLabel}` : undefined}
          data-testid="currency-input"
          {...props}
        />

        {ariaDescriptionLabel && (
          <VisuallyHidden asChild>
            <span
              id={`currency-description-${ariaDescriptionLabel}`}
              aria-live="polite"
            >
              {label}
              {" "}
              in
              {currency}
            </span>
          </VisuallyHidden>
        )}
      </div>
    )
  },
)

CurrencyInput.displayName = "CurrencyInput"
