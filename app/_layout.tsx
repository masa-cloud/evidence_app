import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { TamaguiProvider } from 'tamagui';

import useCachedResources from '~/lib/useCachedResources';
// import useColorScheme from "~/lib/useColorScheme";
import store, { persistor } from '~/store';

import config from '../tamagui.config';

export default function Root(): JSX.Element | null {
  const isLoadingComplete = useCachedResources();
  // TODO:color scheme使えるようにする
  // const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return <SplashScreen />;
  } else {
    return (
      <TamaguiProvider config={config}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaProvider>
              {/* TODO:color scheme導入 */}
              {/* <Slot colorScheme={colorScheme}/> */}
              <Slot />
              <StatusBar />
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </TamaguiProvider>
    );
  }
}
