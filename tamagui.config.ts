import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/theme-base';
import { createTamagui } from 'tamagui';

import { animations } from './src/lib/constants/animations';

const headingFont = createInterFont({
  color: {
    6: '$colorFocus',
    7: '$color',
  },
  face: {
    700: { normal: 'InterBold' },
  },
  letterSpacing: {
    10: -3,
    12: -4,
    14: -5,
    15: -6,
    5: 2,
    6: 1,
    7: 0,
    8: -1,
    9: -2,
  },
  size: {
    6: 15,
  },
  transform: {
    6: 'uppercase',
    7: 'none',
  },
  weight: {
    6: '400',
    7: '700',
  },
});

const bodyFont = createInterFont(
  {
    face: {
      700: { normal: 'InterBold' },
    },
  },
  {
    sizeLineHeight: (size) => Math.round(size * 1.1 + (size > 20 ? 10 : 10)),
    sizeSize: (size) => Math.round(size * 1.1),
  },
);

const config = createTamagui({
  animations,
  defaultTheme: 'light',
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  media: {
    gtLg: { minWidth: 1280 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtXs: { minWidth: 660 + 1 },
    hoverNone: { hover: 'none' },
    lg: { maxWidth: 1280 },
    md: { maxWidth: 1020 },
    pointerCoarse: { pointer: 'coarse' },
    short: { maxHeight: 820 },
    sm: { maxWidth: 800 },
    tall: { minHeight: 820 },
    xl: { maxWidth: 1420 },
    xs: { maxWidth: 660 },
    xxl: { maxWidth: 1600 },
  },
  shorthands,
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  themes,
  tokens,
});

export type AppConfig = typeof config;

declare module 'tamagui' {
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
