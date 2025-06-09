import { cleanup, render } from "@testing-library/react"
import { axe, toHaveNoViolations } from "jest-axe"
import React from "react"

import { ExpandableText } from "../expandableText"

expect.extend(toHaveNoViolations)

describe("expandableText accessibility", () => {
  it("should have no a11y violations", async () => {
    const { container } = render(
      <ExpandableText
        text="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        label="Bitcoin Address"
        type="address"
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
    cleanup()
  })
})
