import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../button'

describe('Button', () => {
  it('renders with correct label and attributes', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Button</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('applies correct variant classes', () => {
    render(<Button variant="secondary">Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn--secondary')
  })

  it('applies correct size classes', () => {
    render(<Button size="lg">Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn--lg')
  })

  it('applies full width class when fullWidth is true', () => {
    render(<Button fullWidth>Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn--full-width')
  })

  it('handles disabled state', () => {
    const handleClick = jest.fn()
    render(
      <Button disabled onClick={handleClick}>
        Button
      </Button>
    )
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-disabled', 'true')
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('handles loading state', () => {
    const handleClick = jest.fn()
    render(
      <Button loading onClick={handleClick}>
        Button
      </Button>
    )
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('btn--loading')
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument()
    expect(button).toHaveTextContent('Loading...')
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('uses custom loading text', () => {
    render(
      <Button loading loadingText="Please wait...">
        Button
      </Button>
    )
    expect(screen.getByRole('button')).toHaveTextContent('Please wait...')
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Please wait...')
  })

  it('renders start icon when provided', () => {
    render(
      <Button startIcon={<span data-testid="start-icon">→</span>}>
        Button
      </Button>
    )
    expect(screen.getByTestId('start-icon')).toBeInTheDocument()
  })

  it('renders end icon when provided', () => {
    render(
      <Button endIcon={<span data-testid="end-icon">←</span>}>
        Button
      </Button>
    )
    expect(screen.getByTestId('end-icon')).toBeInTheDocument()
  })

  it('hides icons when loading', () => {
    render(
      <Button
        loading
        startIcon={<span data-testid="start-icon">→</span>}
        endIcon={<span data-testid="end-icon">←</span>}
      >
        Button
      </Button>
    )
    expect(screen.queryByTestId('start-icon')).not.toBeInTheDocument()
    expect(screen.queryByTestId('end-icon')).not.toBeInTheDocument()
  })

  it('handles keyboard navigation with Enter key', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Button</Button>)
    
    const button = screen.getByRole('button')
    button.focus()
    await user.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('handles keyboard navigation with Space key', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Button</Button>)
    
    const button = screen.getByRole('button')
    button.focus()
    await user.keyboard(' ')
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('prevents keyboard events when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    render(
      <Button disabled onClick={handleClick}>
        Button
      </Button>
    )
    
    const button = screen.getByRole('button')
    button.focus()
    await user.keyboard('{Enter}')
    await user.keyboard(' ')
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('sets correct data attributes', () => {
    render(
      <Button variant="primary" size="md" loading fullWidth>
        Button
      </Button>
    )
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-variant', 'primary')
    expect(button).toHaveAttribute('data-size', 'md')
    expect(button).toHaveAttribute('data-loading', 'true')
    expect(button).toHaveAttribute('data-full-width', 'true')
  })

  it('uses custom test id when provided', () => {
    render(<Button data-testid="custom-button">Button</Button>)
    expect(screen.getByTestId('custom-button')).toBeInTheDocument()
  })

  it('uses default test id when not provided', () => {
    render(<Button>Button</Button>)
    expect(screen.getByTestId('button')).toBeInTheDocument()
  })

  it('passes through additional props', () => {
    render(
      <Button title="Tooltip text" id="custom-id">
        Button
      </Button>
    )
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('title', 'Tooltip text')
    expect(button).toHaveAttribute('id', 'custom-id')
  })
})