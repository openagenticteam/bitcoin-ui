import { type BaseComponentProps } from '@/types/common'

/**
 * Error correction levels for QR codes
 */
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'

/**
 * Props for the QRCode component
 */
export interface QRCodeProps extends BaseComponentProps {
  /** The value to encode in the QR code */
  value: string
  /** Accessible label for the QR code */
  label: string
  /** Size of the QR code in pixels */
  size?: number
  /** Optional description text */
  description?: string
  /** Error correction level */
  level?: ErrorCorrectionLevel
}