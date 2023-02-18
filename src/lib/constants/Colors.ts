import { useColorScheme } from 'react-native';

type ReturnUseColors = {
  colors: {
    background: string;
    border: string;
    card: string;
    error: string;
    link: string;
    notification: string;
    primary: string;
    text: string;
  };
  darkMode: boolean;
};

/** @package */
export const useColors = (): ReturnUseColors => {
  const colorScheme = useColorScheme();

  if (colorScheme === 'dark') {
    return {
      colors: {
        background: '#000',
        border: '#CBD5E1',
        card: '#1E293B',
        error: '#ef4444',
        link: '#93C5FD',
        notification: 'black',
        primary: '#1D4ED8',
        text: '#fafafa',
      },
      darkMode: true,
    };
  } else {
    return {
      colors: {
        background: '#000',
        border: '#CBD5E1',
        card: '#1E293B',
        error: '#ef4444',
        link: '#93C5FD',
        notification: 'black',
        primary: '#3F3F46',
        text: '#fafafa',
      },
      darkMode: false,
    };
  }
};
