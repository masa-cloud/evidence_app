import 'expo-router/entry';

// import { Amplify } from '@aws-amplify/core';
// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { TamaguiProvider } from 'tamagui';

// import aws_exports from './src/aws-exports';
// import useCachedResources from './src/lib/useCachedResources';
// import useColorScheme from './src/lib/useColorScheme';
// import Navigation from './src/navigation/RootNavigator';
// import store, { persistor } from './src/store';
// import config from './tamagui.config';

// Amplify.configure(aws_exports);

// export default function App(): JSX.Element | null {
//   const isLoadingComplete = useCachedResources();
//   const colorScheme = useColorScheme();

//   if (!isLoadingComplete) {
//     return null;
//   } else {
//     return (
//       <TamaguiProvider config={config}>
//         <Provider store={store}>
//           <PersistGate loading={null} persistor={persistor}>
//             <SafeAreaProvider>
//               <Navigation colorScheme={colorScheme} />
//               <StatusBar />
//             </SafeAreaProvider>
//           </PersistGate>
//         </Provider>
//       </TamaguiProvider>
//     );
//   }
// }
