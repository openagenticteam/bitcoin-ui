import { defineConfig } from "@ilyasemenov/eslint-config"
// @ts-check
// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

export default defineConfig().append({
  ignores: [
    "**/public/**",
    "**/dist/**",
    "**/node_modules/**",
    "**/build/**",
    "**/coverage/**",
    "**/pnpm-lock.yaml",
    "**/.env*",
    "**/LICENSE*",
    "**/README*",
    "**/CHANGELOG*",
    "**/CONTRIBUTING*",
    "**/.gitignore",
    "**/.gitattributes",
    "**/.dockerignore",
    "**/Dockerfile*",
  ],
})
