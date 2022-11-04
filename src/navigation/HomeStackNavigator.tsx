import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '~/screens/HomeScreen';
import { TestActionScreen } from '~/screens/TestActionScreen';
import { TestDetailScreen } from '~/screens/TestDetailScreen';

import { RouteName } from './rootStackParamList';

const HomeStack = createNativeStackNavigator();
export const HomeStackScreen = (): JSX.Element => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={RouteName.HomeScreen} component={HomeScreen} />
      <HomeStack.Screen
        name={RouteName.TestActionScreen}
        component={TestActionScreen}
      />
      <HomeStack.Screen
        name={RouteName.TestDetailScreen}
        component={TestDetailScreen}
      />
    </HomeStack.Navigator>
  );
};
