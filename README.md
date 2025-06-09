<div align="center">
  <img src="logo/btc-ui.png" alt="Bitcoin UI" width="200" height="200" />
  
  # Bitcoin UI Components

  Accessible React component library for Bitcoin applications. Built with TypeScript and designed following the [Bitcoin Design Guide](https://bitcoin.design/guide/) and [Bitcoin Universal Design Accessibility Standards](https://jason-me.github.io/bitcoin-universal-design/).

  [![Tests](https://img.shields.io/badge/tests-55%20passing-brightgreen)](src/__tests__)
  [![Components](https://img.shields.io/badge/components-5-blue)](#-components)
  [![Storybook](https://img.shields.io/badge/storybook-live-ff4785)](http://localhost:6006)
</div>

## ✨ Features

- 🔐 **Flexible** - Bring your own design system
- ♿ **Fully Accessible** - WCAG compliant with screen reader support
- 🌍 **Locale-Aware** - Support for US, EU number formatting
- ₿ **Bitcoin-Specific** - Designed for Bitcoin applications
- 📱 **Mobile-First** - Responsive and touch-friendly
- 🔒 **Security-Focused** - Secure handling of sensitive data
- 🧪 **Thoroughly Tested** - 55+ tests including accessibility & story tests
- 📚 **Interactive Docs** - Explore components with Storybook

## 📦 Installation

```bash
npm install bitcoin-ui
# or
yarn add bitcoin-ui
# or
pnpm add bitcoin-ui
```

## 🎨 Interactive Examples

**🚀 [View Live Components in Storybook →](http://localhost:6006)**

Explore all components interactively with different props, styling examples, and live code:

```bash
# Clone the repository
git clone <repository-url>
cd bitcoin-ui
pnpm install

# Start Storybook
pnpm storybook
```

Then open [http://localhost:6006](http://localhost:6006) to see:
- **Interactive component playground** with live prop controls
- **Multiple styling examples** for each component
- **Accessibility testing tools** built-in
- **Copy-paste code examples** for implementation
- **Real-time documentation** with TypeScript support

## 🚀 Quick Start

```tsx
import { Secret, PasswordInput, QRCode, ExpandableText, CurrencyInput } from 'bitcoin-ui'

function App() {
  const [password, setPassword] = useState('')
  const [amount, setAmount] = useState('')

  return (
    <div>
      {/* Secure display of sensitive information */}
      <Secret 
        secret="abandon ability able about above absent absorb abstract absurd abuse access accident"
        label="Seed Phrase"
      />

      {/* Password input with reveal/hide toggle */}
      <PasswordInput
        label="Wallet Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Currency input with locale-aware formatting */}
      <CurrencyInput
        currency="BTC"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        label="Bitcoin Amount"
      />

      {/* QR code with copy functionality */}
      <QRCode
        value="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        label="Bitcoin Address QR"
        size={200}
      />

      {/* Expandable text for long addresses */}
      <ExpandableText
        text="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        type="address"
        label="Bitcoin Address"
      />
    </div>
  )
}
```

## 🧩 Components

### 🔐 Secret
Securely display and copy sensitive information like seed phrases and private keys.

```tsx
<Secret
  secret="correct horse battery staple"
  label="Seed Phrase"
  maskChar="•"
  showCopyButton={true}
/>
```

**Props:**
- `secret: string` - The sensitive text to display
- `label?: string` - Accessible label for the secret
- `maskChar?: string` - Character to use for masking (default: "•")
- `showCopyButton?: boolean` - Whether to show copy button (default: true)

### 🔑 PasswordInput
Accessible password input with reveal/hide toggle functionality.

```tsx
<PasswordInput
  label="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter your password"
  autoComplete="new-password"
/>
```

**Props:**
- `label?: string` - Accessible label for the input
- All standard HTML input props (value, onChange, placeholder, etc.)

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
- `value: string` - The data to encode in the QR code
- `label: string` - Accessible label for the QR code
- `size?: number` - Size of the QR code in pixels (default: 200)
- `errorCorrectionLevel?: "L" | "M" | "Q" | "H"` - Error correction level (default: "M")
- `description?: string` - Additional description for accessibility

### 📄 ExpandableText
Display long text with expand/collapse and copy functionality.

```tsx
<ExpandableText
  text="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
  type="address"
  label="Bitcoin Address"
  startChars={6}
  endChars={8}
  showCopyButton={true}
/>
```

**Props:**
- `text: string` - The text to display
- `type?: "address" | "invoice" | "text"` - Type of text for accessibility
- `label?: string` - Accessible label
- `startChars?: number` - Characters to show at start when truncated (default: 6)
- `endChars?: number` - Characters to show at end when truncated (default: 8)
- `showCopyButton?: boolean` - Whether to show copy button (default: true)

### 💰 CurrencyInput
Locale-aware currency input with real-time formatting and validation.

```tsx
<CurrencyInput
  currency="BTC"
  locale="US"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  label="Bitcoin Amount"
  placeholder="0.021"
/>
```

**Props:**
- `currency: "BTC" | "USD" | "EUR"` - Currency type
- `locale?: "US" | "EU"` - Locale for number formatting (default: "US")
- `label?: string` - Accessible label for the input
- All standard HTML input props (value, onChange, placeholder, etc.)

**Locale Formatting:**
- **US**: `1,234.56` (comma thousands, dot decimal)
- **EU**: `1.234,56` (dot thousands, comma decimal)

## 🎨 Styling

All components are flexible by default. You can style them using:

### CSS Classes
Each component exposes specific CSS classes for styling:

```css
/* Secret component */
.secret { /* wrapper */ }
.secret__text { /* text display */ }
.secret__toggle { /* reveal/hide button */ }
.secret__copy { /* copy button */ }

/* Password input */
.password-input { /* wrapper */ }
.password-input__input { /* input field */ }
.password-input__toggle { /* visibility toggle */ }

/* QR code */
.qr-code { /* wrapper */ }
.qr-code__svg { /* QR code SVG */ }
.qr-code__copy { /* copy button */ }

/* Expandable text */
.expandable-text { /* wrapper */ }
.expandable-text__content { /* text content */ }
.expandable-text__toggle { /* expand/collapse button */ }

/* Currency input */
.currency-input { /* wrapper */ }
.currency-input__symbol { /* currency symbol */ }
.currency-input__input { /* input field */ }
```

### Inline Styles
Pass styles directly to components:

```tsx
<Secret
  secret="my secret"
  style={{ padding: '1rem', backgroundColor: 'white' }}
/>
```

### CSS-in-JS
Use your preferred CSS-in-JS solution:

```tsx
const StyledSecret = styled(Secret)`
  padding: 1rem;
  background: white;
  border-radius: 8px;
`
```

## 🧪 Development

### Setup
```bash
git clone <repository-url>
cd bitcoin-ui
pnpm install
```

### Scripts
```bash
# Start Storybook (component playground)
pnpm storybook

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run accessibility tests
pnpm test:a11y

# Run test coverage
pnpm test:coverage

# Run story tests (verify all Storybook stories render)
pnpm test:stories

# Run story tests in watch mode
pnpm test:stories:watch

# Run linting
pnpm lint

# Type checking
pnpm typecheck

# Build for production
pnpm build

# Development with hot reload
pnpm dev
```

### Viewing Components
The best way to explore and test components is through Storybook:

```bash
# Start the interactive component playground
pnpm storybook
```

Then open [http://localhost:6006](http://localhost:6006) to:
- **Test components** with different props and styling
- **View all component variations** and examples
- **Copy implementation code** for your projects
- **Test accessibility** features and keyboard navigation
- **Experiment with styling** approaches for design-flexible components

The example page (`src/example.tsx`) demonstrates all components with various configurations, but Storybook provides a much better interactive experience.

## ♿ Accessibility

All components follow [Bitcoin Universal Design Accessibility Standards](https://jason-me.github.io/bitcoin-universal-design/) and include:

- **Screen Reader Support** - ARIA labels, descriptions, and live regions
- **Keyboard Navigation** - Full keyboard accessibility with proper focus management
- **High Contrast** - Supports high contrast mode and custom focus indicators
- **Semantic HTML** - Proper HTML structure and roles
- **Clear Feedback** - Accessible announcements for all user actions
- **Responsive Design** - Works across all device sizes and orientations

### Testing Accessibility
```bash
# Run accessibility tests
pnpm test:a11y

# Test with screen readers
# - NVDA (Windows)
# - JAWS (Windows) 
# - VoiceOver (macOS)
# - TalkBack (Android)
```

## 🔧 Testing

The library includes comprehensive tests:

- **55+ Unit Tests** - Component functionality and edge cases
- **32 Story Tests** - Verify all Storybook stories render correctly
- **Accessibility Tests** - Automated a11y testing with jest-axe
- **Type Tests** - TypeScript type checking
- **Integration Tests** - Component interaction testing

```bash
# Run all tests
pnpm test

# Run specific test suites
pnpm test src/components/secret
pnpm test src/components/password-input
pnpm test src/components/qr-code
pnpm test src/components/expandable-text
pnpm test src/components/currency-input

# Run with coverage
pnpm test:coverage
```

## 🌟 Design Principles

This library follows the [Bitcoin Design Guide](https://bitcoin.design/guide/) principles:

- **Clarity** - Clear, unambiguous interfaces
- **Consistency** - Consistent patterns across components
- **Accessibility** - Inclusive design for all users
- **Security** - Secure handling of sensitive Bitcoin data
- **Simplicity** - Focus on essential functionality
- **Trust** - Building user confidence through good UX

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Component Guidelines
When contributing new components:

1. **Follow Bitcoin Design Guide** principles
2. **Implement full accessibility** with ARIA support
3. **Write comprehensive tests** (unit + a11y)
4. **Use TypeScript** with proper type definitions
5. **Keep components flexible** - minimize styling
6. **Document thoroughly** with examples

## 📄 License

MIT © [Bitcoin UI Kit](LICENSE)

## 🔗 Links

- **[Interactive Component Playground (Storybook)](http://localhost:6006)** - Live examples and documentation
- [Bitcoin Design Guide](https://bitcoin.design/guide/)
- [Bitcoin Universal Design Accessibility Standards](https://jason-me.github.io/bitcoin-universal-design/)
- [Component Examples](src/example.tsx)
- [Contributing Guidelines](CONTRIBUTING.md)
