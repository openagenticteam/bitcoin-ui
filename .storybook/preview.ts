import type { Preview } from "@storybook/react-vite"

// Import our component styles globally for all stories
import "../src/components/styles.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      description: {
        component: "Bitcoin UI components with beautiful default styling and full accessibility support.",
      },
    },
  },
}

export default preview
