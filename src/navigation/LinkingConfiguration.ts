/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../../types';

const linking: LinkingOptions<RootStackParamList> = {
  config: {
    screens: {
      Modal: 'modal',
      NotFound: '*',
      Root: {
        screens: {
          History: {
            screens: {
              HistoryScreen: 'history',
            },
          },
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          MyPage: {
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
