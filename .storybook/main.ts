import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    {
      // GitHub-flavored Markdown (tables) in the MDX docs pages.
      name: '@storybook/addon-docs',
      options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } },
    },
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/react-vite',
  // The Pinterest references power the moodboard page. They're served relative to the
  // Storybook root, so the page also works when hosted under a sub-path.
  staticDirs: [{ from: '../pinterest', to: '/pinterest' }],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      // Document our props, not every inherited HTML attribute.
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  // Stories import the component library from source for instant hot reload.
  viteFinal: (viteConfig) =>
    mergeConfig(viteConfig, {
      resolve: {
        alias: {
          '@bakesbymom/ui': fileURLToPath(new URL('../packages/ui/src/index.ts', import.meta.url)),
        },
      },
    }),
};

export default config;
