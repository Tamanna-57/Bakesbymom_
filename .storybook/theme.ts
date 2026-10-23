import { create } from 'storybook/theming/create';
import {
  colorBeige50,
  colorBeige300,
  colorBrown600,
  colorBrown900,
  colorCherry700,
  colorCherry800,
  colorPaper,
} from '@bakesbymom/tokens';

// Storybook's own chrome, dressed in the brand tokens.
export default create({
  base: 'light',
  brandTitle: 'Bakes by Mom · Design System',
  brandUrl: 'https://github.com/Tamanna-57/Bakesbymom_',
  brandTarget: '_blank',

  colorPrimary: colorCherry700,
  colorSecondary: colorCherry700,

  appBg: colorBeige50,
  appContentBg: colorPaper,
  appPreviewBg: colorBeige50,
  appBorderColor: colorBeige300,
  appBorderRadius: 14,

  fontBase: '"DM Sans", ui-sans-serif, system-ui, sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, monospace',

  textColor: colorBrown900,
  textInverseColor: colorPaper,
  textMutedColor: colorBrown600,

  barTextColor: colorBrown600,
  barSelectedColor: colorCherry700,
  barHoverColor: colorCherry800,
  barBg: colorPaper,

  inputBg: '#ffffff',
  inputBorder: colorBeige300,
  inputTextColor: colorBrown900,
  inputBorderRadius: 999,
});
