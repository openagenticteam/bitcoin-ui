import {
  truncateText,
  copyToClipboard,
  getActionText,
  getCopyText,
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

describe('ExpandableText utils', () => {
  beforeEach(() => {
    mockWriteText.mockClear()
    mockExecCommand.mockClear()
  })

  describe('truncateText', () => {
    it('truncates long text correctly with default parameters', () => {
      const longText = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
      const result = truncateText(longText)
      expect(result).toBe('bc1qxy...fjhx0wlh')
    })

    it('truncates text with custom start and end characters', () => {
      const longText = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
      const result = truncateText(longText, 4, 4)
      expect(result).toBe('bc1q...0wlh')
    })

    it('does not truncate short text', () => {
      const shortText = 'short'
      const result = truncateText(shortText)
      expect(result).toBe('short')
    })

    it('handles edge case where text length equals start + end + ellipsis', () => {
      const text = '123456789012345' // 15 characters (6 + 6 + 3)
      const result = truncateText(text)
      expect(result).toBe(text) // Should not truncate
    })

    it('handles very short start and end parameters', () => {
      const longText = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
      const result = truncateText(longText, 2, 2)
      expect(result).toBe('bc...lh')
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

  describe('getActionText', () => {
    it('returns correct text for address type', () => {
      expect(getActionText('address', false)).toBe('View full address')
      expect(getActionText('address', true)).toBe('Hide full address')
    })

    it('returns correct text for invoice type', () => {
      expect(getActionText('invoice', false)).toBe('View full invoice')
      expect(getActionText('invoice', true)).toBe('Hide full invoice')
    })

    it('returns correct text for text type', () => {
      expect(getActionText('text', false)).toBe('View full text')
      expect(getActionText('text', true)).toBe('Hide full text')
    })
  })

  describe('getCopyText', () => {
    it('returns correct copy text for different labels', () => {
      expect(getCopyText('address', 'Bitcoin Address')).toBe('Copy bitcoin address')
      expect(getCopyText('invoice', 'Lightning Invoice')).toBe('Copy lightning invoice')
      expect(getCopyText('text', 'Text Content')).toBe('Copy text content')
    })

    it('handles uppercase labels correctly', () => {
      expect(getCopyText('address', 'BITCOIN ADDRESS')).toBe('Copy bitcoin address')
    })
  })
})