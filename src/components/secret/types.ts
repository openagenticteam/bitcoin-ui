import { type BaseComponentProps } from '@/types/common'

/**
 * Props for the Secret component
 */
export interface SecretProps extends BaseComponentProps {
  /** The secret text to display */
  secret: string
  /** Accessible label for the secret */
  label?: string
  /** Character to use for masking */
  maskCharacter?: string
  /** Whether to show the copy button */
  showCopyButton?: boolean
}