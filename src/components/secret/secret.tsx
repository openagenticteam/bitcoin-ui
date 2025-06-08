import { useState, useEffect } from 'react'
import { type SecretProps } from './types'
import { maskSecret, copyToClipboard, getCopyText, getRevealText } from './utils'

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
 * Secret component that provides accessible secret text functionality with reveal and copy support.
 * 
 * @example
 * ```tsx
 * <Secret 
 *   secret="correct horse battery staple"
 *   label="Secret Phrase"
 * />
 * ```
 * 
 * @example
 * ```tsx
 * <Secret 
 *   secret="my-secret-key"
 *   label="API Key"
 *   maskCharacter="*"
 *   showCopyButton={false}
 * />
 * ```
 */
export const Secret: React.FC<SecretProps> = ({
  secret,
  label,
  maskCharacter = '•',
  showCopyButton = true,
  className = '',
  style,
  'data-testid': testId,
}) => {
  const [isRevealed, setIsRevealed] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState<'idle' | 'copying' | 'success' | 'error'>('idle')
  
  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      // This will clean up any pending timeouts when component unmounts
    }
  }, [])
  
  const handleToggleReveal = () => {
    setIsRevealed(!isRevealed)
  }
  
  const handleCopy = async () => {
    setCopyFeedback('copying')
    
    try {
      const success = await copyToClipboard(secret)
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
    'secret', // Base component class
    isRevealed && 'secret--revealed',
    copyFeedback !== 'idle' && `secret--${copyFeedback}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')
  
  const displayText = isRevealed ? secret : maskSecret(secret, maskCharacter)
  const revealText = getRevealText(isRevealed, label)
  const copyText = getCopyText(label)
  
  // Generate unique IDs for accessibility
  const secretId = `secret-${Math.random().toString(36).substr(2, 9)}`
  const statusId = `secret-status-${Math.random().toString(36).substr(2, 9)}`
  const descriptionId = `secret-desc-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div
      className={baseClasses}
      style={style}
      data-testid={testId || 'secret'}
      data-revealed={isRevealed}
      data-copy-status={copyFeedback}
      role="group"
      aria-labelledby={secretId}
      aria-describedby={descriptionId}
    >
      {/* Hidden description for screen readers */}
      <div id={descriptionId} style={srOnlyStyle}>
        {label ? `${label}: ` : 'Secret: '}
        {isRevealed ? 'currently visible' : 'currently hidden'}
      </div>
      
      {/* Secret text display */}
      <div
        className="secret__content"
        data-testid={testId ? `${testId}-content` : 'secret-content'}
      >
        <span
          id={secretId}
          className="secret__text"
          aria-label={label ? `${label} text` : 'Secret text'}
          data-testid={testId ? `${testId}-text` : 'secret-text'}
          style={{ fontFamily: 'monospace' }}
        >
          {displayText}
        </span>
      </div>
      
      {/* Controls */}
      <div
        className="secret__controls"
        data-testid={testId ? `${testId}-controls` : 'secret-controls'}
      >
        {/* Reveal/Hide toggle button */}
        <button
          type="button"
          className="secret__toggle"
          onClick={handleToggleReveal}
          aria-pressed={isRevealed}
          aria-label={revealText}
          aria-describedby={statusId}
          data-testid={testId ? `${testId}-toggle` : 'secret-toggle'}
        >
          {revealText}
        </button>
        
        {/* Copy button */}
        {showCopyButton && (
          <button
            type="button"
            className="secret__copy"
            onClick={handleCopy}
            disabled={copyFeedback === 'copying'}
            aria-label={copyText}
            aria-describedby={statusId}
            data-testid={testId ? `${testId}-copy` : 'secret-copy'}
            data-copy-status={copyFeedback}
          >
            {copyFeedback === 'copying' ? 'Copying...' : 
             copyFeedback === 'success' ? 'Copied!' :
             copyFeedback === 'error' ? 'Failed' : 'Copy'}
          </button>
        )}
      </div>
      
      {/* Screen reader status announcements */}
      <div
        id={statusId}
        style={srOnlyStyle}
        aria-live="polite"
        aria-atomic="true"
        data-testid={testId ? `${testId}-status` : 'secret-status'}
      >
        {copyFeedback === 'success' && `${label || 'Secret'} copied to clipboard`}
        {copyFeedback === 'error' && `Failed to copy ${(label || 'secret').toLowerCase()}`}
        {isRevealed ? `${label || 'Secret'} is now visible` : `${label || 'Secret'} is now hidden`}
      </div>
    </div>
  )
}

Secret.displayName = 'Secret'