import type { Meta, StoryObj } from "@storybook/react"

import { CurrencyInput } from "../components/currencyInput"

const meta: Meta<typeof CurrencyInput> = {
  title: "Bitcoin UI/CurrencyInput",
  component: CurrencyInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Locale-aware currency input with real-time formatting and validation. Supports USD, EUR, and BTC with proper formatting for US and EU locales. Features beautiful default styling with Inter font.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currency: {
      control: "select",
      options: ["USD", "EUR", "BTC"],
      description: "Currency type",
    },
    locale: {
      control: "select",
      options: ["US", "EU"],
      description: "Locale for number formatting",
    },
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
    currency: "USD",
    locale: "US",
    label: "Amount",
    placeholder: "0.00",
  },
}

export const USD: Story = {
  args: {
    currency: "USD",
    locale: "US",
    label: "USD Amount",
    placeholder: "0.00",
  },
}

export const EUR: Story = {
  args: {
    currency: "EUR",
    locale: "EU",
    label: "EUR Amount",
    placeholder: "0,00",
  },
}

export const Bitcoin: Story = {
  args: {
    currency: "BTC",
    locale: "US",
    label: "Bitcoin Amount",
    placeholder: "0.00000000",
  },
}

export const WithValue: Story = {
  args: {
    currency: "USD",
    locale: "US",
    label: "USD Amount",
    value: "1234.56",
    placeholder: "0.00",
  },
}

export const EURWithValue: Story = {
  args: {
    currency: "EUR",
    locale: "EU",
    label: "EUR Amount",
    value: "1234,56",
    placeholder: "0,00",
  },
}

export const BTCWithValue: Story = {
  args: {
    currency: "BTC",
    locale: "US",
    label: "Bitcoin Amount",
    value: "0.021",
    placeholder: "0.00000000",
  },
}

export const Disabled: Story = {
  args: {
    currency: "USD",
    locale: "US",
    label: "Disabled Amount",
    value: "100.00",
    disabled: true,
  },
}

// Styled examples using className
export const StyledDefault: Story = {
  args: {
    currency: "BTC",
    locale: "US",
    label: "Styled Bitcoin Input",
    placeholder: "0.00000000",
    className: "styled-currency-input",
  },
}

export const StyledModern: Story = {
  args: {
    currency: "USD",
    locale: "US",
    label: "Modern USD Input",
    placeholder: "0.00",
    className: "modern-currency-input",
  },
}

export const StyledCompact: Story = {
  args: {
    currency: "EUR",
    locale: "EU",
    label: "Compact EUR Input",
    placeholder: "0,00",
    className: "compact-currency-input",
  },
}
