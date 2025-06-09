import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'
import 'jest-axe/extend-expect'

// Configure React Testing Library
configure({
  testIdAttribute: 'data-testid',
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock document.execCommand for clipboard fallback
Object.defineProperty(document, 'execCommand', {
  writable: true,
  value: jest.fn().mockImplementation(() => true),
})