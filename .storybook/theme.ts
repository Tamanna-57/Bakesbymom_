import { create } from 'storybook/theming/create';
import {
  colorCherry600,
  colorCherry700,
  colorCocoa500,
  colorCocoa900,
  colorCream50,
  colorCream100,
  colorCream300,
} from '@bakesbymom/tokens';

// Storybook's own chrome, dressed in the brand tokens.
export default create({
  base: 'light',
  brandTitle: 'Bakes by Mom · Design System',
  brandUrl: 'https://github.com/Tamanna-57/Bakesbymom_',
  brandTarget: '_blank',

  colorPrimary: colorCherry700,
  colorSecondary: colorCherry600,

  appBg: colorCream100,
  appContentBg: colorCream50,
  appPreviewBg: colorCream100,
  appBorderColor: colorCream300,
  appBorderRadius: 14,

  fontBase: '"DM Sans", ui-sans-serif, system-ui, sans-serif',
  fontCode: '"DM Mono", ui-monospace, monospace',

  textColor: colorCocoa900,
  textInverseColor: colorCream50,
  textMutedColor: colorCocoa500,

  barTextColor: colorCocoa500,
  barSelectedColor: colorCherry600,
  barHoverColor: colorCherry700,
  barBg: colorCream50,

  inputBg: '#ffffff',
  inputBorder: colorCream300,
  inputTextColor: colorCocoa900,
  inputBorderRadius: 999,
});
