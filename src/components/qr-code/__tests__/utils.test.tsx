import {
  copyToClipboard,
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

describe('QRCode utils', () => {
  beforeEach(() => {
    mockWriteText.mockClear()
    mockExecCommand.mockClear()
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
    it('returns correct copy text for different labels', () => {
      expect(getCopyText('Bitcoin Address QR')).toBe('Click to copy bitcoin address qr')
      expect(getCopyText('Website QR Code')).toBe('Click to copy website qr code')
      expect(getCopyText('Payment QR')).toBe('Click to copy payment qr')
    })

    it('handles uppercase labels correctly', () => {
      expect(getCopyText('BITCOIN ADDRESS QR')).toBe('Click to copy bitcoin address qr')
    })
  })
})