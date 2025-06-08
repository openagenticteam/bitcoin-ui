import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { QRCode } from '../qr-code'

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
})

describe('QRCode accessibility', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <QRCode
        value="bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        label="Bitcoin Address QR"
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations with description', async () => {
    const { container } = render(
      <QRCode
        value="bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        label="Bitcoin Address QR"
        description="Scan this QR code to get the Bitcoin address"
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations with custom size', async () => {
    const { container } = render(
      <QRCode
        value="bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        label="Bitcoin Address QR"
        size={400}
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations with different error correction levels', async () => {
    const { container } = render(
      <QRCode
        value="bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        label="Bitcoin Address QR"
        level="H"
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations with custom styling', async () => {
    const { container } = render(
      <QRCode
        value="bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        label="Bitcoin Address QR"
        className="custom-qr-code"
        style={{ border: '1px solid #ccc', padding: '16px' }}
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should maintain focus management', async () => {
    const { container } = render(
      <div>
        <QRCode
          value="bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
          label="First QR Code"
        />
        <QRCode
          value="bitcoin:bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4"
          label="Second QR Code"
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
          <legend>Bitcoin Payment Information</legend>
          <label htmlFor="address-input">Address:</label>
          <input id="address-input" type="text" />
          <QRCode
            value="bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
            label="Bitcoin Address QR"
            description="Scan to get the Bitcoin address"
          />
        </fieldset>
      </form>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should handle keyboard navigation properly', async () => {
    const { container } = render(
      <QRCode
        value="bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        label="Bitcoin Address QR"
      />
    )
    
    // Test that button is focusable and has proper role
    const button = container.querySelector('button')
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAttribute('aria-label')
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have no a11y violations when showing feedback', async () => {
    const { container } = render(
      <QRCode
        value="bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        label="Bitcoin Address QR"
      />
    )
    
    // Trigger copy action
    const button = container.querySelector('button')
    button?.click()
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})