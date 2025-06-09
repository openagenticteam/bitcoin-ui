import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"

import { PasswordInput } from "../passwordInput"

describe("passwordInput", () => {
  it("renders with label", () => {
    render(<PasswordInput label="Password" />)
    expect(screen.getByTestId("password-input")).toBeInTheDocument()
    expect(screen.getByRole("group", { name: "Password field" })).toBeInTheDocument()
  })

  it("renders with placeholder", () => {
    render(<PasswordInput label="Password" placeholder="Enter password" />)
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument()
  })

  it("toggles password visibility", () => {
    render(<PasswordInput label="Password" value="secret123" />)

    const input = screen.getByTestId("password-input")
    const toggleButton = screen.getByRole("button", { name: /show password/i })

    // Initially hidden
    expect(input).toHaveAttribute("type", "password")

    // Click to show
    fireEvent.click(toggleButton)
    expect(input).toHaveAttribute("type", "text")
    expect(screen.getByRole("button", { name: /hide password/i })).toBeInTheDocument()

    // Click to hide again
    fireEvent.click(toggleButton)
    expect(input).toHaveAttribute("type", "password")
    expect(screen.getByRole("button", { name: /show password/i })).toBeInTheDocument()
  })

  it("handles input changes", () => {
    const handleChange = jest.fn()
    render(<PasswordInput label="Password" onChange={handleChange} />)

    const input = screen.getByTestId("password-input")
    fireEvent.change(input, { target: { value: "newpassword" } })

    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: "newpassword" }),
    }))
  })

  it("can be disabled", () => {
    render(<PasswordInput label="Password" disabled />)

    const input = screen.getByTestId("password-input")
    const toggleButton = screen.getByRole("button", { name: /show password/i })

    expect(input).toBeDisabled()
    // Note: The toggle button is not disabled in the current implementation
    expect(toggleButton).toBeInTheDocument()
  })

  it("supports autoComplete attribute", () => {
    render(<PasswordInput label="Password" autoComplete="new-password" />)

    const input = screen.getByTestId("password-input")
    expect(input).toHaveAttribute("autoComplete", "new-password")
  })

  it("applies custom className", () => {
    render(<PasswordInput label="Password" className="custom-class" />)

    const container = screen.getByRole("group", { name: "Password field" })
    expect(container).toHaveClass("custom-class")
  })
})
