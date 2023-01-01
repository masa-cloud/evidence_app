import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useState } from 'react';

import { HomeTabParamList } from '~/navigation/rootStackParamList';

import { Complete } from './Complete';
import { Confirm } from './Confirm';
import { EmailChange } from './EmailChange';

export type EmailChangeScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'EmailChangeScreen'
>;

type Props = {
  navigation: EmailChangeScreenNavigationProps;
};

export const enum EmailChangeState {
  EmailChange,
  Confirm,
  Complete,
}

/** @package */
export const EmailChangePage: FC<Props> = (props) => {
  const [emailChangeState, setEmailChangeState] = useState<EmailChangeState>(
    EmailChangeState.EmailChange,
  );

  if (emailChangeState === EmailChangeState.Complete)
    return <Complete navigation={props.navigation} />;
  if (emailChangeState === EmailChangeState.Confirm)
    return (
      <Confirm
        setEmailChangeState={setEmailChangeState}
        navigation={props.navigation}
      />
    );
  return <EmailChange setEmailChangeState={setEmailChangeState} />;
};
