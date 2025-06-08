import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { CurrencyInput } from '../currency-input'

describe('CurrencyInput accessibility', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <CurrencyInput
        label="Amount"
        placeholder="Enter amount"
        currency="BTC"
        locale="US"
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations with different currencies', async () => {
    const { container } = render(
      <CurrencyInput
        label="Price"
        currency="EUR"
        locale="EU"
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations with USD currency', async () => {
    const { container } = render(
      <CurrencyInput
        label="Amount in USD"
        currency="USD"
        locale="US"
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations without label', async () => {
    const { container } = render(
      <CurrencyInput
        currency="BTC"
        locale="US"
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations with controlled value', async () => {
    const { container } = render(
      <CurrencyInput
        label="Controlled amount"
        currency="USD"
        value="100"
        onChange={() => {}}
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations with custom styling', async () => {
    const { container } = render(
      <CurrencyInput
        label="Styled input"
        currency="EUR"
        className="custom-currency-input"
        style={{ border: '1px solid #ccc' }}
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should maintain focus management', async () => {
    const { container } = render(
      <div>
        <CurrencyInput label="First input" currency="USD" />
        <CurrencyInput label="Second input" currency="BTC" />
      </div>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should handle complex scenarios', async () => {
    const { container } = render(
      <form>
        <fieldset>
          <legend>Payment Information</legend>
          <CurrencyInput
            label="Amount"
            currency="USD"
            locale="US"
            required
            aria-describedby="amount-help"
          />
          <div id="amount-help">Enter the payment amount in USD</div>
        </fieldset>
      </form>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})