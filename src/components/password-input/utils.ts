/**
 * Gets appropriate toggle button text based on revealed state
 */
export function getToggleText(isRevealed: boolean, label?: string): string {
  const target = label ? label.toLowerCase() : 'password'
  return isRevealed ? `Hide ${target}` : `Reveal ${target}`
}

/**
 * Gets appropriate aria-label for the input based on state
 */
export function getInputAriaLabel(isRevealed: boolean, label?: string): string {
  if (!label) return ''
  
  const state = isRevealed ? 'visible' : 'hidden'
  return `${label} (${state})`
}