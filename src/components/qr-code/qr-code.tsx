import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { type QRCodeProps } from './types'
import { copyToClipboard, getCopyText } from './utils'

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
 * QRCode component that provides accessible QR code functionality with copy support.
 * 
 * @example
 * ```tsx
 * <QRCode 
 *   value="bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
 *   label="Bitcoin Address QR"
 * />
 * ```
 * 
 * @example
 * ```tsx
 * <QRCode 
 *   value="https://example.com"
 *   label="Website QR"
 *   size={300}
 *   description="Scan to visit website"
 * />
 * ```
 */
export const QRCode: React.FC<QRCodeProps> = ({
  value,
  label,
  size = 256,
  description,
  level = 'M',
  className = '',
  style,
  'data-testid': testId,
}) => {
  const [copyFeedback, setCopyFeedback] = useState<'idle' | 'copying' | 'success' | 'error'>('idle')
  
  // Reset copy state when value changes
  useEffect(() => {
    setCopyFeedback('idle')
  }, [value])
  
  const handleCopy = async () => {
    setCopyFeedback('copying')
    
    try {
      const success = await copyToClipboard(value)
      setCopyFeedback(success ? 'success' : 'error')
      
      // Reset feedback after 2 seconds
      setTimeout(() => {
        setCopyFeedback('idle')
      }, 2000)
    } catch (error) {
      setCopyFeedback('error')
      setTimeout(() => {
        setCopyFeedback('idle')
      }, 2000)
    }
  }
  
  // Build class names for styling hooks
  const baseClasses = [
    'qr-code', // Base component class
    copyFeedback !== 'idle' && `qr-code--${copyFeedback}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')
  
  const copyText = getCopyText(label)
  
  // Generate unique IDs for accessibility
  const qrId = `qr-code-${Math.random().toString(36).substr(2, 9)}`
  const statusId = `qr-status-${Math.random().toString(36).substr(2, 9)}`
  const descriptionId = description ? `qr-desc-${Math.random().toString(36).substr(2, 9)}` : undefined
  
  return (
    <div
      className={baseClasses}
      style={style}
      data-testid={testId || 'qr-code'}
      data-copy-status={copyFeedback}
      role="group"
      aria-labelledby={qrId}
      aria-describedby={descriptionId}
    >
      {/* Label */}
      <div
        id={qrId}
        className="qr-code__label"
        data-testid={testId ? `${testId}-label` : 'qr-code-label'}
      >
        {label}
      </div>
      
      {/* Optional description */}
      {description && (
        <div
          id={descriptionId}
          className="qr-code__description"
          data-testid={testId ? `${testId}-description` : 'qr-code-description'}
        >
          {description}
        </div>
      )}
      
      {/* QR Code Button */}
      <button
        type="button"
        className="qr-code__button"
        onClick={handleCopy}
        disabled={copyFeedback === 'copying'}
        aria-label={copyText}
        aria-describedby={statusId}
        data-testid={testId ? `${testId}-button` : 'qr-code-button'}
        data-copy-status={copyFeedback}
      >
        <QRCodeSVG
          value={value}
          size={size}
          level={level}
          includeMargin={true}
          className="qr-code__svg"
          aria-hidden="true"
          data-testid={testId ? `${testId}-svg` : 'qr-code-svg'}
        />
        
        {/* Copy feedback overlay */}
        {copyFeedback !== 'idle' && (
          <div
            className="qr-code__feedback"
            data-testid={testId ? `${testId}-feedback` : 'qr-code-feedback'}
          >
            {copyFeedback === 'copying' ? 'Copying...' : 
             copyFeedback === 'success' ? 'Copied!' :
             copyFeedback === 'error' ? 'Failed' : ''}
          </div>
        )}
      </button>
      
      {/* Screen reader status announcements */}
      <div
        id={statusId}
        style={srOnlyStyle}
        aria-live="polite"
        aria-atomic="true"
        data-testid={testId ? `${testId}-status` : 'qr-code-status'}
      >
        {copyFeedback === 'success' && `${label} copied to clipboard`}
        {copyFeedback === 'error' && `Failed to copy ${label.toLowerCase()}`}
      </div>
    </div>
  )
}

QRCode.displayName = 'QRCode'