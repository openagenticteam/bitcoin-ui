import type { Meta, StoryObj } from "@storybook/react"

import { PasswordInput } from "../components/passwordInput"

const meta: Meta<typeof PasswordInput> = {
  title: "Bitcoin UI/PasswordInput",
  component: PasswordInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Accessible password input with reveal/hide toggle functionality. Perfect for wallet passwords and sensitive inputs with beautiful default styling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Accessible label for the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    value: {
      control: "text",
      description: "Current value",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
  },
}

export const WalletPassword: Story = {
  args: {
    label: "Wallet Password",
    placeholder: "Enter your wallet password",
    autoComplete: "new-password",
  },
}

export const WithValue: Story = {
  args: {
    label: "Password",
    value: "mypassword123",
    placeholder: "Enter password",
  },
}

export const Disabled: Story = {
  args: {
    label: "Disabled Password",
    placeholder: "Cannot edit",
    disabled: true,
    value: "disabled",
  },
}

// Styled examples using className
export const StyledDefault: Story = {
  args: {
    label: "Styled Password",
    placeholder: "Enter password",
    className: "styled-password",
  },
}

export const StyledModern: Story = {
  args: {
    label: "Modern Style",
    placeholder: "Your secure password",
    className: "modern-password",
  },
}

export const StyledCompact: Story = {
  args: {
    label: "Compact Password",
    placeholder: "Password",
    className: "compact-password",
  },
}
