import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '~/../app/(auth)/LoginScreen';
import { PasswordResetScreen } from '~/../app/(auth)/PasswordResetScreen';
import { SignUpScreen } from '~/../app/(auth)/SignUpScreen';

import { RouteName } from './rootStackParamList';

const AuthStack = createNativeStackNavigator();
export const AuthStackScreen = (): JSX.Element => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name={RouteName.LoginScreen} component={LoginScreen} />
      <AuthStack.Screen name={RouteName.SignUpScreen} component={SignUpScreen} />
      <AuthStack.Screen name={RouteName.PasswordResetScreen} component={PasswordResetScreen} />
    </AuthStack.Navigator>
  );
};
