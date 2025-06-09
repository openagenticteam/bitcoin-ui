import type { Meta, StoryObj } from "@storybook/react"

import { ExpandableText } from "../components/expandableText"

const meta: Meta<typeof ExpandableText> = {
  title: "Bitcoin UI/ExpandableText",
  component: ExpandableText,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Display long text with expand/collapse and copy functionality. Perfect for Bitcoin addresses, transaction IDs, and other long strings. Features beautiful default styling with Inter font.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: "text",
      description: "The text to display",
    },
    label: {
      control: "text",
      description: "Accessible label",
    },
    type: {
      control: "select",
      options: ["text", "address", "invoice"],
      description: "Type of text for accessibility",
    },
    startChars: {
      control: "number",
      description: "Characters to show at start when truncated",
    },
    endChars: {
      control: "number",
      description: "Characters to show at end when truncated",
    },
    showCopyButton: {
      control: "boolean",
      description: "Whether to show copy button",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    label: "Bitcoin Address",
    type: "address",
    showCopyButton: true,
  },
}

export const BitcoinAddress: Story = {
  args: {
    text: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    label: "Bitcoin Address",
    type: "address",
    showCopyButton: true,
  },
}

export const LongTransactionId: Story = {
  args: {
    text: "1a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48",
    label: "Transaction ID",
    type: "text",
    showCopyButton: true,
  },
}

export const CustomTruncation: Story = {
  args: {
    text: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    label: "Custom Truncation",
    type: "address",
    startChars: 10,
    endChars: 10,
    showCopyButton: true,
  },
}

export const WithoutCopyButton: Story = {
  args: {
    text: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    label: "No Copy Button",
    type: "address",
    showCopyButton: false,
  },
}

export const ShortText: Story = {
  args: {
    text: "Short text that won't truncate",
    label: "Short Text",
    type: "text",
    showCopyButton: true,
  },
}

export const LightningInvoice: Story = {
  args: {
    text: "lnbc20m1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqhp58yjmdan79s6qqdhdzgynm4zwqd5d7xmw5fk98klysy043l2ahrqscc6gd6ql3jrc5yzme8v4ntcewwz5cnw92tz0pc3p5nmqz3a0cjqmtm7",
    label: "Lightning Invoice",
    type: "invoice",
    showCopyButton: true,
  },
}

// Styled examples using className
export const StyledDefault: Story = {
  args: {
    text: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    label: "Styled Address",
    type: "address",
    showCopyButton: true,
    className: "styled-expandable",
  },
}

export const CompactStyle: Story = {
  args: {
    text: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    label: "Compact Style",
    type: "address",
    showCopyButton: true,
    className: "compact-expandable",
  },
}
