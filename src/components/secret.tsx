import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import React, { useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard-ts"

import { CheckIcon, CopyIcon, EyeNoneIcon, EyeOpenIcon } from "./icons"
import "./styles.css"
import { showToast } from "./utils"

export interface SecretProps {
  secret: string
  label?: string
  maskCharacter?: string
  showCopyButton?: boolean
  className?: string
}

/**
 * Secret component for securely displaying and copying sensitive information
 * like seed phrases and private keys.
 */
export const Secret: React.FC<SecretProps> = ({
  secret,
  label = "Secret",
  maskCharacter = "•",
  showCopyButton = true,
  className = "",
}) => {
  const [revealed, setRevealed] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const value = revealed ? secret : maskCharacter.repeat(21)

  const handleCopy = async (_text: string, result: boolean) => {
    if (result) {
      setIsCopied(true)
      showToast(`${label} copied to clipboard`)

      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } else {
      showToast(`Failed to copy ${label}`, { type: "error" })
    }
  }

  const handleReveal = () => {
    setRevealed(!revealed)
  }

  const ariaDescriptionLabel = label.toLowerCase().replace(/\s+/g, "-")

  return (
    <div
      className={`btc-component btc-card btc-secret ${className}`}
      role="group"
      aria-label={`${label} field`}
    >
      <div className="btc-secret__content">
        <div
          className="btc-secret__text btc-mono"
          aria-describedby={`secret-description-${ariaDescriptionLabel}`}
          data-testid="secret-text"
        >
          {value}
        </div>
        <VisuallyHidden asChild>
          <span
            id={`secret-description-${ariaDescriptionLabel}`}
            aria-live="polite"
          >
            {revealed ? `${label}: ${secret}` : `${label} (hidden)`}
          </span>
        </VisuallyHidden>
      </div>

      <div className="btc-secret__controls">
        <button
          type="button"
          onClick={handleReveal}
          aria-label={revealed ? `Hide ${label}` : `Reveal ${label}`}
          aria-pressed={revealed}
          className="btc-button btc-focus"
          data-testid="reveal-button"
        >
          {revealed ? <EyeNoneIcon /> : <EyeOpenIcon />}
        </button>

        {showCopyButton && (
          <CopyToClipboard text={secret} onCopy={handleCopy}>
            <button
              type="button"
              aria-label={`Copy ${label}`}
              className="btc-button btc-focus"
              data-testid="copy-button"
            >
              {isCopied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </CopyToClipboard>
        )}
      </div>
    </div>
  )
}
