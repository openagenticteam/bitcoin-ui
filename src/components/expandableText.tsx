import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import React, { useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard-ts"

import { CheckIcon, CopyIcon } from "./icons"
import { showToast, truncateText } from "./utils"
import "./styles.css"

export interface ExpandableTextProps {
  text: string
  label: string
  type?: "text" | "address" | "invoice"
  showCopyButton?: boolean
  startChars?: number
  endChars?: number
  className?: string
}

/**
 * ExpandableText component for displaying long text with expand/collapse
 * and copy functionality.
 */
export const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  label,
  type = "text",
  showCopyButton = true,
  startChars = 6,
  endChars = 6,
  className = "",
}) => {
  const [isCopied, setIsCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

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

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  const displayText = isExpanded ? text : truncateText(text, startChars, endChars)
  const shouldTruncate = text.length > startChars + endChars + 3

  const ariaDescriptionLabel = label.toLowerCase().replace(/\s+/g, "-")

  return (
    <div
      className={`btc-component btc-card btc-expandable ${className}`}
      role="group"
      aria-label={label}
    >
      <div className="btc-expandable__content">
        <div
          className="btc-expandable__text btc-mono"
          aria-describedby={`expandable-description-${ariaDescriptionLabel}`}
          data-testid="expandable-text"
        >
          {displayText}
        </div>

        {/* Screen reader only description - using Radix UI's VisuallyHidden component */}
        <VisuallyHidden asChild>
          <div
            id={`expandable-description-${ariaDescriptionLabel}`}
            aria-live="polite"
          >
            {label}
            :
            {isExpanded ? text : displayText}
          </div>
        </VisuallyHidden>

        {shouldTruncate && (
          <button
            type="button"
            onClick={handleToggle}
            className="btc-expandable__toggle btc-focus"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? `Hide full ${type}` : `View full ${type}`}
            data-testid="expand-button"
          >
            {isExpanded ? `Hide full ${type}` : `View full ${type}`}
          </button>
        )}
      </div>

      {showCopyButton && (
        <div className="btc-expandable__copy">
          <CopyToClipboard text={text} onCopy={handleCopy}>
            <button
              type="button"
              className="btc-button btc-focus"
              aria-label={`Copy ${label}`}
              data-testid="copy-button"
            >
              {isCopied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </CopyToClipboard>
        </div>
      )}
    </div>
  )
}
