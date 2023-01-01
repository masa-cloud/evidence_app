import React, { FC, useState } from 'react';

import { PasswordChangeScreenNavigationProps } from '~/screens/Auth/PasswordChangeScreen';

import { Complete } from './Complete';
import { PasswordChange } from './PasswordChange';

type Props = {
  navigation: PasswordChangeScreenNavigationProps;
};

export const enum PasswordChangeState {
  PasswordChange,
  Complete,
}

/** @package */
export const PasswordChangePage: FC<Props> = (props) => {
  const [passwordChangeState, setPasswordChangeState] =
    useState<PasswordChangeState>(PasswordChangeState.PasswordChange);

  if (passwordChangeState === PasswordChangeState.Complete)
    return <Complete navigation={props.navigation} />;
  return <PasswordChange setPasswordChangeState={setPasswordChangeState} />;
};
