import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '~/screens/HomeScreen';

import { RouteName } from './rootStackParamList';

const HomeStack = createNativeStackNavigator();
export const HomeStackScreen = (): JSX.Element => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={RouteName.HomeScreen} component={HomeScreen} />
    </HomeStack.Navigator>
  );
};
