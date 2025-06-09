# Contributing to Bitcoin UI

Thank you for your interest in contributing to Bitcoin UI! This guide will help you get started.

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/bitcoin-ui.git
   cd bitcoin-ui
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run tests**
   ```bash
   pnpm test
   ```

4. **Build the library**
   ```bash
   pnpm build
   ```

## Testing Environment

The project uses Jest with jsdom for testing React components:

- **Jest Configuration**: ES modules setup with TypeScript support (`jest.config.mjs`)
- **Test Environment**: jsdom for DOM testing
- **Test Setup**: Custom setup file (`tests/setup.ts`) with mocks for:
  - Clipboard API (`navigator.clipboard`)
  - Legacy clipboard (`document.execCommand`)
  - Console error suppression for expected errors
- **Coverage**: Configured to collect from all source files except tests and index files
- **Accessibility**: Uses jest-axe for automated accessibility testing

```bash
# Test commands
pnpm test              # Run all tests
pnpm test:watch        # Run tests in watch mode  
pnpm test:coverage     # Run with coverage report
pnpm test:a11y         # Run accessibility tests only
```

## Development Workflow

### Adding a New Component

1. **Create component directory**
   ```
   src/components/my-component/
   ├── index.ts
   ├── my-component.tsx
   ├── types.ts
   ├── utils.ts (if needed)
   └── __tests__/
       ├── my-component.test.tsx
       └── my-component.a11y.test.tsx
   ```

2. **Follow component patterns**
   - Use `forwardRef` for ref forwarding
   - Accept `BaseComponentProps`
   - Include proper TypeScript types
   - Add data attributes for styling hooks
   - Support keyboard navigation
   - Include loading states where appropriate

3. **Write comprehensive tests**
   - Component functionality tests
   - Accessibility tests with jest-axe
   - Edge cases and error scenarios
   - Keyboard navigation tests

4. **Update exports**
   ```typescript
   // src/components/index.ts
   export * from './my-component'
   ```

**Note**: For complex components like `CurrencyInput`, you may need additional files:
- `types.ts` - Type definitions and interfaces
- `utils.ts` - Helper functions for formatting, validation, etc.
- Ensure all utility functions are covered by tests

### Component Guidelines

#### Accessibility Requirements

All components must:
- Use semantic HTML elements
- Include proper ARIA attributes
- Support keyboard navigation
- Have no accessibility violations (jest-axe)
- Include screen reader support
- Follow WCAG 2.1 AA guidelines

#### TypeScript Requirements

- Full type coverage
- Proper prop interfaces
- Generic types where appropriate
- JSDoc comments for public APIs
- Exported types for consumers

#### Testing Requirements

- Component tests with >90% coverage
- Accessibility tests with zero violations
- Keyboard navigation tests
- Edge case coverage
- Integration tests where needed

**Current Test Suite:**
- **55 passing tests** across all components
- **10 test suites** covering functionality and accessibility
- **Comprehensive mocking** for browser APIs (clipboard, etc.)
- **Real-world scenarios** including error handling

#### Styling Philosophy

Components should be:
- **Flexible**: Multiple styling approaches supported
- **Consistent**: Common patterns across components
- **Accessible**: Color contrast and focus indicators

### Example Component Structure

```typescript
// types.ts
import { BaseComponentProps } from '@/types/common'

export interface MyComponentProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

// my-component.tsx
import { forwardRef } from 'react'
import { MyComponentProps } from './types'

export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className = '', variant = 'primary', disabled = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`my-component my-component--${variant} ${className}`}
        data-variant={variant}
        data-disabled={disabled}
        aria-disabled={disabled}
        {...props}
      />
    )
  }
)

MyComponent.displayName = 'MyComponent'
```

#### Testing Patterns

#### Component Tests
```typescript
describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent>Content</MyComponent>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<MyComponent ref={ref}>Content</MyComponent>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('applies variant classes', () => {
    render(<MyComponent variant="secondary">Content</MyComponent>)
    expect(screen.getByText('Content')).toHaveClass('my-component--secondary')
  })
})
```

#### Accessibility Tests
```typescript
describe('MyComponent accessibility', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<MyComponent>Content</MyComponent>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

## Code Quality

### Linting and Formatting

```bash
# Run ESLint
pnpm lint

# Format with Prettier
pnpm format

# Type checking
pnpm typecheck
```

### Pre-commit Hooks

The project uses Husky for pre-commit hooks that:
- Run ESLint and fix issues
- Format code with Prettier
- Run type checking
- Run tests

## Releasing

We use Changesets for version management:

1. **Create a changeset**
   ```bash
   pnpm changeset
   ```

2. **Version packages**
   ```bash
   pnpm version-packages
   ```

3. **Publish**
   ```bash
   pnpm release
   ```

## Pull Request Guidelines

1. **Branch naming**: Use descriptive names like `feat/button-component` or `fix/accessibility-issue`

2. **Commit messages**: Follow conventional commits format
   ```
   feat: add button component
   fix: resolve keyboard navigation issue
   docs: update readme examples
   ```

3. **PR description**: Include:
   - What changes were made
   - Why the changes were needed
   - How to test the changes
   - Screenshots for UI changes

4. **Checklist**:
   - [ ] Tests pass
   - [ ] No accessibility violations
   - [ ] TypeScript compiles without errors
   - [ ] Documentation updated
   - [ ] Changeset created (if needed)

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Questions about the codebase
- Suggestions for improvements

Thank you for contributing to Bitcoin UI! 🧡
