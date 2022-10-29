/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from './rootStackParamList';

const linking: LinkingOptions<RootStackParamList> = {
  config: {
    screens: {
      Modal: 'modal',
      NotFoundScreen: '*',
      Root: {
        screens: {
          HistoryScreen: {
            screens: {
              HistoryScreen: 'history',
            },
          },
          HomeScreen: {
            screens: {
              HomeScreen: 'home',
            },
          },
          MyPageScreen: {
            screens: {
              MyPageScreen: 'myPage',
            },
          },
        },
      },
    },
  },
  prefixes: [Linking.createURL('/')],
};

export default linking;
