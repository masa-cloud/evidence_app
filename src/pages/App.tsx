import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TailwindProvider } from 'tailwind-rn';

import utilities from '../../tailwind.json';
import useCachedResources from '../lib/useCachedResources';
import useColorScheme from '../lib/useColorScheme';
import Navigation from '../navigation';

export default function App(): JSX.Element | null {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <TailwindProvider utilities={utilities}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </TailwindProvider>
      </SafeAreaProvider>
    );
  }
}
