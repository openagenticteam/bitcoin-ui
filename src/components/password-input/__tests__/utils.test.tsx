import {
  getToggleText,
  getInputAriaLabel,
} from '../utils'

describe('PasswordInput utils', () => {
  describe('getToggleText', () => {
    it('returns correct text when hidden', () => {
      expect(getToggleText(false, 'Password')).toBe('Reveal password')
      expect(getToggleText(false, 'Confirm Password')).toBe('Reveal confirm password')
      expect(getToggleText(false)).toBe('Reveal password')
    })

    it('returns correct text when revealed', () => {
      expect(getToggleText(true, 'Password')).toBe('Hide password')
      expect(getToggleText(true, 'Confirm Password')).toBe('Hide confirm password')
      expect(getToggleText(true)).toBe('Hide password')
    })

    it('handles uppercase labels correctly', () => {
      expect(getToggleText(false, 'PASSWORD')).toBe('Reveal password')
      expect(getToggleText(true, 'PASSWORD')).toBe('Hide password')
    })
  })

  describe('getInputAriaLabel', () => {
    it('returns correct aria-label when hidden', () => {
      expect(getInputAriaLabel(false, 'Password')).toBe('Password (hidden)')
      expect(getInputAriaLabel(false, 'Confirm Password')).toBe('Confirm Password (hidden)')
    })

    it('returns correct aria-label when revealed', () => {
      expect(getInputAriaLabel(true, 'Password')).toBe('Password (visible)')
      expect(getInputAriaLabel(true, 'Confirm Password')).toBe('Confirm Password (visible)')
    })

    it('returns empty string when no label provided', () => {
      expect(getInputAriaLabel(false)).toBe('')
      expect(getInputAriaLabel(true)).toBe('')
      expect(getInputAriaLabel(false, undefined)).toBe('')
    })
  })
})