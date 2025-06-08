/**
 * Creates a masked version of the secret text
 */
export function maskSecret(secret: string, maskCharacter: string = '•'): string {
  if (!secret) return ''
  
  // Use a fixed length of 21 characters for consistent masking
  return maskCharacter.repeat(21)
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
 * Gets appropriate copy button text based on label
 */
export function getCopyText(label?: string): string {
  if (label) {
    return `Copy ${label.toLowerCase()}`
  }
  return 'Copy secret'
}

/**
 * Gets appropriate reveal button text based on state and label
 */
export function getRevealText(isRevealed: boolean, label?: string): string {
  const target = label ? label.toLowerCase() : 'secret'
  return isRevealed ? `Hide ${target}` : `Reveal ${target}`
}