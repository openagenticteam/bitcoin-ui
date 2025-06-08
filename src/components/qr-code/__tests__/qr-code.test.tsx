import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QRCode } from '../qr-code'

// Mock clipboard API
const mockWriteText = jest.fn()
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
})

describe('QRCode', () => {
  const testValue = 'bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
  
  beforeEach(() => {
    mockWriteText.mockClear()
    mockWriteText.mockResolvedValue(undefined)
    jest.clearAllTimers()
  })

  it('renders with label and QR code', () => {
    render(<QRCode value={testValue} label="Bitcoin Address QR" />)
    
    expect(screen.getByText('Bitcoin Address QR')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /click to copy bitcoin address qr/i })
    ).toBeInTheDocument()
    expect(screen.getByTestId('qr-code-svg')).toBeInTheDocument()
  })

  it('shows copy feedback when clicked', async () => {
    render(<QRCode value={testValue} label="Bitcoin Address QR" />)
    
    const button = screen.getByRole('button', {
      name: /click to copy bitcoin address qr/i,
    })
    
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith(testValue)
    })
    
    // Check for "Copied!" feedback
    expect(screen.getByText(/copied!/i)).toBeInTheDocument()
  })

  it('resets copy state after timeout', async () => {
    jest.useFakeTimers()
    
    render(<QRCode value={testValue} label="Bitcoin Address QR" />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(screen.getByText(/copied!/i)).toBeInTheDocument()
    })
    
    // Fast-forward time
    jest.advanceTimersByTime(2100)
    
    await waitFor(() => {
      expect(screen.queryByText(/copied!/i)).not.toBeInTheDocument()
    })
    
    jest.useRealTimers()
  })

  it('renders with custom size', () => {
    render(<QRCode value={testValue} label="Bitcoin QR" size={150} />)
    
    const svgElement = screen.getByTestId('qr-code-svg')
    expect(svgElement).toHaveAttribute('width', '150')
    expect(svgElement).toHaveAttribute('height', '150')
  })

  it('renders with description', () => {
    render(
      <QRCode 
        value={testValue} 
        label="Bitcoin QR" 
        description="Scan to get Bitcoin address"
      />
    )
    
    expect(screen.getByText('Scan to get Bitcoin address')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <QRCode 
        value={testValue} 
        label="Bitcoin QR" 
        className="custom-qr-class"
      />
    )
    
    expect(container.firstChild).toHaveClass('custom-qr-class')
  })

  it('resets copy state when value changes', async () => {
    const { rerender } = render(
      <QRCode value={testValue} label="Bitcoin QR" />
    )
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(screen.getByText(/copied!/i)).toBeInTheDocument()
    })
    
    // Change the value
    rerender(<QRCode value="new-value" label="Bitcoin QR" />)
    
    // Copy state should be reset
    expect(screen.queryByText(/copied!/i)).not.toBeInTheDocument()
  })

  it('handles copy failure gracefully', async () => {
    mockWriteText.mockRejectedValue(new Error('Copy failed'))
    
    render(<QRCode value={testValue} label="Bitcoin Address QR" />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Failed')).toBeInTheDocument()
    })
  })

  it('disables button while copying', async () => {
    // Make the promise not resolve immediately
    let resolvePromise: (value: unknown) => void
    const copyPromise = new Promise(resolve => {
      resolvePromise = resolve
    })
    mockWriteText.mockReturnValue(copyPromise)
    
    render(<QRCode value={testValue} label="Bitcoin Address QR" />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(button).toBeDisabled()
    expect(screen.getByText('Copying...')).toBeInTheDocument()
    
    // Resolve the promise
    resolvePromise!(undefined)
    
    await waitFor(() => {
      expect(button).not.toBeDisabled()
    })
  })

  it('sets correct data attributes', () => {
    render(
      <QRCode 
        value={testValue} 
        label="Bitcoin QR" 
        data-testid="custom-qr"
      />
    )
    
    const component = screen.getByTestId('custom-qr')
    expect(component).toHaveAttribute('data-copy-status', 'idle')
    
    // Click and check status change
    fireEvent.click(screen.getByRole('button'))
    expect(component).toHaveAttribute('data-copy-status', 'copying')
  })

  it('provides proper accessibility attributes', () => {
    render(
      <QRCode 
        value={testValue} 
        label="Bitcoin Address QR" 
        description="Scan this code"
      />
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Click to copy bitcoin address qr')
    expect(button).toHaveAttribute('aria-describedby')
    
    const component = screen.getByTestId('qr-code')
    expect(component).toHaveAttribute('role', 'group')
    expect(component).toHaveAttribute('aria-labelledby')
    expect(component).toHaveAttribute('aria-describedby')
    
    const svg = screen.getByTestId('qr-code-svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('announces state changes to screen readers', async () => {
    render(<QRCode value={testValue} label="Bitcoin Address QR" />)
    
    const statusElement = screen.getByTestId('qr-code-status')
    expect(statusElement).toHaveAttribute('aria-live', 'polite')
    
    // Test copy success announcement
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(statusElement).toHaveTextContent('Bitcoin Address QR copied to clipboard')
    })
  })

  it('uses custom test ids when provided', () => {
    render(
      <QRCode 
        value={testValue} 
        label="Bitcoin QR" 
        description="Test description"
        data-testid="custom-test"
      />
    )
    
    expect(screen.getByTestId('custom-test')).toBeInTheDocument()
    expect(screen.getByTestId('custom-test-label')).toBeInTheDocument()
    expect(screen.getByTestId('custom-test-description')).toBeInTheDocument()
    expect(screen.getByTestId('custom-test-button')).toBeInTheDocument()
    expect(screen.getByTestId('custom-test-svg')).toBeInTheDocument()
    expect(screen.getByTestId('custom-test-status')).toBeInTheDocument()
  })

  it('uses default test ids when not provided', () => {
    render(<QRCode value={testValue} label="Bitcoin QR" />)
    
    expect(screen.getByTestId('qr-code')).toBeInTheDocument()
    expect(screen.getByTestId('qr-code-label')).toBeInTheDocument()
    expect(screen.getByTestId('qr-code-button')).toBeInTheDocument()
    expect(screen.getByTestId('qr-code-svg')).toBeInTheDocument()
    expect(screen.getByTestId('qr-code-status')).toBeInTheDocument()
  })

  it('supports different error correction levels', () => {
    render(<QRCode value={testValue} label="Bitcoin QR" level="H" />)
    
    const svg = screen.getByTestId('qr-code-svg')
    expect(svg).toBeInTheDocument()
    // The QRCodeSVG component should receive the level prop
  })

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' }
    render(
      <QRCode 
        value={testValue} 
        label="Bitcoin QR" 
        style={customStyle}
      />
    )
    
    const component = screen.getByTestId('qr-code')
    expect(component).toHaveStyle('background-color: red')
  })
})