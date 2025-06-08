import { useState } from 'react'
import { type ExpandableTextProps } from './types'
import { truncateText, copyToClipboard, getActionText, getCopyText } from './utils'

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
 * ExpandableText component that provides accessible expandable text functionality with copy support.
 * 
 * @example
 * ```tsx
 * <ExpandableText 
 *   text="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
 *   label="Bitcoin Address"
 *   type="address"
 * />
 * ```
 * 
 * @example
 * ```tsx
 * <ExpandableText 
 *   text="Very long invoice text here..."
 *   label="Invoice"
 *   type="invoice"
 *   showCopyButton={false}
 * />
 * ```
 */
export const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  label,
  type = 'text',
  showCopyButton = true,
  className = '',
  style,
  'data-testid': testId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState<'idle' | 'copying' | 'success' | 'error'>('idle')
  
  // Don't truncate very short text
  const shouldTruncate = text.length > 15
  const displayText = shouldTruncate && !isExpanded ? truncateText(text) : text
  
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }
  
  const handleCopy = async () => {
    setCopyFeedback('copying')
    
    try {
      const success = await copyToClipboard(text)
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
    'expandable-text', // Base component class
    `expandable-text--${type}`, // Type class
    isExpanded && 'expandable-text--expanded',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  
  const actionText = getActionText(type, isExpanded)
  const copyText = getCopyText(type, label)
  
  // Generate unique IDs for accessibility
  const textId = `expandable-text-${Math.random().toString(36).substr(2, 9)}`
  const statusId = `expandable-status-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div
      className={baseClasses}
      style={style}
      data-testid={testId || 'expandable-text'}
      data-type={type}
      data-expanded={isExpanded}
      role="region"
      aria-labelledby={textId}
    >
      {/* Text content */}
      <div
        className="expandable-text__content"
        data-testid={testId ? `${testId}-content` : 'expandable-text-content'}
      >
        <span
          id={textId}
          className="expandable-text__text"
          data-testid={testId ? `${testId}-text` : 'expandable-text-text'}
        >
          {displayText}
        </span>
      </div>
      
      {/* Controls */}
      <div
        className="expandable-text__controls"
        data-testid={testId ? `${testId}-controls` : 'expandable-text-controls'}
      >
        {/* Expand/Collapse button - only show if text should be truncated */}
        {shouldTruncate && (
          <button
            type="button"
            className="expandable-text__toggle"
            onClick={handleToggleExpand}
            aria-expanded={isExpanded}
            aria-controls={textId}
            aria-label={actionText}
            data-testid={testId ? `${testId}-toggle` : 'expandable-text-toggle'}
          >
            {actionText}
          </button>
        )}
        
        {/* Copy button */}
        {showCopyButton && (
          <button
            type="button"
            className="expandable-text__copy"
            onClick={handleCopy}
            disabled={copyFeedback === 'copying'}
            aria-label={copyText}
            aria-describedby={statusId}
            data-testid={testId ? `${testId}-copy` : 'expandable-text-copy'}
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
        data-testid={testId ? `${testId}-status` : 'expandable-text-status'}
      >
        {copyFeedback === 'success' && `${label} copied to clipboard`}
        {copyFeedback === 'error' && `Failed to copy ${label.toLowerCase()}`}
        {isExpanded ? `Showing full ${label.toLowerCase()}` : `Showing truncated ${label.toLowerCase()}`}
      </div>
    </div>
  )
}

ExpandableText.displayName = 'ExpandableText'