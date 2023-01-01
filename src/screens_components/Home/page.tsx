import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text } from 'native-base';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { Images } from '~/assets/images';
import { PageContainer } from '~/components/PageContainer';
import { Title } from '~/components/Title';
import { HomeTabParamList, RouteName } from '~/navigation/rootStackParamList';
import { selectUser } from '~/slices/userSlice';

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
  const {
    user: { email },
  } = useSelector(selectUser);
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      avatarUrl: Images.doctors,
      fullName: 'テスト',
      recentText: 'テスト',
      timeStamp: '12:47 PM',
    },
  ];
  return (
    <PageContainer>
      <Title title="今週のTOP5" />
      <ItemFlatList data={data} navigation={props.navigation} />
      <Text color="white">{email}</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate(RouteName.SignUpScreen)}
      >
        <Text py="3" color="white">
          会員登録
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate(RouteName.LoginScreen)}
      >
        <Text py="3" color="white">
          ログイン
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate(RouteName.LogoutScreen)}
      >
        <Text py="3" color="white">
          ログアウト
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(RouteName.PasswordChangeScreen)
        }
      >
        <Text py="3" color="white">
          パスワード変更
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate(RouteName.EmailChangeScreen)}
      >
        <Text py="3" color="white">
          メールアドレス変更
        </Text>
      </TouchableOpacity>
    </PageContainer>
  );
};
