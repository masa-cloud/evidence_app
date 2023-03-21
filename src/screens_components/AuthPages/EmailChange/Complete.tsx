import React, { FC } from 'react';

import { Button } from '~/components/Button';
import { PageContainer } from '~/components/PageContainer';
import { RouteName } from '~/navigation/rootStackParamList';

import { EmailChangeScreenNavigationProps } from './page';

type Props = {
  navigation: EmailChangeScreenNavigationProps;
};

/** @package */
export const Complete: FC<Props> = (props) => {
  return (
    <PageContainer
      title="メールアドレス変更完了"
      description={`メールアドレス変更が完了いたしました。
トップページに戻ってください。`}
    >
      <Button onPress={() => props.navigation.navigate(RouteName.HomeScreen)}>トップページに戻る</Button>
    </PageContainer>
  );
};
