# Bitcoin UI Components

Modern, accessible React component library for Bitcoin applications. Built with TypeScript, featuring beautiful default styling with Inter font, and designed for maximum flexibility.

[![npm version](https://img.shields.io/npm/v/@bitcoin-ui/components.svg)](https://www.npmjs.com/package/@bitcoin-ui/components)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- 🎨 **Beautiful by Default** - Clean, modern styling with Inter font
- ♿ **Fully Accessible** - WCAG 2.1 AA compliant with screen reader support
- 🎯 **Zero Dependencies** - Only requires React and qrcode.react
- 🌙 **Dark Mode Ready** - Automatic dark mode support via CSS custom properties
- 🔒 **Security-Focused** - Secure handling of sensitive Bitcoin data
- 📱 **Mobile-First** - Responsive design for all screen sizes
- 🎨 **Customizable** - CSS custom properties for easy theming
- 🚀 **Lightweight** - Minimal bundle size impact

## 📦 Installation

```bash
npm install @bitcoin-ui/components
# or
yarn add @bitcoin-ui/components
# or
pnpm add @bitcoin-ui/components
```

## 🚀 Quick Start

```tsx
import React, { useState } from 'react';
import { 
  Secret, 
  PasswordInput, 
  CurrencyInput, 
  ExpandableText, 
  QRCode 
} from '@bitcoin-ui/components';

// Import the default styles
import '@bitcoin-ui/components/styles.css';

function BitcoinWallet() {
  const [password, setPassword] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <div style={{ padding: '2rem', maxWidth: '600px' }}>
      {/* Secure seed phrase display */}
      <Secret
        secret="abandon ability able about above absent absorb abstract"
        label="Recovery Seed Phrase"
        showCopyButton={true}
      />

      {/* Password input with visibility toggle */}
      <PasswordInput
        label="Wallet Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your secure password"
      />

      {/* Currency input with locale formatting */}
      <CurrencyInput
        currency="BTC"
        locale="US"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        label="Bitcoin Amount"
        placeholder="0.021"
      />

      {/* Expandable Bitcoin address */}
      <ExpandableText
        text="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        label="Bitcoin Address"
        type="address"
        showCopyButton={true}
      />

      {/* QR code with copy functionality */}
      <QRCode
        value="bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh?amount=0.021"
        label="Payment Request"
        size={200}
        description="Scan to send Bitcoin payment"
      />
    </div>
  );
}
```

## 🧩 Components

### 🔐 Secret

Securely display and copy sensitive information like seed phrases and private keys.

```tsx
<Secret
  secret="correct horse battery staple"
  label="Seed Phrase"
  maskCharacter="•"
  showCopyButton={true}
/>
```

**Props:**
- `secret: string` - The sensitive text to display
- `label?: string` - Accessible label (default: "Secret")
- `maskCharacter?: string` - Character for masking (default: "•")
- `showCopyButton?: boolean` - Show copy button (default: true)
- `className?: string` - Additional CSS classes

### 🔑 PasswordInput

Accessible password input with reveal/hide toggle functionality.

```tsx
<PasswordInput
  label="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter your password"
/>
```

**Props:**
- `label?: string` - Accessible label for the input
- All standard HTML input props (value, onChange, placeholder, etc.)

### 💰 CurrencyInput

Locale-aware currency input with real-time formatting and validation.

```tsx
<CurrencyInput
  currency="BTC"
  locale="US"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  label="Bitcoin Amount"
/>
```

**Props:**
- `currency: "BTC" | "USD" | "EUR"` - Currency type
- `locale?: "US" | "EU"` - Number formatting locale (default: "US")
- `label?: string` - Accessible label
- All standard HTML input props

**Locale Formatting:**
- **US**: `1,234.56` (comma thousands, dot decimal)
- **EU**: `1.234,56` (dot thousands, comma decimal)

### 📄 ExpandableText

Display long text with expand/collapse and copy functionality.

```tsx
<ExpandableText
  text="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
  label="Bitcoin Address"
  type="address"
  showCopyButton={true}
  startChars={6}
  endChars={8}
/>
```

**Props:**
- `text: string` - The text to display
- `label: string` - Accessible label
- `type?: "address" | "invoice" | "text"` - Type for accessibility (default: "text")
- `showCopyButton?: boolean` - Show copy button (default: true)
- `startChars?: number` - Characters to show at start (default: 6)
- `endChars?: number` - Characters to show at end (default: 6)

### 📱 QRCode

Generate and display QR codes with copy functionality.

```tsx
<QRCode
  value="bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
  label="Bitcoin Address QR"
  size={200}
  errorCorrectionLevel="M"
  description="Scan to send Bitcoin"
/>
```

**Props:**
- `value: string` - Data to encode in QR code
- `label: string` - Accessible label
- `size?: number` - QR code size in pixels (default: 300)
- `errorCorrectionLevel?: "L" | "M" | "Q" | "H"` - Error correction (default: "M")
- `description?: string` - Additional description
- `className?: string` - Additional CSS classes

## 🎨 Styling & Customization

### Default Styling

All components come with beautiful default styling using Inter font and modern design tokens. Simply import the CSS:

```tsx
import '@bitcoin-ui/components/styles.css';
```

### Custom Theming

Override CSS custom properties to customize the design:

```css
:root {
  /* Colors */
  --btc-gray-50: #your-color;
  --btc-gray-900: #your-color;
  --btc-orange-500: #your-accent-color;
  
  /* Typography */
  --btc-font-family: 'Your Font', sans-serif;
  --btc-font-mono: 'Your Mono Font', monospace;
  
  /* Spacing */
  --btc-space-4: 1.5rem;
  
  /* Border radius */
  --btc-radius-lg: 0.75rem;
}
```

### Component-Specific Styling

Each component exposes CSS classes for granular customization:

```css
/* Secret component */
.btc-secret {
  /* Main container */
}
.btc-secret__content {
  /* Text container */
}
.btc-secret__text {
  /* Secret text */
}
.btc-secret__controls {
  /* Button container */
}

/* Currency input */
.btc-currency {
  /* Main container */
}
.btc-currency__symbol {
  /* Currency symbol */
}
.btc-currency__input {
  /* Input field */
}
```

### Dark Mode

Components automatically support dark mode through CSS custom properties:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --btc-gray-50: #111827;
    --btc-gray-900: #f9fafb;
    /* Colors are automatically inverted */
  }
}
```

## ♿ Accessibility

All components follow WCAG 2.1 AA guidelines and include:

- **Screen Reader Support** - ARIA labels, descriptions, and live regions
- **Keyboard Navigation** - Full keyboard accessibility
- **High Contrast** - Support for high contrast mode
- **Semantic HTML** - Proper HTML structure and roles
- **Clear Feedback** - Accessible announcements for user actions

## 🔧 TypeScript Support

Full TypeScript support with exported types:

```tsx
import type {
  SecretProps,
  PasswordInputProps,
  CurrencyInputProps,
  ExpandableTextProps,
  QRCodeProps,
  Currency,
  Locale
} from '@bitcoin-ui/components';
```

## 🚀 Advanced Usage

### Custom Toast Notifications

```tsx
import { showToast } from '@bitcoin-ui/components';

// Success notification
showToast('Bitcoin address copied!');

// Error notification
showToast('Failed to copy address', { type: 'error' });

// Custom duration
showToast('Copied!', { duration: 5000 });
```

### Utility Functions

```tsx
import { 
  truncateText, 
  isValidAmount,
  formatCurrencyValue 
} from '@bitcoin-ui/components';

// Truncate long text
const short = truncateText('very long text here', 10, 5);

// Validate currency amounts
const isValid = isValidAmount('123.45', 'USD');

// Format currency values
const formatted = formatCurrencyValue('1234.56', 'US');
```

## 📱 Mobile Considerations

All components are designed mobile-first with:

- Touch-friendly interactive areas (minimum 44px)
- Responsive typography and spacing
- Optimized for small screens
- Proper viewport handling for iOS Safari

## 🔒 Security Best Practices

When handling sensitive Bitcoin data:

1. **Use HTTPS** - Always serve over secure connections
2. **Clear sensitive data** - Clear form values when appropriate
3. **Validate inputs** - Use provided validation utilities
4. **Secure clipboard** - Components handle clipboard securely
5. **Screen recording protection** - Consider `user-select: none` for sensitive data

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/bitcoin-ui/components.git
cd components
npm install
npm run dev
```

## 📄 License

MIT © Bitcoin UI Team

## 🔗 Links

- [GitHub Repository](https://github.com/bitcoin-ui/components)
- [Bitcoin Design Guide](https://bitcoin.design/guide/)
- [Component Documentation](https://bitcoin-ui.github.io/components)
- [Accessibility Standards](https://jason-me.github.io/bitcoin-universal-design/)
