import { cleanup, render } from "@testing-library/react"
import { axe, toHaveNoViolations } from "jest-axe"
import React from "react"

import { Secret } from "../secret"

expect.extend(toHaveNoViolations)

describe("secret accessibility", () => {
  it("should have no a11y violations", async () => {
    const { container } = render(
      <Secret secret="correct horse battery staple" label="Secret Phrase" />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
    cleanup()
  })
})
