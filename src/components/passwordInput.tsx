"use client"

import React, { forwardRef, useState } from "react"

import { EyeNoneIcon, EyeOpenIcon } from "./icons"
import "./styles.css"

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
}

/**
 * PasswordInput component that provides accessible password input functionality
 * with reveal/hide toggle.
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className = "", label, ...props }, ref) => {
    const [revealed, setRevealed] = useState(false)

    const handleToggle = () => {
      setRevealed(!revealed)
    }

    const ariaDescriptionLabel = label?.toLowerCase().replace(/\s+/g, "-")

    return (
      <div
        className={`btc-component btc-card btc-password ${className}`}
        role="group"
        aria-label={label ? `${label} field` : "Password field"}
      >
        <input
          ref={ref}
          type={revealed ? "text" : "password"}
          className="btc-password__input"
          aria-describedby={ariaDescriptionLabel ? `password-description-${ariaDescriptionLabel}` : undefined}
          data-testid="password-input"
          {...props}
        />

        {ariaDescriptionLabel && (
          <span
            id={`password-description-${ariaDescriptionLabel}`}
            className="btc-sr-only"
          >
            {label}
            {" "}
            {revealed ? "(visible)" : "(hidden)"}
          </span>
        )}

        <button
          type="button"
          onClick={handleToggle}
          aria-label={revealed ? `Hide ${label || "password"}` : `Show ${label || "password"}`}
          aria-pressed={revealed}
          className="btc-button btc-password__toggle btc-focus"
          data-testid="password-toggle"
        >
          {revealed ? <EyeNoneIcon /> : <EyeOpenIcon />}
        </button>
      </div>
    )
  },
)

PasswordInput.displayName = "PasswordInput"
