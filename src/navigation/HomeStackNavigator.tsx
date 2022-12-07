import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '~/screens/HomeScreen';
import { LoginScreen } from '~/screens/LoginScreen';
import { SignUpScreen } from '~/screens/SignUpScreen';
import { TestActionScreen } from '~/screens/TestActionScreen';
import { TestDetailScreen } from '~/screens/TestDetailScreen';
import { TestResultScreen } from '~/screens/TestResultScreen';

import { RouteName } from './rootStackParamList';

const HomeStack = createNativeStackNavigator();
export const HomeStackScreen = (): JSX.Element => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={RouteName.HomeScreen} component={HomeScreen} />
      <HomeStack.Screen
        name={RouteName.SignUpScreen}
        component={SignUpScreen}
      />
      <HomeStack.Screen name={RouteName.LoginScreen} component={LoginScreen} />
      <HomeStack.Screen
        name={RouteName.TestActionScreen}
        component={TestActionScreen}
      />
      <HomeStack.Screen
        name={RouteName.TestResultScreen}
        component={TestResultScreen}
      />
      <HomeStack.Screen
        name={RouteName.TestDetailScreen}
        component={TestDetailScreen}
      />
    </HomeStack.Navigator>
  );
};
