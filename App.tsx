import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { TailwindProvider } from 'tailwind-rn';

import Navigation from '~/navigation/RootNavigator';

import useCachedResources from './src/lib/useCachedResources';
import useColorScheme from './src/lib/useColorScheme';
import { store } from './src/store';
import utilities from './tailwind.json';

export default function App(): JSX.Element | null {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <TailwindProvider utilities={utilities}>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </TailwindProvider>
          </SafeAreaProvider>
        </NativeBaseProvider>
      </Provider>
    );
  }
}
