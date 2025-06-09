import type { Meta, StoryObj } from "@storybook/react"

import { Secret } from "../components/secret"

const meta: Meta<typeof Secret> = {
  title: "Bitcoin UI/Secret",
  component: Secret,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Securely display and copy sensitive information like seed phrases and private keys. The component includes beautiful default styling with Inter font that can be customized.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    secret: {
      control: "text",
      description: "The sensitive text to display",
    },
    label: {
      control: "text",
      description: "Accessible label for the secret",
    },
    maskCharacter: {
      control: "text",
      description: "Character to use for masking",
    },
    showCopyButton: {
      control: "boolean",
      description: "Whether to show copy button",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default styling examples
export const Default: Story = {
  args: {
    secret: "correct horse battery staple",
    label: "Seed Phrase",
    showCopyButton: true,
  },
}

export const SeedPhrase: Story = {
  args: {
    secret: "abandon ability able about above absent absorb abstract absurd abuse access accident",
    label: "Recovery Seed Phrase",
    showCopyButton: true,
  },
}

export const PrivateKey: Story = {
  args: {
    secret: "L3p8oAcQTtuokSCRHQ7i4MhjWc9zornvpJLfmg62sYpLRJF9woSu",
    label: "Private Key",
    maskCharacter: "●",
    showCopyButton: true,
  },
}

export const CustomMaskChar: Story = {
  args: {
    secret: "secret password 123",
    label: "API Key",
    maskCharacter: "*",
    showCopyButton: true,
  },
}

export const WithoutCopyButton: Story = {
  args: {
    secret: "display only secret",
    label: "Display Only",
    showCopyButton: false,
  },
}

// Custom styled examples using className
export const CustomStyled: Story = {
  args: {
    secret: "correct horse battery staple",
    label: "Custom Styled Seed Phrase",
    showCopyButton: true,
    className: "custom-secret-style",
  },
}

export const DarkTheme: Story = {
  args: {
    secret: "abandon ability able about above absent absorb abstract",
    label: "Dark Theme",
    showCopyButton: true,
    className: "dark-theme",
  },
}

export const CompactStyle: Story = {
  args: {
    secret: "L3p8oAcQTtuokSCRHQ7i4MhjWc9zornvpJLfmg62sYpLRJF9woSu",
    label: "Compact Private Key",
    showCopyButton: true,
    className: "compact-style",
  },
}
