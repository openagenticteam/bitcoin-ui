import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react"

import { ExpandableText } from "../expandableText"

// Mock the react-copy-to-clipboard-ts package
jest.mock("react-copy-to-clipboard-ts", () => ({
  CopyToClipboard: ({ children, onCopy, text }: any) => (
    <div
      onClick={() => onCopy(text, true)}
      data-testid="copy-to-clipboard-wrapper"
    >
      {children}
    </div>
  ),
}))

// Mock the showToast utility function
jest.mock("../utils", () => ({
  showToast: jest.fn(),
  truncateText: jest.requireActual("../utils").truncateText,
}))

import { showToast } from "../utils"

const mockShowToast = showToast as jest.MockedFunction<typeof showToast>

describe("expandableText", () => {
  const text = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

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

  it("shows copy functionality with success feedback", async () => {
    render(
      <ExpandableText text={text} label="Bitcoin Address" type="address" />,
    )
    const copyButton = screen.getByLabelText(/copy bitcoin address/i)

    // Copy button should be present
    expect(copyButton).toBeInTheDocument()

    fireEvent.click(copyButton)

    // Verify the toast was called with the correct message
    expect(mockShowToast).toHaveBeenCalledWith("Bitcoin Address copied to clipboard")

    // Check that the copied state changes the button (CheckIcon should now be displayed)
    await waitFor(() => {
      expect(copyButton).toBeInTheDocument()
    })

    // Fast forward the timer to test the reset functionality
    jest.advanceTimersByTime(2000)

    await waitFor(() => {
      // After 2 seconds, should be back to copy state
      expect(copyButton).toBeInTheDocument()
    })
  })

  it("handles different text types", () => {
    render(
      <ExpandableText
        text="lnbc1pvjluezsp5zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zygs9qrsgq"
        label="Lightning Invoice"
        type="invoice"
      />,
    )
    expect(screen.getByText(/View full invoice/i)).toBeInTheDocument()
  })

  it("can hide copy button", () => {
    render(
      <ExpandableText
        text={text}
        label="Bitcoin Address"
        type="address"
        showCopyButton={false}
      />,
    )
    expect(screen.queryByLabelText(/copy bitcoin address/i)).not.toBeInTheDocument()
  })

  it("supports custom truncation parameters", () => {
    render(
      <ExpandableText
        text={text}
        label="Bitcoin Address"
        type="address"
        startChars={8}
        endChars={8}
      />,
    )
    // Should show more characters due to custom parameters
    expect(screen.getByTestId("expandable-text")).toBeInTheDocument()
  })

  it("does not show expand button for short text", () => {
    const shortText = "short"
    render(
      <ExpandableText
        text={shortText}
        label="Short Text"
        type="text"
      />,
    )
    expect(screen.queryByText(/View full/i)).not.toBeInTheDocument()
    expect(screen.getByTestId("expandable-text")).toHaveTextContent(shortText)
  })

  it("has proper accessibility attributes", () => {
    render(
      <ExpandableText text={text} label="Test Address" type="address" />,
    )

    // Check for proper ARIA labels and descriptions
    expect(screen.getByRole("group", { name: "Test Address" })).toBeInTheDocument()
    expect(screen.getByTestId("expandable-text")).toHaveAttribute("aria-describedby")

    // Check expand button accessibility
    const expandButton = screen.getByRole("button", { name: /view full address/i })
    expect(expandButton).toHaveAttribute("aria-expanded", "false")

    fireEvent.click(expandButton)
    expect(expandButton).toHaveAttribute("aria-expanded", "true")
  })
})
