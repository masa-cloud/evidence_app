import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Text } from 'native-base';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { Images } from '~/assets/images';
import { PageContainer } from '~/components/PageContainer';
import { Title } from '~/components/Title';
import { HomeTabParamList, RouteName } from '~/navigation/rootStackParamList';

import { ItemFlatList } from './ItemFlatList';

type HomeScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'HomeScreen'
>;

type Props = {
  navigation: HomeScreenNavigationProps;
};

/** @package */
export const Home: FC<Props> = (props) => {
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      avatarUrl: Images.doctors,
      fullName: 'テスト',
      recentText: 'コーネル大学',
      timeStamp: '12:47 PM',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      avatarUrl: Images.doctors,
      fullName: 'テスト',
      recentText: 'コーネル大学',
      timeStamp: '11:11 PM',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      avatarUrl: Images.doctors,
      fullName: 'テスト',
      recentText: 'コーネル大学',
      timeStamp: '6:22 PM',
    },
    {
      id: '68694a0f-3da1-431f-bd56-142371e29d72',
      avatarUrl: Images.doctors,
      fullName: 'テスト',
      recentText: 'コーネル大学',
      timeStamp: '8:56 PM',
    },
    {
      id: '28694a0f-3da1-471f-bd96-142456e29d72',
      avatarUrl: Images.doctors,
      fullName: 'テスト',
      recentText: 'コーネル大学',
      timeStamp: '12:47 PM',
    },
  ];
  return (
    <PageContainer>
      <Title title="今週のTOP5" />
      <ItemFlatList data={data} navigation={props.navigation} />
      <TouchableOpacity
        onPress={() => props.navigation.navigate(RouteName.SignUpScreen)}
      >
        <Box py="3">
          <Text color="white">会員登録</Text>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate(RouteName.LoginScreen)}
      >
        <Box py="3">
          <Text color="white">ログイン / ログアウト</Text>
        </Box>
      </TouchableOpacity>
    </PageContainer>
  );
};
