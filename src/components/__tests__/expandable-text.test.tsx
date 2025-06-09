import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"

import { ExpandableText } from "../expandableText"

beforeAll(() => {
  Object.assign(navigator, {
    clipboard: {
      writeText: jest.fn().mockResolvedValue(undefined),
    },
  })
})

describe("expandableText", () => {
  const text = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"

  it("renders truncated text by default", () => {
    render(
      <ExpandableText text={text} label="Bitcoin Address" type="address" />,
    )
    expect(screen.getByText(/View full address/i)).toBeInTheDocument()
    // The component renders truncated text as "bc1qxy...hx0wlh" (single string)
    expect(screen.getByText("bc1qxy...hx0wlh")).toBeInTheDocument()
  })

  it("expands and collapses text", () => {
    render(
      <ExpandableText text={text} label="Bitcoin Address" type="address" />,
    )
    const button = screen.getByRole("button", { name: /view full address/i })
    fireEvent.click(button)
    expect(button).toHaveTextContent(/hide full address/i)
    fireEvent.click(button)
    expect(button).toHaveTextContent(/view full address/i)
  })

  it("shows copy functionality", async () => {
    render(
      <ExpandableText text={text} label="Bitcoin Address" type="address" />,
    )
    const copyButton = screen.getByLabelText(/copy bitcoin address/i)

    // Copy button should be present
    expect(copyButton).toBeInTheDocument()

    fireEvent.click(copyButton)

    // Verify the copy functionality worked
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text)
  })
})
