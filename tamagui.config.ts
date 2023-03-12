import { createInterFont } from '@tamagui/font-inter';
import { createMedia } from '@tamagui/react-native-media-driver';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/theme-base';
import { createTamagui } from 'tamagui';

import { animations } from './src/lib/constants/animations';

const headingFont = createInterFont();
const bodyFont = createInterFont();

const config = createTamagui({
  animations,
  defaultTheme: 'dark',
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  media: createMedia({
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
  }),
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
