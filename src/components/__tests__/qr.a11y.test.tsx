import { cleanup, render } from "@testing-library/react"
import { axe, toHaveNoViolations } from "jest-axe"
import React from "react"

import { QRCode } from "../qr"

expect.extend(toHaveNoViolations)

describe("qrCode accessibility", () => {
  it("should have no a11y violations", async () => {
    const { container } = render(
      <QRCode
        value="bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        label="Bitcoin Address QR"
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    expect(results.incomplete).toHaveLength(0)
    cleanup()
  })
})
