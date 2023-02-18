import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EmailChangeScreen } from '~/../app/(auth)/EmailChangeScreen';
import { LogoutScreen } from '~/../app/(auth)/LogoutScreen';
import { PasswordChangeScreen } from '~/../app/(auth)/PasswordChangeScreen';
import { HomeScreen } from '~/../app/HomeScreen';
import { MyPageScreen } from '~/../app/MyPageScreen';

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
