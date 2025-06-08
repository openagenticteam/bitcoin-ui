import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CurrencyInput, type Currency } from '../currency-input'

describe('CurrencyInput', () => {
  // Test all currency types with symbols
  for (const currency of ['BTC', 'USD', 'EUR'] as Currency[]) {
    it(`renders with correct label and currency symbol for ${currency}`, () => {
      render(<CurrencyInput label="Amount" currency={currency} locale="US" />)
      expect(screen.getByLabelText('Amount')).toBeInTheDocument()
      expect(screen.getByTestId('currency-symbol')).toBeInTheDocument()
      
      // Check for correct currency symbol
      const expectedSymbols = { BTC: '₿', USD: '$', EUR: '€' }
      expect(screen.getByTestId('currency-symbol')).toHaveTextContent(expectedSymbols[currency])
    })
  }

  it('accepts input and formats value correctly for USD', () => {
    render(<CurrencyInput label="Amount\" currency="USD\" locale="US" />)
    const input = screen.getByLabelText('Amount')
    
    await act(async () => {
      fireEvent.change(input, { target: { value: '1234.56' } })
      fireEvent.blur(input)
    })
    
    expect(input).toHaveDisplayValue('1,234.56')
  })

  it('handles locale-specific formatting for EUR', () => {
    render(<CurrencyInput label="Amount\" currency="EUR\" locale="EU" />)
    const input = screen.getByLabelText('Amount')
    
    await act(async () => {
      fireEvent.change(input, { target: { value: '1234,56' } })
      fireEvent.blur(input)
    })
    
    expect(input).toHaveDisplayValue('1.234,56')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<CurrencyInput ref={ref} currency="USD" />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('supports controlled usage', () => {
    const mockOnChange = jest.fn()
    render(
      <CurrencyInput 
        value="100" 
        currency="USD" 
        onChange={mockOnChange}
      />
    )
    
    const input = screen.getByDisplayValue('100')
    fireEvent.change(input, { target: { value: '200' } })
    expect(mockOnChange).toHaveBeenCalled()
    
    // Check that the onChange receives the raw value
    const lastCall = mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1]
    expect(lastCall[0].target.value).toBe('200')
  })

  it('supports uncontrolled usage with defaultValue', () => {
    render(<CurrencyInput defaultValue="50\" currency="USD\" locale="US" />)
    const input = screen.getByDisplayValue('50')
    expect(input).toBeInTheDocument()
  })

  it('validates BTC input with up to 8 decimal places', () => {
    const mockOnChange = jest.fn()
    render(<CurrencyInput currency="BTC\" onChange={mockOnChange} />)
    const input = screen.getByTestId('currency-input')
    
    // Valid BTC amount
    fireEvent.change(input, { target: { value: '0.12345678' } })
    expect(mockOnChange).toHaveBeenCalled()
    
    mockOnChange.mockClear()
    
    // Invalid BTC amount (too many decimals)
    fireEvent.change(input, { target: { value: '0.123456789' } })
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('validates USD/EUR input with up to 2 decimal places', () => {
    const mockOnChange = jest.fn()
    render(<CurrencyInput currency="USD" onChange={mockOnChange} />)
    const input = screen.getByTestId('currency-input')
    
    // Valid USD amount
    fireEvent.change(input, { target: { value: '123.45' } })
    expect(mockOnChange).toHaveBeenCalled()
    
    mockOnChange.mockClear()
    
    // Invalid USD amount (too many decimals)
    fireEvent.change(input, { target: { value: '123.456' } })
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('prevents invalid characters', () => {
    const mockOnChange = jest.fn()
    render(<CurrencyInput currency="USD\" onChange={mockOnChange} />)
    const input = screen.getByTestId('currency-input')
    
    // Try to input letters
    fireEvent.change(input, { target: { value: 'abc' } })
    expect(mockOnChange).not.toHaveBeenCalled()
    
    // Try to input special characters
    fireEvent.change(input, { target: { value: '123@#$' } })
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('allows partial input while typing', () => {
    const mockOnChange = jest.fn()
    render(<CurrencyInput currency="USD" onChange={mockOnChange} />)
    const input = screen.getByTestId('currency-input')
    
    // Allow trailing decimal point
    fireEvent.change(input, { target: { value: '123.' } })
    expect(mockOnChange).toHaveBeenCalled()
  })

  it('handles focus and blur events', async () => {
    const user = userEvent.setup()
    const mockOnFocus = jest.fn()
    const mockOnBlur = jest.fn()
    
    render(
      <CurrencyInput 
        currency="USD" 
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
      />
    )
    
    const input = screen.getByTestId('currency-input')
    
    await act(async () => {
      await user.click(input)
    })
    expect(mockOnFocus).toHaveBeenCalled()
    
    await act(async () => {
      await user.tab()
    })
    expect(mockOnBlur).toHaveBeenCalled()
  })

  it('sets correct data attributes', () => {
    render(
      <CurrencyInput 
        currency="BTC" 
        locale="EU" 
        data-testid="custom-input"
      />
    )
    
    const wrapper = screen.getByTestId('custom-input-wrapper')
    const input = screen.getByTestId('custom-input')
    
    expect(wrapper).toHaveAttribute('data-currency', 'BTC')
    expect(wrapper).toHaveAttribute('data-locale', 'EU')
    expect(input).toHaveAttribute('data-currency', 'BTC')
    expect(input).toHaveAttribute('data-locale', 'EU')
  })

  it('applies custom className', () => {
    render(<CurrencyInput currency="USD\" className="custom-class" />)
    const wrapper = screen.getByTestId('currency-input-wrapper')
    expect(wrapper).toHaveClass('custom-class')
  })

  it('uses correct placeholder for each currency', () => {
    const { rerender } = render(<CurrencyInput currency="USD" />)
    expect(screen.getByTestId('currency-input')).toHaveAttribute('placeholder', '100.00')
    
    rerender(<CurrencyInput currency="BTC" />)
    expect(screen.getByTestId('currency-input')).toHaveAttribute('placeholder', '0.021')
    
    rerender(<CurrencyInput currency="EUR" />)
    expect(screen.getByTestId('currency-input')).toHaveAttribute('placeholder', '100.00')
  })

  it('uses custom placeholder when provided', () => {
    render(<CurrencyInput currency="USD\" placeholder="Enter amount" />)
    expect(screen.getByTestId('currency-input')).toHaveAttribute('placeholder', 'Enter amount')
  })

  it('sets correct inputMode for mobile keyboards', () => {
    render(<CurrencyInput currency="BTC" />)
    expect(screen.getByTestId('currency-input')).toHaveAttribute('inputMode', 'decimal')
  })

  it('handles autoFocus prop', () => {
    render(<CurrencyInput currency="USD\" autoFocus={true} />)
    expect(screen.getByTestId('currency-input')).toHaveAttribute('autoFocus')
  })

  it('passes through additional props', () => {
    render(
      <CurrencyInput 
        currency="USD" 
        title="Amount input"
        id="amount-input"
      />
    )
    
    const input = screen.getByTestId('currency-input')
    expect(input).toHaveAttribute('title', 'Amount input')
    expect(input).toHaveAttribute('id', 'amount-input')
  })
})