import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HistoryScreen } from '~/screens/HistoryScreen';

import { RouteName } from './rootStackParamList';

const HistoryStack = createNativeStackNavigator();
export const HistoryStackScreen = (): JSX.Element => {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen
        name={RouteName.HistoryScreen}
        component={HistoryScreen}
      />
    </HistoryStack.Navigator>
  );
};
