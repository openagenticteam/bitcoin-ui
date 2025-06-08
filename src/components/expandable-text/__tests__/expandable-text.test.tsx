import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ExpandableText } from '../expandable-text'

// Mock clipboard API
const mockWriteText = jest.fn()
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
})

describe('ExpandableText', () => {
  const longText = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
  const shortText = 'short'
  
  beforeEach(() => {
    mockWriteText.mockClear()
    mockWriteText.mockResolvedValue(undefined)
  })

  it('renders truncated text by default for long text', () => {
    render(
      <ExpandableText text={longText} label="Bitcoin Address" type="address" />
    )
    
    expect(screen.getByRole('button', { name: /view full address/i })).toBeInTheDocument()
    expect(screen.getByTestId('expandable-text-text')).toHaveTextContent('bc1qxy...fjhx0wlh')
  })

  it('does not truncate short text', () => {
    render(
      <ExpandableText text={shortText} label="Short Text" type="text" />
    )
    
    expect(screen.queryByRole('button', { name: /view full/i })).not.toBeInTheDocument()
    expect(screen.getByTestId('expandable-text-text')).toHaveTextContent(shortText)
  })

  it('expands and collapses text', () => {
    render(
      <ExpandableText text={longText} label="Bitcoin Address" type="address" />
    )
    
    const toggleButton = screen.getByRole('button', { name: /view full address/i })
    
    // Expand
    fireEvent.click(toggleButton)
    expect(screen.getByRole('button', { name: /hide full address/i })).toBeInTheDocument()
    expect(screen.getByTestId('expandable-text-text')).toHaveTextContent(longText)
    
    // Collapse
    fireEvent.click(screen.getByRole('button', { name: /hide full address/i }))
    expect(screen.getByRole('button', { name: /view full address/i })).toBeInTheDocument()
    expect(screen.getByTestId('expandable-text-text')).toHaveTextContent('bc1qxy...fjhx0wlh')
  })

  it('shows copy feedback when copy button is clicked', async () => {
    render(
      <ExpandableText text={longText} label="Bitcoin Address" type="address" />
    )
    
    const copyButton = screen.getByRole('button', { name: /copy bitcoin address/i })
    fireEvent.click(copyButton)

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith(longText)
    })

    await waitFor(() => {
      expect(copyButton).toHaveTextContent('Copied!')
    })
  })

  it('handles copy failure gracefully', async () => {
    mockWriteText.mockRejectedValue(new Error('Copy failed'))
    
    render(
      <ExpandableText text={longText} label="Bitcoin Address" type="address" />
    )
    
    const copyButton = screen.getByRole('button', { name: /copy bitcoin address/i })
    fireEvent.click(copyButton)

    await waitFor(() => {
      expect(copyButton).toHaveTextContent('Failed')
    })
  })

  it('can hide copy button when showCopyButton is false', () => {
    render(
      <ExpandableText 
        text={longText} 
        label="Bitcoin Address" 
        type="address" 
        showCopyButton={false}
      />
    )
    
    expect(screen.queryByRole('button', { name: /copy/i })).not.toBeInTheDocument()
  })

  it('handles different text types', () => {
    const { rerender } = render(
      <ExpandableText text={longText} label="Invoice" type="invoice" />
    )
    expect(screen.getByRole('button', { name: /view full invoice/i })).toBeInTheDocument()

    rerender(<ExpandableText text={longText} label="Text Content" type="text" />)
    expect(screen.getByRole('button', { name: /view full text/i })).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <ExpandableText 
        text={longText} 
        label="Address" 
        type="address"
        className="custom-class"
      />
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' }
    const { container } = render(
      <ExpandableText 
        text={longText} 
        label="Address" 
        type="address"
        style={customStyle}
      />
    )
    expect(container.firstChild).toHaveStyle('background-color: red')
  })

  it('sets correct data attributes', () => {
    render(
      <ExpandableText 
        text={longText} 
        label="Address" 
        type="address"
        data-testid="custom-expandable"
      />
    )
    
    const component = screen.getByTestId('custom-expandable')
    expect(component).toHaveAttribute('data-type', 'address')
    expect(component).toHaveAttribute('data-expanded', 'false')
    
    // Expand and check again
    fireEvent.click(screen.getByRole('button', { name: /view full address/i }))
    expect(component).toHaveAttribute('data-expanded', 'true')
  })

  it('provides proper accessibility attributes', () => {
    render(
      <ExpandableText text={longText} label="Bitcoin Address" type="address" />
    )
    
    const toggleButton = screen.getByRole('button', { name: /view full address/i })
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    
    const copyButton = screen.getByRole('button', { name: /copy bitcoin address/i })
    expect(copyButton).toHaveAttribute('aria-describedby')
    
    const component = screen.getByTestId('expandable-text')
    expect(component).toHaveAttribute('role', 'region')
    expect(component).toHaveAttribute('aria-labelledby')
  })

  it('announces state changes to screen readers', async () => {
    render(
      <ExpandableText text={longText} label="Bitcoin Address" type="address" />
    )
    
    const statusElement = screen.getByTestId('expandable-text-status')
    expect(statusElement).toHaveAttribute('aria-live', 'polite')
    
    // Test copy success announcement
    const copyButton = screen.getByRole('button', { name: /copy bitcoin address/i })
    fireEvent.click(copyButton)
    
    await waitFor(() => {
      expect(statusElement).toHaveTextContent('Bitcoin Address copied to clipboard')
    })
  })

  it('disables copy button while copying', async () => {
    // Make the promise not resolve immediately
    let resolvePromise: (value: unknown) => void
    const copyPromise = new Promise(resolve => {
      resolvePromise = resolve
    })
    mockWriteText.mockReturnValue(copyPromise)
    
    render(
      <ExpandableText text={longText} label="Bitcoin Address" type="address" />
    )
    
    const copyButton = screen.getByRole('button', { name: /copy bitcoin address/i })
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
      <ExpandableText 
        text={longText} 
        label="Address" 
        type="address"
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
    render(
      <ExpandableText text={longText} label="Address" type="address" />
    )
    
    expect(screen.getByTestId('expandable-text')).toBeInTheDocument()
    expect(screen.getByTestId('expandable-text-content')).toBeInTheDocument()
    expect(screen.getByTestId('expandable-text-text')).toBeInTheDocument()
    expect(screen.getByTestId('expandable-text-controls')).toBeInTheDocument()
    expect(screen.getByTestId('expandable-text-toggle')).toBeInTheDocument()
    expect(screen.getByTestId('expandable-text-copy')).toBeInTheDocument()
    expect(screen.getByTestId('expandable-text-status')).toBeInTheDocument()
  })
})