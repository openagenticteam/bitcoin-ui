import {
  maskSecret,
  copyToClipboard,
  getCopyText,
  getRevealText,
} from '../utils'

// Mock clipboard API
const mockWriteText = jest.fn()
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
})

// Mock document.execCommand for fallback
const mockExecCommand = jest.fn()
Object.assign(document, {
  execCommand: mockExecCommand,
})

describe('Secret utils', () => {
  beforeEach(() => {
    mockWriteText.mockClear()
    mockExecCommand.mockClear()
  })

  describe('maskSecret', () => {
    it('creates mask with default character', () => {
      const result = maskSecret('test secret')
      expect(result).toBe('•••••••••••••••••••••')
      expect(result).toHaveLength(21)
    })

    it('creates mask with custom character', () => {
      const result = maskSecret('test secret', '*')
      expect(result).toBe('*********************')
      expect(result).toHaveLength(21)
    })

    it('handles empty secret', () => {
      const result = maskSecret('')
      expect(result).toBe('')
    })

    it('creates consistent mask regardless of secret length', () => {
      const shortSecret = maskSecret('abc')
      const longSecret = maskSecret('this is a very long secret phrase')
      
      expect(shortSecret).toBe('•••••••••••••••••••••')
      expect(longSecret).toBe('•••••••••••••••••••••')
      expect(shortSecret).toEqual(longSecret)
    })
  })

  describe('copyToClipboard', () => {
    it('uses clipboard API when available', async () => {
      mockWriteText.mockResolvedValue(undefined)
      
      const result = await copyToClipboard('test text')
      
      expect(mockWriteText).toHaveBeenCalledWith('test text')
      expect(result).toBe(true)
    })

    it('handles clipboard API failure', async () => {
      mockWriteText.mockRejectedValue(new Error('Clipboard failed'))
      
      const result = await copyToClipboard('test text')
      
      expect(result).toBe(false)
    })

    it('falls back to execCommand when clipboard API is not available', async () => {
      // Mock clipboard as undefined
      const originalClipboard = navigator.clipboard
      // @ts-ignore
      delete navigator.clipboard
      
      mockExecCommand.mockReturnValue(true)
      
      // Mock document methods
      const mockTextArea = {
        value: '',
        style: {},
        focus: jest.fn(),
        select: jest.fn(),
      }
      const mockCreateElement = jest.fn().mockReturnValue(mockTextArea)
      const mockAppendChild = jest.fn()
      const mockRemoveChild = jest.fn()
      
      Object.assign(document, {
        createElement: mockCreateElement,
        body: {
          appendChild: mockAppendChild,
          removeChild: mockRemoveChild,
        },
      })
      
      const result = await copyToClipboard('test text')
      
      expect(mockCreateElement).toHaveBeenCalledWith('textarea')
      expect(mockTextArea.value).toBe('test text')
      expect(mockTextArea.focus).toHaveBeenCalled()
      expect(mockTextArea.select).toHaveBeenCalled()
      expect(mockExecCommand).toHaveBeenCalledWith('copy')
      expect(result).toBe(true)
      
      // Restore clipboard
      Object.assign(navigator, { clipboard: originalClipboard })
    })

    it('handles execCommand failure in fallback', async () => {
      // Mock clipboard as undefined
      const originalClipboard = navigator.clipboard
      // @ts-ignore
      delete navigator.clipboard
      
      mockExecCommand.mockReturnValue(false)
      
      // Mock document methods
      const mockTextArea = {
        value: '',
        style: {},
        focus: jest.fn(),
        select: jest.fn(),
      }
      const mockCreateElement = jest.fn().mockReturnValue(mockTextArea)
      const mockAppendChild = jest.fn()
      const mockRemoveChild = jest.fn()
      
      Object.assign(document, {
        createElement: mockCreateElement,
        body: {
          appendChild: mockAppendChild,
          removeChild: mockRemoveChild,
        },
      })
      
      const result = await copyToClipboard('test text')
      
      expect(result).toBe(false)
      
      // Restore clipboard
      Object.assign(navigator, { clipboard: originalClipboard })
    })
  })

  describe('getCopyText', () => {
    it('returns correct copy text with label', () => {
      expect(getCopyText('Secret Phrase')).toBe('Copy secret phrase')
      expect(getCopyText('API Key')).toBe('Copy api key')
      expect(getCopyText('Password')).toBe('Copy password')
    })

    it('returns default text without label', () => {
      expect(getCopyText()).toBe('Copy secret')
      expect(getCopyText(undefined)).toBe('Copy secret')
    })

    it('handles uppercase labels correctly', () => {
      expect(getCopyText('SECRET PHRASE')).toBe('Copy secret phrase')
    })
  })

  describe('getRevealText', () => {
    it('returns correct reveal text when hidden', () => {
      expect(getRevealText(false, 'Secret Phrase')).toBe('Reveal secret phrase')
      expect(getRevealText(false, 'API Key')).toBe('Reveal api key')
      expect(getRevealText(false)).toBe('Reveal secret')
    })

    it('returns correct hide text when revealed', () => {
      expect(getRevealText(true, 'Secret Phrase')).toBe('Hide secret phrase')
      expect(getRevealText(true, 'API Key')).toBe('Hide api key')
      expect(getRevealText(true)).toBe('Hide secret')
    })

    it('handles uppercase labels correctly', () => {
      expect(getRevealText(false, 'SECRET PHRASE')).toBe('Reveal secret phrase')
      expect(getRevealText(true, 'SECRET PHRASE')).toBe('Hide secret phrase')
    })
  })
})