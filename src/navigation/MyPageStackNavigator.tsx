import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MyPageScreen } from '~/../app/MyPageScreen';

import { RouteName } from './rootStackParamList';

const MyPageStack = createNativeStackNavigator();
export const MyPageStackScreen = (): JSX.Element => {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen name={RouteName.MyPageScreen} component={MyPageScreen} />
    </MyPageStack.Navigator>
  );
};
