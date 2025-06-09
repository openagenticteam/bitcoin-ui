import "@testing-library/jest-dom"
import "jest-axe/extend-expect"

// Mock clipboard API
const mockWriteText = jest.fn()
const mockReadText = jest.fn()

Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
    readText: mockReadText,
  },
})

// Mock document.execCommand for fallback clipboard functionality
Object.assign(document, {
  execCommand: jest.fn(() => true),
})

// Mock window.getSelection for copy functionality
Object.assign(window, {
  getSelection: jest.fn(() => ({
    removeAllRanges: jest.fn(),
    addRange: jest.fn(),
  })),
})

// Mock console.error to avoid noise in tests
const originalError = console.error
beforeEach(() => {
  console.error = jest.fn()
  mockWriteText.mockClear()
  mockReadText.mockClear()

  // Reset clipboard mock to succeed by default
  mockWriteText.mockResolvedValue(undefined)
})

afterEach(() => {
  console.error = originalError
})

// Export mocks for use in tests
globalThis.mockWriteText = mockWriteText
globalThis.mockReadText = mockReadText
