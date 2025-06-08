import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordInput } from '../password-input'

describe('PasswordInput', () => {
  it('renders as password field by default', () => {
    render(<PasswordInput label="Password" />)
    
    const input = screen.getByLabelText(/password/i)
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'password')
  })

  it('toggles between password and text type', () => {
    render(<PasswordInput label="Password" />)
    
    const input = screen.getByLabelText(/password/i)
    const toggleButton = screen.getByRole('button', {
      name: /reveal password/i,
    })
    
    // Initially masked
    expect(input).toHaveAttribute('type', 'password')
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false')
    
    // Reveal
    fireEvent.click(toggleButton)
    expect(input).toHaveAttribute('type', 'text')
    expect(toggleButton).toHaveAttribute('aria-pressed', 'true')
    
    // Hide again
    const hideButton = screen.getByRole('button', {
      name: /hide password/i,
    })
    fireEvent.click(hideButton)
    expect(input).toHaveAttribute('type', 'password')
    expect(hideButton).toHaveAttribute('aria-pressed', 'false')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<PasswordInput ref={ref} label="Password" />)
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current).toHaveAttribute('type', 'password')
  })

  it('supports controlled usage', () => {
    const mockOnChange = jest.fn()
    render(
      <PasswordInput 
        value="test123" 
        onChange={mockOnChange}
        label="Password"
      />
    )
    
    const input = screen.getByDisplayValue('test123')
    fireEvent.change(input, { target: { value: 'newpassword' } })
    expect(mockOnChange).toHaveBeenCalled()
    
    // Check that the onChange receives the correct event
    const lastCall = mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1]
    expect(lastCall[0].target.value).toBe('newpassword')
  })

  it('supports uncontrolled usage', () => {
    render(<PasswordInput defaultValue="defaultpass" label="Password" />)
    
    const input = screen.getByDisplayValue('defaultpass')
    expect(input).toBeInTheDocument()
  })

  it('passes through standard input props', () => {
    render(
      <PasswordInput 
        label="Password"
        placeholder="Enter your password"
        autoComplete="current-password"
        required
        disabled
        name="password"
        id="custom-password-id"
      />
    )
    
    const input = screen.getByLabelText(/password/i)
    expect(input).toHaveAttribute('placeholder', 'Enter your password')
    expect(input).toHaveAttribute('autocomplete', 'current-password')
    expect(input).toBeRequired()
    expect(input).toBeDisabled()
    expect(input).toHaveAttribute('name', 'password')
    expect(input).toHaveAttribute('id', 'custom-password-id')
  })

  it('applies custom className to wrapper', () => {
    const { container } = render(
      <PasswordInput 
        label="Password" 
        className="custom-password-class"
      />
    )
    
    expect(container.firstChild).toHaveClass('custom-password-class')
    expect(container.firstChild).toHaveClass('password-input')
  })

  it('applies custom style to wrapper', () => {
    const customStyle = { backgroundColor: 'red' }
    const { container } = render(
      <PasswordInput 
        label="Password" 
        style={customStyle}
      />
    )
    
    expect(container.firstChild).toHaveStyle('background-color: red')
  })

  it('toggle button has correct aria-pressed state', () => {
    render(<PasswordInput label="Password" />)
    
    const toggleButton = screen.getByRole('button', {
      name: /reveal password/i,
    })
    
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false')
    
    fireEvent.click(toggleButton)
    
    const hideButton = screen.getByRole('button', {
      name: /hide password/i,
    })
    expect(hideButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('handles focus properly', async () => {
    const user = userEvent.setup()
    render(<PasswordInput label="Password" />)
    
    const input = screen.getByLabelText(/password/i)
    await user.click(input)
    expect(input).toHaveFocus()
  })

  it('supports autoFocus prop', () => {
    render(<PasswordInput label="Password" autoFocus />)
    
    const input = screen.getByLabelText(/password/i)
    expect(input).toHaveFocus()
  })

  it('handles onChange events', () => {
    const mockOnChange = jest.fn()
    render(<PasswordInput label="Password" onChange={mockOnChange} />)
    
    const input = screen.getByLabelText(/password/i)
    fireEvent.change(input, { target: { value: 'test' } })
    
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: 'test' })
      })
    )
  })

  it('handles other input events', () => {
    const mockOnFocus = jest.fn()
    const mockOnBlur = jest.fn()
    const mockOnKeyDown = jest.fn()
    
    render(
      <PasswordInput 
        label="Password" 
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
        onKeyDown={mockOnKeyDown}
      />
    )
    
    const input = screen.getByLabelText(/password/i)
    
    fireEvent.focus(input)
    expect(mockOnFocus).toHaveBeenCalled()
    
    fireEvent.blur(input)
    expect(mockOnBlur).toHaveBeenCalled()
    
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(mockOnKeyDown).toHaveBeenCalled()
  })

  it('sets correct data attributes', () => {
    render(
      <PasswordInput 
        label="Password" 
        data-testid="custom-password"
      />
    )
    
    const wrapper = screen.getByTestId('custom-password-wrapper')
    const input = screen.getByTestId('custom-password')
    
    expect(wrapper).toHaveAttribute('data-revealed', 'false')
    expect(input).toHaveAttribute('data-revealed', 'false')
    
    // Toggle and check again
    fireEvent.click(screen.getByRole('button', { name: /reveal password/i }))
    expect(wrapper).toHaveAttribute('data-revealed', 'true')
    expect(input).toHaveAttribute('data-revealed', 'true')
  })

  it('provides proper accessibility attributes', () => {
    render(<PasswordInput label="Password" />)
    
    const input = screen.getByLabelText(/password/i)
    const toggleButton = screen.getByRole('button', { name: /reveal password/i })
    
    expect(input).toHaveAttribute('aria-describedby')
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false')
    expect(toggleButton).toHaveAttribute('aria-describedby')
    expect(toggleButton).toHaveAttribute('tabindex', '-1')
  })

  it('announces state changes to screen readers', () => {
    render(<PasswordInput label="Password" />)
    
    const statusElement = screen.getByTestId('password-input-status')
    expect(statusElement).toHaveAttribute('aria-live', 'polite')
    expect(statusElement).toHaveTextContent('Password is now hidden')
    
    // Toggle and check announcement
    fireEvent.click(screen.getByRole('button', { name: /reveal password/i }))
    expect(statusElement).toHaveTextContent('Password is now visible')
  })

  it('uses custom test ids when provided', () => {
    render(
      <PasswordInput 
        label="Password" 
        data-testid="custom-test"
      />
    )
    
    expect(screen.getByTestId('custom-test-wrapper')).toBeInTheDocument()
    expect(screen.getByTestId('custom-test')).toBeInTheDocument()
    expect(screen.getByTestId('custom-test-toggle')).toBeInTheDocument()
    expect(screen.getByTestId('custom-test-icon')).toBeInTheDocument()
    expect(screen.getByTestId('custom-test-status')).toBeInTheDocument()
  })

  it('uses default test ids when not provided', () => {
    render(<PasswordInput label="Password" />)
    
    expect(screen.getByTestId('password-input-wrapper')).toBeInTheDocument()
    expect(screen.getByTestId('password-input')).toBeInTheDocument()
    expect(screen.getByTestId('password-input-toggle')).toBeInTheDocument()
    expect(screen.getByTestId('password-input-icon')).toBeInTheDocument()
    expect(screen.getByTestId('password-input-status')).toBeInTheDocument()
  })

  it('works without label', () => {
    render(<PasswordInput placeholder="Enter password" />)
    
    const input = screen.getByPlaceholderText('Enter password')
    const toggleButton = screen.getByRole('button', { name: /reveal password/i })
    
    expect(input).toBeInTheDocument()
    expect(toggleButton).toBeInTheDocument()
  })

  it('maintains focus on input when toggling', () => {
    render(<PasswordInput label="Password" />)
    
    const input = screen.getByLabelText(/password/i)
    const toggleButton = screen.getByRole('button', { name: /reveal password/i })
    
    input.focus()
    expect(input).toHaveFocus()
    
    fireEvent.click(toggleButton)
    expect(input).toHaveFocus() // Focus should remain on input
  })

  it('handles disabled state correctly', () => {
    render(<PasswordInput label="Password" disabled />)
    
    const input = screen.getByLabelText(/password/i)
    const toggleButton = screen.getByRole('button', { name: /reveal password/i })
    
    expect(input).toBeDisabled()
    
    // Toggle button should still work even when input is disabled
    fireEvent.click(toggleButton)
    expect(input).toHaveAttribute('type', 'text')
  })
})