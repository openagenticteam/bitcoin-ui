"use client"

import { QRCodeSVG } from "qrcode.react"
import React, { useEffect, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard-ts"

import "./styles.css"
import { showToast } from "./utils"

export interface QRCodeProps {
  value: string
  label: string
  size?: number
  className?: string
  description?: string
  errorCorrectionLevel?: "L" | "M" | "Q" | "H"
}

/**
 * QRCode component that provides accessible QR code functionality with copy support.
 */
export const QRCode: React.FC<QRCodeProps> = ({
  value,
  label,
  size = 300,
  className = "",
  description,
  errorCorrectionLevel = "M",
}) => {
  const [isCopied, setIsCopied] = useState(false)

  // Reset isCopied when component mounts or value changes
  useEffect(() => {
    setIsCopied(false)
  }, [value])

  const handleCopy = async (_text: string, result: boolean) => {
    if (result) {
      setIsCopied(true)
      showToast(`${label} copied to clipboard`)

      // Reset the copied state after animation
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } else {
      showToast(`Failed to copy ${label}`, { type: "error" })
    }
  }

  return (
    <div
      className={`btc-component btc-qr ${className}`}
      role="group"
      aria-label={label}
    >
      {description && (
        <p className="btc-qr__description" id={`${label}-description`}>
          {description}
        </p>
      )}

      <div className="btc-qr__container">
        <CopyToClipboard text={value} onCopy={handleCopy}>
          <button
            type="button"
            className="btc-qr__button btc-focus"
            aria-label={`Click to copy ${label}`}
            aria-describedby={description ? `${label}-description` : undefined}
            data-testid="qr-button"
          >
            <QRCodeSVG
              value={value}
              size={size}
              level={errorCorrectionLevel}
              includeMargin={true}
              aria-hidden="true"
              className="btc-qr__svg"
            />
          </button>
        </CopyToClipboard>

        <p className="btc-qr__label">
          {isCopied
            ? "Copied!"
            : `Click QR code to copy ${label.toLowerCase()}`}
        </p>
      </div>
    </div>
  )
}
