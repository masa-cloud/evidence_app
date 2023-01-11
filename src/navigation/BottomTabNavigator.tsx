import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '~/slices/userSlice';

import { AuthStackScreen } from './AuthStackNavigator';
import { HomeStackScreen } from './HomeStackNavigator';
import { RouteName } from './rootStackParamList';

const BottomTab = createBottomTabNavigator();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}): JSX.Element {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export const BottomTabNavigator = (): JSX.Element => {
  const { colors } = useTheme();
  const {
    user: { isLogin },
  } = useSelector(selectUser);

  return (
    <BottomTab.Navigator
      initialRouteName={RouteName.HomeScreen}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: { display: isLogin ? 'none' : 'flex' },
      }}
    >
      {isLogin ? (
        <BottomTab.Screen
          name={RouteName.HomeScreen + 'Stack'}
          component={HomeStackScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
      ) : (
        <BottomTab.Screen
          name={RouteName.LoginScreen + 'Stack'}
          component={AuthStackScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
      )}
    </BottomTab.Navigator>
  );
};
