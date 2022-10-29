import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import React from 'react';

import { HistoryScreen } from '~/screens/HistoryScreen';
import { HomeScreen } from '~/screens/HomeScreen';
import { MyPageScreen } from '~/screens/MyPageScreen';

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

  return (
    <BottomTab.Navigator
      initialRouteName={RouteName.HomeScreen}
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <BottomTab.Screen
        name={RouteName.HomeScreen}
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name={RouteName.HistoryScreen + 'Stack'}
        component={HistoryScreen}
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="list-ul" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name={RouteName.MyPageScreen + 'Stack'}
        component={MyPageScreen}
        options={{
          title: 'MyPage',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};
