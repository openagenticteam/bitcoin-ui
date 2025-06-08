import { type ButtonHTMLAttributes } from 'react'
import { type BaseComponentProps, type LoadingState, type Size, type Variant } from '@/types/common'

/**
 * Props for the Button component
 */
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    BaseComponentProps,
    LoadingState {
  /** Visual style variant of the button */
  variant?: Variant
  /** Size of the button */
  size?: Size
  /** Whether the button is disabled */
  disabled?: boolean
  /** Whether the button should take the full width of its container */
  fullWidth?: boolean
  /** Icon to display before the button text */
  startIcon?: React.ReactNode
  /** Icon to display after the button text */
  endIcon?: React.ReactNode
}