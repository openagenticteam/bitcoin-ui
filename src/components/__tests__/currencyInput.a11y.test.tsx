import { cleanup, render } from "@testing-library/react"
import { axe, toHaveNoViolations } from "jest-axe"
import React from "react"

import { CurrencyInput } from "../currencyInput"

expect.extend(toHaveNoViolations)

describe("currencyInput accessibility", () => {
  it("should have no a11y violations", async () => {
    const { container } = render(
      <CurrencyInput
        label="Label"
        placeholder="Enter value"
        currency="BTC"
        locale="US"
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
    cleanup()
  })
})
