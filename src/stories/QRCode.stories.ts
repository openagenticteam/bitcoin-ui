import type { Meta, StoryObj } from "@storybook/react"

import { QRCode } from "../components/qr"

const meta: Meta<typeof QRCode> = {
  title: "Bitcoin UI/QRCode",
  component: QRCode,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Generate and display QR codes with copy functionality. Perfect for Bitcoin addresses, Lightning invoices, and other data that needs to be easily scannable. Features beautiful default styling with Inter font.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "The data to encode in the QR code",
    },
    label: {
      control: "text",
      description: "Accessible label for the QR code",
    },
    size: {
      control: { type: "number", min: 50, max: 400 },
      description: "Size of the QR code in pixels",
    },
    errorCorrectionLevel: {
      control: "select",
      options: ["L", "M", "Q", "H"],
      description: "Error correction level",
    },
    description: {
      control: "text",
      description: "Additional description for accessibility",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    label: "Bitcoin Address QR",
    size: 200,
  },
}

export const BitcoinAddress: Story = {
  args: {
    value: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    label: "Bitcoin Address",
    size: 200,
    description: "Scan to view Bitcoin address",
  },
}

export const BitcoinURI: Story = {
  args: {
    value: "bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh?amount=0.021&label=Donation",
    label: "Bitcoin Payment QR",
    size: 250,
    description: "Scan to send 0.021 BTC",
  },
}

export const LightningInvoice: Story = {
  args: {
    value: "lnbc20m1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqhp58yjmdan79s6qqdhdzgynm4zwqd5d7xmw5fk98klysy043l2ahrqscc6gd6ql3jrc5yzme8v4ntcewwz5cnw92tz0pc3p5nmqz3a0cjqmtm7",
    label: "Lightning Invoice",
    size: 200,
    description: "Scan to pay Lightning invoice",
  },
}

export const SmallSize: Story = {
  args: {
    value: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    label: "Small QR Code",
    size: 100,
  },
}

export const LargeSize: Story = {
  args: {
    value: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    label: "Large QR Code",
    size: 300,
  },
}

export const HighErrorCorrection: Story = {
  args: {
    value: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    label: "High Error Correction",
    size: 200,
    errorCorrectionLevel: "H",
    description: "QR code with highest error correction",
  },
}

export const WebsiteURL: Story = {
  args: {
    value: "https://bitcoin.org",
    label: "Website QR",
    size: 200,
    description: "Scan to visit bitcoin.org",
  },
}

// Styled examples using className
export const StyledDefault: Story = {
  args: {
    value: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    label: "Styled QR Code",
    size: 200,
    className: "styled-qr",
  },
}

export const CompactStyle: Story = {
  args: {
    value: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    label: "Compact QR Code",
    size: 150,
    className: "compact-qr",
  },
}
