/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Modal: undefined;
  NotFoundScreen: undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
};

export type BottomTabParamList = {
  HistoryScreen: undefined;
  HomeScreen: undefined;
  MyPageScreen: undefined;
};

export type RootTabParamList = {
  HistoryScreen: undefined;
  HomeScreen: undefined;
  MyPageScreen: undefined;
};

export type HomeTabParamList = {
  HomeScreen: undefined;
  TestActionScreen: undefined;
  TestDetailScreen: undefined;
  TestResultScreen: { answers: string[] };
};

export enum RouteName {
  HistoryScreen = 'HistoryScreen',
  TestDetailScreen = 'TestDetailScreen',
  TestActionScreen = 'TestActionScreen',
  TestResultScreen = 'TestResultScreen',
  HomeScreen = 'HomeScreen',
  Modal = 'Modal',
  MyPageScreen = 'MyPageScreen',
  NotFoundScreen = 'NotFoundScreen',
  Root = 'Root',
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
