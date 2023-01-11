import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EmailChangeScreen } from '~/screens/Auth/EmailChangeScreen';
import { LogoutScreen } from '~/screens/Auth/LogoutScreen';
import { PasswordChangeScreen } from '~/screens/Auth/PasswordChangeScreen';
import { HomeScreen } from '~/screens/HomeScreen';
import { MyPageScreen } from '~/screens/MyPageScreen';

import { RouteName } from './rootStackParamList';

const HomeStack = createNativeStackNavigator();
export const HomeStackScreen = (): JSX.Element => {
  return (
    <HomeStack.Navigator screenOptions={{}}>
      <HomeStack.Screen
        name={RouteName.HomeScreen}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={RouteName.MyPageScreen}
        component={MyPageScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={RouteName.LogoutScreen}
        component={LogoutScreen}
      />
      <HomeStack.Screen
        name={RouteName.PasswordChangeScreen}
        component={PasswordChangeScreen}
      />
      <HomeStack.Screen
        name={RouteName.EmailChangeScreen}
        component={EmailChangeScreen}
      />
    </HomeStack.Navigator>
  );
};
