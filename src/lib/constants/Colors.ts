import '@react-navigation/native';

/** @package */
export const CustomTheme = {
  colors: {
    background: '#000',
    border: '#CBD5E1',
    card: '#1E293B',
    error: '#ef4444',
    link: '#93C5FD',
    primary: '#3F3F46',
    text: '#fafafa',
  },
  dark: false,
};

/** @package */
export const CustomDarkTheme = {
  colors: {
    background: '#000',
    border: '#CBD5E1',
    card: '#1E293B',
    error: '#ef4444',
    link: '#93C5FD',
    primary: '#1D4ED8',
    text: '#fafafa',
  },
  dark: true,
};

declare module '@react-navigation/native' {
  export type ExtendedTheme = {
    colors: {
      background: string;
      border: string;
      card: string;
      error: string;
      link: string;
      primary: string;
      text: string;
    };
    dark: boolean;
  };
  export function useTheme(): ExtendedTheme;
}
