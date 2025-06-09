<div align="center">
  <img src="logo/btc-ui.png" alt="Bitcoin UI" width="160" height="160" />

# bitcoin-ui

Accessible React component library for Bitcoin applications. Built with TypeScript following Bitcoin Design Guide principles.

[![Tests](https://img.shields.io/badge/tests-55%20passing-brightgreen)](src/__tests__)
[![Storybook](https://img.shields.io/badge/storybook-live-ff4785)](http://localhost:6006)
</div>

## 📦 Install

```sh
npm install bitcoin-ui
# or
yarn add bitcoin-ui  
# or
pnpm add bitcoin-ui
```

## 🎨 Interactive Examples

**🚀 [Explore Components in Storybook →](http://localhost:6006)**

See all components with live examples, styling options, and interactive controls.

## 🚀 Quick Usage

```ts
import { Secret, PasswordInput, QRCode, ExpandableText, CurrencyInput } from "bitcoin-ui"
```

### Basic Example

```tsx
import React, { useState } from 'react'
import { Secret, PasswordInput, CurrencyInput } from 'bitcoin-ui'

function WalletApp() {
  const [password, setPassword] = useState('')
  const [amount, setAmount] = useState('')

  return (
    <div>
      <Secret
        secret="abandon ability able about above absent absorb abstract"
        label="Recovery Phrase"
      />
      
      <PasswordInput
        label="Wallet Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <CurrencyInput
        currency="BTC"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        label="Amount"
      />
    </div>
  )
}
```

## 🧩 Available Components

- **Secret** - Secure display with reveal/hide for seed phrases and keys
- **PasswordInput** - Accessible password input with visibility toggle  
- **QRCode** - Generate QR codes with copy functionality
- **ExpandableText** - Truncate long text with expand/collapse
- **CurrencyInput** - Locale-aware inputs for BTC/USD/EUR

## ♿ Accessibility Features

- WCAG 2.1 AA compliant
- Full keyboard navigation
- Screen reader support
- ARIA labels and descriptions
- High contrast mode support

## 🎨 Styling

Components are opinionated but flexible - bring your own styles:

```tsx
// CSS classes
<Secret className="my-secret-styles" />

// Inline styles  
<Secret style={{ padding: '1rem' }} />

// CSS-in-JS
const StyledSecret = styled(Secret)`
  padding: 1rem;
`
```

## 🔧 TypeScript Support

Full TypeScript support with exported types:

```tsx
import type { 
  SecretProps, 
  PasswordInputProps, 
  QRCodeProps,
  ExpandableTextProps,
  CurrencyInputProps,
  Currency,
  Locale 
} from 'bitcoin-ui'
```

## 🧪 Testing

The library includes comprehensive testing with Jest and jsdom:

- **55 passing tests** across all components
- **Accessibility tests** with jest-axe
- **Component functionality** and edge cases
- **Keyboard navigation** testing
- **TypeScript coverage** and type checking

```bash
# Run tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run in watch mode
pnpm test:watch
```

## 📚 Documentation

For complete API documentation and guides:
- **[Interactive Storybook →](http://localhost:6006)** - Live component playground
- [Full Documentation](README.md)
- [Bitcoin Design Guide](https://bitcoin.design/guide/)

## 🔗 Links

- [GitHub Repository](https://github.com/bitcoin-ui-kit/bitcoin-ui)
- [Interactive Component Docs](http://localhost:6006)
- [Bitcoin Design Guide](https://bitcoin.design/guide/)
- [Bitcoin Universal Design Standards](https://jason-me.github.io/bitcoin-universal-design/)
