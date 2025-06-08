import { type TextType } from './types'

/**
 * Truncates text to show first and last characters with ellipsis in middle
 */
export function truncateText(text: string, startChars: number = 6, endChars: number = 7): string {
  if (text.length <= startChars + endChars + 3) {
    return text
  }
  
  return `${text.slice(0, startChars)}...${text.slice(-endChars)}`
}

/**
 * Copies text to clipboard and returns success status
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      const success = document.execCommand('copy')
      document.body.removeChild(textArea)
      return success
    }
  } catch (error) {
    console.error('Failed to copy text:', error)
    return false
  }
}

/**
 * Gets appropriate action text based on text type
 */
export function getActionText(type: TextType, isExpanded: boolean): string {
  const typeMap = {
    text: 'text',
    address: 'address',
    invoice: 'invoice',
  }
  
  const textType = typeMap[type]
  return isExpanded ? `Hide full ${textType}` : `View full ${textType}`
}

/**
 * Gets appropriate copy button text based on text type
 */
export function getCopyText(type: TextType, label: string): string {
  return `Copy ${label.toLowerCase()}`
}