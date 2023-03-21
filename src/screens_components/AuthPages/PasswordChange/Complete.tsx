import React, { FC } from 'react';

import { PasswordChangeScreenNavigationProps } from '~/../app/(auth)/PasswordChangeScreen';
import { Button } from '~/components/Button';
import { PageContainer } from '~/components/PageContainer';
import { RouteName } from '~/navigation/rootStackParamList';

type Props = {
  navigation: PasswordChangeScreenNavigationProps;
};

/** @package */
export const Complete: FC<Props> = (props) => {
  return (
    <PageContainer title="パスワード変更完了" description="パスワード変更が完了いたしました。トップページに戻ってください">
      <Button onPress={() => props.navigation.navigate(RouteName.HomeScreen)}>トップページに戻る</Button>
    </PageContainer>
  );
};
