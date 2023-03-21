import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'tamagui';

import { PasswordResetScreenNavigationProps } from '~/../app/(auth)/PasswordResetScreen';
import { Button } from '~/components/Button';
import { PageContainer } from '~/components/PageContainer';
import { RouteName } from '~/navigation/rootStackParamList';

type Props = {
  navigation: PasswordResetScreenNavigationProps;
  userName: string;
};

/** @package */
export const Complete: FC<Props> = (props) => {
  return (
    <PageContainer title="パスワード変更完了">
      <Text style={styles.text}>パスワード変更が完了が完了いたしました。</Text>
      <Button onPress={() => props.navigation.navigate(RouteName.LoginScreen)}>ログインへ</Button>
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    lineHeight: 21,
  },
});
