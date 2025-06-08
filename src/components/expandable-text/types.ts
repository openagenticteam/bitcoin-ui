import { type BaseComponentProps } from '@/types/common'

/**
 * Text types for different content
 */
export type TextType = 'text' | 'address' | 'invoice'

/**
 * Props for the ExpandableText component
 */
export interface ExpandableTextProps extends BaseComponentProps {
  /** The text content to display */
  text: string
  /** Accessible label for the text */
  label: string
  /** Type of text content for appropriate handling */
  type?: TextType
  /** Whether to show the copy button */
  showCopyButton?: boolean
}