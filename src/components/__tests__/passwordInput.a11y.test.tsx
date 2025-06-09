import { cleanup, render } from "@testing-library/react"
import { axe, toHaveNoViolations } from "jest-axe"
import React from "react"

import { PasswordInput } from "../passwordInput"

expect.extend(toHaveNoViolations)

describe("passwordInput accessibility", () => {
  it("should have no a11y violations", async () => {
    const { container } = render(
      <div>
        <label htmlFor="test-password">Password</label>
        <PasswordInput id="test-password" label="Password" placeholder="Enter value" />
      </div>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
    cleanup()
  })
})
