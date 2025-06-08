import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { PasswordInput } from '../password-input'

describe('PasswordInput accessibility', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations when revealed', async () => {
    const { container } = render(
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
      />
    )
    
    // Reveal the password first
    const revealButton = container.querySelector('[aria-label*="Reveal"]')
    revealButton?.click()
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations with value', async () => {
    const { container } = render(
      <PasswordInput
        label="Password"
        value="testpassword"
        onChange={() => {}}
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations when required', async () => {
    const { container } = render(
      <PasswordInput
        label="Password"
        required
        aria-describedby="password-help"
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations when disabled', async () => {
    const { container } = render(
      <PasswordInput
        label="Password"
        disabled
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })

  it('should have no a11y violations with custom styling', async () => {
    const { container } = render(
      <PasswordInput
        label="Password"
        className="custom-password-input"
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
        <PasswordInput label="Password" />
        <PasswordInput label="Confirm Password" />
      </div>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should handle complex scenarios with form context', async () => {
    const { container } = render(
      <form>
        <fieldset>
          <legend>Login Information</legend>
          <label htmlFor="username-input">Username:</label>
          <input id="username-input" type="text" />
          <PasswordInput
            label="Password"
            required
            aria-describedby="password-help"
          />
          <div id="password-help">Password must be at least 8 characters</div>
        </fieldset>
      </form>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should handle keyboard navigation properly', async () => {
    const { container } = render(
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
      />
    )
    
    // Test that button has proper attributes for keyboard navigation
    const button = container.querySelector('button')
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAttribute('aria-label')
    expect(button).toHaveAttribute('tabindex', '-1') // Should not be in tab order
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have no a11y violations without label', async () => {
    const { container } = render(
      <PasswordInput
        placeholder="Enter your password"
        aria-label="Password input"
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
  })
})