import React, { FC, useState } from 'react';

import { SignUpScreenNavigationProps } from '~/screens/Auth/SignUpScreen';

import { ConfirmSignUp } from './ConfirmSignUp';
import { SignUp } from './SignUp';

type Props = {
  navigation: SignUpScreenNavigationProps;
};

export const enum SignUpState {
  SignUp,
  Confirm,
}

/** @package */
export const SignUpPage: FC<Props> = (props) => {
  const [userName, setUserName] = useState<string>('');
  const [signUpState, setSignUpState] = useState<SignUpState>(
    SignUpState.SignUp,
  );

  if (signUpState === SignUpState.Confirm)
    return <ConfirmSignUp userName={userName} navigation={props.navigation} />;
  return <SignUp setSignUpState={setSignUpState} setUserName={setUserName} />;
};
