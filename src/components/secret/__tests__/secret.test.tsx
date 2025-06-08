import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Secret } from '../secret'

// Mock clipboard API
const mockWriteText = jest.fn()
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
})

describe('Secret', () => {
  const secretText = 'correct horse battery staple'
  
  beforeEach(() => {
    mockWriteText.mockClear()
    mockWriteText.mockResolvedValue(undefined)
  })

  it('renders masked by default', () => {
    render(<Secret secret={secretText} label="Secret Phrase" />)
    
    const secretElement = screen.getByTestId('secret-text')
    expect(secretElement).toBeInTheDocument()
    expect(secretElement).toHaveTextContent('•••••••••••••••••••••')
  })

  it('reveals and hides the secret', () => {
    render(<Secret secret={secretText} label="Secret Phrase" />)
    
    const toggleButton = screen.getByRole('button', {
      name: /reveal secret phrase/i,
    })
    
    // Reveal
    fireEvent.click(toggleButton)
    expect(screen.getByTestId('secret-text')).toHaveTextContent(secretText)
    
    // Hide
    const hideButton = screen.getByRole('button', {
      name: /hide secret phrase/i,
    })
    fireEvent.click(hideButton)
    expect(screen.getByTestId('secret-text')).toHaveTextContent(
      '•••••••••••••••••••••'
    )
  })

  it('shows copy feedback when copy button is clicked', async () => {
    render(<Secret secret={secretText} label="Secret Phrase" />)
    
    const copyButton = screen.getByRole('button', { name: /copy secret phrase/i })
    fireEvent.click(copyButton)
    
    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith(secretText)
    })

    await waitFor(() => {
      expect(copyButton).toHaveTextContent('Copied!')
    })
  })

  it('uses custom mask character', () => {
    render(
      <Secret 
        secret={secretText} 
        label="Secret Phrase" 
        maskCharacter="*"
      />
    )
    
    expect(screen.getByTestId('secret-text')).toHaveTextContent(
      '*********************'
    )
  })

  it('can hide copy button when showCopyButton is false', () => {
    render(
      <Secret 
        secret={secretText} 
        label="Secret Phrase" 
        showCopyButton={false}
      />
    )
    
    expect(screen.queryByRole('button', { name: /copy/i })).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Secret 
        secret={secretText} 
        label="Secret Phrase" 
        className="custom-secret-class"
      />
    )
    
    expect(container.firstChild).toHaveClass('custom-secret-class')
  })

  it('handles empty secret gracefully', () => {
    render(<Secret secret="" label="Empty Secret" />)
    
    expect(screen.getByTestId('secret-text')).toBeInTheDocument()
    expect(screen.getByTestId('secret-text')).toHaveTextContent('')
  })

  it('toggle button has correct aria-pressed state', () => {
    render(<Secret secret={secretText} label="Secret Phrase" />)
    
    const toggleButton = screen.getByRole('button', {
      name: /reveal secret phrase/i,
    })
    
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false')
    
    fireEvent.click(toggleButton)
    
    const hideButton = screen.getByRole('button', {
      name: /hide secret phrase/i,
    })
    expect(hideButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('handles copy failure gracefully', async () => {
    mockWriteText.mockRejectedValue(new Error('Copy failed'))
    
    render(<Secret secret={secretText} label="Secret Phrase" />)
    
    const copyButton = screen.getByRole('button', { name: /copy secret phrase/i })
    fireEvent.click(copyButton)

    await waitFor(() => {
      expect(copyButton).toHaveTextContent('Failed')
    })
  })

  it('works without label', () => {
    render(<Secret secret={secretText} />)
    
    expect(screen.getByRole('button', { name: /reveal secret/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /copy secret/i })).toBeInTheDocument()
  })

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' }
    const { container } = render(
      <Secret 
        secret={secretText} 
        label="Secret Phrase" 
        style={customStyle}
      />
    )
    
    expect(container.firstChild).toHaveStyle('background-color: red')
  })

  it('sets correct data attributes', () => {
    render(
      <Secret 
        secret={secretText} 
        label="Secret Phrase" 
        data-testid="custom-secret"
      />
    )
    
    const component = screen.getByTestId('custom-secret')
    expect(component).toHaveAttribute('data-revealed', 'false')
    expect(component).toHaveAttribute('data-copy-status', 'idle')
    
    // Reveal and check again
    fireEvent.click(screen.getByRole('button', { name: /reveal secret phrase/i }))
    expect(component).toHaveAttribute('data-revealed', 'true')
  })

  it('provides proper accessibility attributes', () => {
    render(<Secret secret={secretText} label="Secret Phrase" />)
    
    const toggleButton = screen.getByRole('button', { name: /reveal secret phrase/i })
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false')
    expect(toggleButton).toHaveAttribute('aria-describedby')
    
    const copyButton = screen.getByRole('button', { name: /copy secret phrase/i })
    expect(copyButton).toHaveAttribute('aria-describedby')
    
    const component = screen.getByTestId('secret')
    expect(component).toHaveAttribute('role', 'group')
    expect(component).toHaveAttribute('aria-labelledby')
    expect(component).toHaveAttribute('aria-describedby')
  })

  it('announces state changes to screen readers', async () => {
    render(<Secret secret={secretText} label="Secret Phrase" />)
    
    const statusElement = screen.getByTestId('secret-status')
    expect(statusElement).toHaveAttribute('aria-live', 'polite')
    
    // Test copy success announcement
    const copyButton = screen.getByRole('button', { name: /copy secret phrase/i })
    fireEvent.click(copyButton)
    
    await waitFor(() => {
      expect(statusElement).toHaveTextContent('Secret Phrase copied to clipboard')
    })
  })

  it('disables copy button while copying', async () => {
    // Make the promise not resolve immediately
    let resolvePromise: (value: unknown) => void
    const copyPromise = new Promise(resolve => {
      resolvePromise = resolve
    })
    mockWriteText.mockReturnValue(copyPromise)
    
    render(<Secret secret={secretText} label="Secret Phrase" />)
    
    const copyButton = screen.getByRole('button', { name: /copy secret phrase/i })
    fireEvent.click(copyButton)
    
    expect(copyButton).toBeDisabled()
    expect(copyButton).toHaveTextContent('Copying...')
    
    // Resolve the promise
    resolvePromise!(undefined)
    
    await waitFor(() => {
      expect(copyButton).not.toBeDisabled()
    })
  })

  it('uses custom test ids when provided', () => {
    render(
      <Secret 
        secret={secretText} 
        label="Secret Phrase" 
        data-testid="custom-test"
      />
    )
    
    expect(screen.getByTestId('custom-test')).toBeInTheDocument()
    expect(screen.getByTestId('custom-test-content')).toBeInTheDocument()
    expect(screen.getByTestId('custom-test-text')).toBeInTheDocument()
    expect(screen.getByTestId('custom-test-controls')).toBeInTheDocument()
    expect(screen.getByTestId('custom-test-toggle')).toBeInTheDocument()
    expect(screen.getByTestId('custom-test-copy')).toBeInTheDocument()
    expect(screen.getByTestId('custom-test-status')).toBeInTheDocument()
  })

  it('uses default test ids when not provided', () => {
    render(<Secret secret={secretText} label="Secret Phrase" />)
    
    expect(screen.getByTestId('secret')).toBeInTheDocument()
    expect(screen.getByTestId('secret-content')).toBeInTheDocument()
    expect(screen.getByTestId('secret-text')).toBeInTheDocument()
    expect(screen.getByTestId('secret-controls')).toBeInTheDocument()
    expect(screen.getByTestId('secret-toggle')).toBeInTheDocument()
    expect(screen.getByTestId('secret-copy')).toBeInTheDocument()
    expect(screen.getByTestId('secret-status')).toBeInTheDocument()
  })

  it('resets copy state after timeout', async () => {
    jest.useFakeTimers()
    
    render(<Secret secret={secretText} label="Secret Phrase" />)
    
    const copyButton = screen.getByRole('button', { name: /copy secret phrase/i })
    fireEvent.click(copyButton)
    
    await waitFor(() => {
      expect(copyButton).toHaveTextContent('Copied!')
    })
    
    // Fast-forward time
    jest.advanceTimersByTime(2100)
    
    await waitFor(() => {
      expect(copyButton).toHaveTextContent('Copy')
    })
    
    jest.useRealTimers()
  })
})