import React, { FC, useState } from 'react';

import { PasswordResetScreenNavigationProps } from '~/../app/(auth)/PasswordResetScreen';

import { Complete } from './Complete';
import { PasswordResetForm } from './PasswordResetForm';
import { ResetSendEmailForm } from './ResetSendEmailForm';

type Props = {
  navigation: PasswordResetScreenNavigationProps;
};

export const enum PasswordResetState {
  ResetSendEmailForm,
  PasswordResetForm,
  Complete,
}

/** @package */
export const PasswordResetPage: FC<Props> = (props) => {
  const [userName, setUserName] = useState<string>('');
  const [emailChangeState, setEmailChangeState] = useState<PasswordResetState>(
    PasswordResetState.ResetSendEmailForm,
  );

  if (emailChangeState === PasswordResetState.Complete)
    return <Complete userName={userName} navigation={props.navigation} />;
  if (emailChangeState === PasswordResetState.PasswordResetForm)
    return (
      <PasswordResetForm
        setEmailChangeState={setEmailChangeState}
        userName={userName}
        navigation={props.navigation}
      />
    );
  return (
    <ResetSendEmailForm
      setEmailChangeState={setEmailChangeState}
      setUserName={setUserName}
    />
  );
};
