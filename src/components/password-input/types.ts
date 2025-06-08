import { type BaseComponentProps } from '@/types/common'

/**
 * Props for the PasswordInput component
 */
export interface PasswordInputProps
  extends Omit<React.ComponentProps<'input'>, 'type'>,
    BaseComponentProps {
  /** Label for accessibility */
  label?: string
}