import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { ExpandableText } from '../expandable-text'

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
})

describe('ExpandableText accessibility', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <ExpandableText
        text="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        label="Bitcoin Address"
        type="address"
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations when expanded', async () => {
    const { container } = render(
      <ExpandableText
        text="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        label="Bitcoin Address"
        type="address"
      />
    )
    
    // Expand the text first
    const expandButton = container.querySelector('[aria-label*="View full"]')
    expandButton?.click()
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations without copy button', async () => {
    const { container } = render(
      <ExpandableText
        text="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        label="Bitcoin Address"
        type="address"
        showCopyButton={false}
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations with different text types', async () => {
    const { container } = render(
      <ExpandableText
        text="lnbc1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdpl2pkx2ctnv5sxxmmwwd5kgetjypeh2ursdae8g6twvus8g6rfwvs8qun0dfjkxaq8rkx3yf5tcsyz3d73gafnh3cax9rn449d9p5uxz9ezhhypd0elx87sjle52x86fux2ypatgddc6k63n7erqz25le42c4u4ecky03ylcqca784w"
        label="Lightning Invoice"
        type="invoice"
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations with short text', async () => {
    const { container } = render(
      <ExpandableText
        text="Short text"
        label="Short Content"
        type="text"
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations with custom styling', async () => {
    const { container } = render(
      <ExpandableText
        text="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        label="Styled Address"
        type="address"
        className="custom-expandable-text"
        style={{ border: '1px solid #ccc', padding: '8px' }}
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should maintain focus management', async () => {
    const { container } = render(
      <div>
        <ExpandableText
          text="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
          label="First Address"
          type="address"
        />
        <ExpandableText
          text="bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4"
          label="Second Address"
          type="address"
        />
      </div>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should handle complex scenarios with form context', async () => {
    const { container } = render(
      <form>
        <fieldset>
          <legend>Bitcoin Transaction Details</legend>
          <label htmlFor="address-input">Address:</label>
          <ExpandableText
            text="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
            label="Bitcoin Address"
            type="address"
          />
          <label htmlFor="amount-input">Amount:</label>
          <input id="amount-input" type="text" />
        </fieldset>
      </form>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should handle keyboard navigation properly', async () => {
    const { container } = render(
      <ExpandableText
        text="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        label="Bitcoin Address"
        type="address"
      />
    )
    
    // Test that buttons are focusable and have proper roles
    const buttons = container.querySelectorAll('button')
    expect(buttons).toHaveLength(2) // toggle and copy buttons
    
    buttons.forEach(button => {
      expect(button).toHaveAttribute('type', 'button')
      expect(button).toHaveAttribute('aria-label')
    })
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})