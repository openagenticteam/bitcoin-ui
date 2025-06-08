import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Secret } from '../secret'

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
})

describe('Secret accessibility', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <Secret
        secret="correct horse battery staple"
        label="Secret Phrase"
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations when revealed', async () => {
    const { container } = render(
      <Secret
        secret="correct horse battery staple"
        label="Secret Phrase"
      />
    )
    
    // Reveal the secret first
    const revealButton = container.querySelector('[aria-label*="Reveal"]')
    revealButton?.click()
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations without copy button', async () => {
    const { container } = render(
      <Secret
        secret="correct horse battery staple"
        label="Secret Phrase"
        showCopyButton={false}
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations with custom mask', async () => {
    const { container } = render(
      <Secret
        secret="correct horse battery staple"
        label="Secret Phrase"
        maskCharacter="*"
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations without label', async () => {
    const { container } = render(
      <Secret
        secret="correct horse battery staple"
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations with custom styling', async () => {
    const { container } = render(
      <Secret
        secret="correct horse battery staple"
        label="Secret Phrase"
        className="custom-secret"
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
        <Secret
          secret="first secret"
          label="First Secret"
        />
        <Secret
          secret="second secret"
          label="Second Secret"
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
          <legend>Secret Management</legend>
          <label htmlFor="secret-name">Secret Name:</label>
          <input id="secret-name" type="text" />
          <Secret
            secret="correct horse battery staple"
            label="Secret Phrase"
          />
        </fieldset>
      </form>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should handle keyboard navigation properly', async () => {
    const { container } = render(
      <Secret
        secret="correct horse battery staple"
        label="Secret Phrase"
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

  it('should have no a11y violations when showing feedback', async () => {
    const { container } = render(
      <Secret
        secret="correct horse battery staple"
        label="Secret Phrase"
      />
    )
    
    // Trigger copy action
    const copyButton = container.querySelector('[aria-label*="Copy"]')
    copyButton?.click()
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})