# AI Prompt: Create Bitcoin UI Component Library Website

## Project Overview
Create a modern, professional documentation website for an open-source Bitcoin UI React component library. The site should be hosted on Netlify with integrated Storybook documentation.

## Design Inspiration & Requirements

**Primary Design Inspiration:**
- **[Bitcoin.design](https://bitcoin.design/)** - Clean, modern design with focus on open-source bitcoin development, community-driven approach, clear navigation, and accessibility emphasis
- **bitcoinuikit.com** - Professional component library presentation
- Use the provided `btc-ui.png` logo as visual foundation

**Key Design Elements to Incorporate:**
- Clean, minimalist design similar to bitcoin.design
- Professional typography (Inter font family)
- Bitcoin orange accent colors (#f97316)
- Modern card-based layouts
- Clear visual hierarchy
- Mobile-first responsive design
- Dark mode support

## Technical Requirements

**Hosting & Integration:**
- Deploy to Netlify with automatic builds
- Integrate Storybook documentation (embed or link to `/storybook` route)
- Static site generation (suggest Next.js, Gatsby, or similar)
- Fast loading and SEO optimized
- Responsive design for all devices

**Core Features Needed:**
- Component documentation with live examples
- Interactive playground/sandbox
- Copy-paste code snippets
- Installation and setup guides
- API reference for each component
- Accessibility documentation
- TypeScript support showcase

## Content Structure

**Homepage:**
- Hero section with tagline: "Modern, accessible React components for Bitcoin applications"
- Key features: 🎨 Beautiful by Default, ♿ Fully Accessible, 🎯 Zero Dependencies, 🌙 Dark Mode Ready, 🔒 Security-Focused
- Component preview cards with live examples
- Quick start code snippet
- Stats: 5 components, 176+ tests, TypeScript ready
- Link to Storybook playground

**Component Library Details:**
Our library includes 5 main components:
1. **Secret** - Secure display/copy for seed phrases and private keys
2. **PasswordInput** - Accessible password input with reveal/hide toggle
3. **CurrencyInput** - Locale-aware inputs for BTC/USD/EUR with formatting
4. **ExpandableText** - Truncate long text (Bitcoin addresses) with expand/collapse
5. **QRCode** - Generate QR codes with copy functionality

**Key Features to Highlight:**
- Beautiful default styling with Inter font
- Comprehensive accessibility (WCAG 2.1 AA compliant)
- Only requires React + qrcode.react (minimal dependencies)
- Dark mode automatic support
- Mobile-first responsive design
- TypeScript support with exported types
- 176+ tests including accessibility tests

**Navigation Structure:**
```
- Home
- Components
  - Secret
  - PasswordInput
  - CurrencyInput
  - ExpandableText
  - QRCode
- Playground (Storybook integration)
- Getting Started
- Examples
- Accessibility
- GitHub
```

## Content Sections

**Hero Section:**
- Large headline: "Bitcoin UI Components"
- Subtitle: "Modern, accessible React components for Bitcoin applications. Built with TypeScript, featuring beautiful default styling with Inter font."
- Primary CTA: "Get Started" → Installation
- Secondary CTA: "View Components" → Storybook
- Code preview showing basic usage

**Features Section:**
- Grid of feature cards with icons
- Emphasize accessibility, security, ease of use
- Include metrics: 5 components, 176+ passing tests, zero external dependencies

**Component Showcase:**
- Interactive preview of each component
- Live code examples that can be copied
- Show both default styling and customization examples
- Link each to detailed documentation

**Quick Start Section:**
```bash
npm install @bitcoin-ui/components
```
```tsx
import { PasswordInput, Secret } from "@bitcoin-ui/components"
import "@bitcoin-ui/components/styles.css"
```

**Community & Standards:**
- Reference bitcoin.design community standards
- Link to Bitcoin Design Guide compliance
- Accessibility standards (Bitcoin Universal Design)
- Open source contribution guidelines

## Technical Implementation

**Storybook Integration:**
- Embed Storybook as subdirectory or iframe
- Direct links to individual component stories
- Ensure Storybook builds and deploys with main site

**Code Examples:**
- Syntax-highlighted code blocks
- Copy-to-clipboard functionality
- Live/editable examples where possible
- Show TypeScript usage prominently

**Performance:**
- Optimized images and assets
- Fast loading times
- Progressive enhancement
- Good Core Web Vitals scores

## Design System

**Colors:**
- Primary: Bitcoin Orange (#f97316)
- Text: Dark gray (#111827) / Light gray (#f9fafb) for dark mode
- Background: Clean whites/dark grays
- Accent: Green for success states

**Typography:**
- Primary: Inter font family
- Monospace: For code examples (matches component library)
- Clear hierarchy with appropriate sizing

**Components:**
- Card-based layouts for component showcases
- Button styles matching the component library
- Consistent spacing and border radius
- Subtle shadows and hover effects

## Additional Features

**Documentation:**
- API reference tables for each component prop
- Accessibility guidelines per component
- Customization examples with CSS custom properties
- Migration guides and best practices

**Interactive Elements:**
- Live component playground
- Theme switcher (light/dark mode)
- Copy code buttons
- Responsive navigation

**SEO & Metadata:**
- Proper meta tags for component library
- Open Graph images
- JSON-LD structured data
- Sitemap generation

## Deployment Notes
- Configure Netlify for automatic deploys from GitHub
- Set up build commands for both main site and Storybook
- Configure redirects and headers appropriately
- Enable automatic SSL and CDN

## Final Goal
Create a beautiful, functional website that positions this as a professional, community-driven Bitcoin component library that developers will trust and want to use in their projects. The site should feel modern, accessible, and aligned with the Bitcoin design community standards while showcasing the quality and professionalism of the component library.
