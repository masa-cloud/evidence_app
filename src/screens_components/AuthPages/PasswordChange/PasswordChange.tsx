import { yupResolver } from '@hookform/resolvers/yup';
import { Auth } from 'aws-amplify';
import React, { FC, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '~/components/Button';
import { CognitoError, ValidationPasswordInput } from '~/components/Form';
import { PageContainer } from '~/components/PageContainer';
import { passwordChangeSchema } from '~/schema/schema';

import { PasswordChangeState } from './page';

type PasswordChangeInput = {
  confirmNewPassword: string;
  newPassword: string;
  password: string;
};

type Props = {
  setPasswordChangeState: React.Dispatch<React.SetStateAction<PasswordChangeState>>;
};

/** @package */
export const PasswordChange: FC<Props> = (props) => {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<PasswordChangeInput>({
    resolver: yupResolver(passwordChangeSchema),
  });
  const [error, setError] = useState<string | React.ReactNode>('');
  const onError: SubmitErrorHandler<PasswordChangeInput> = (errors: any, e: any) => console.log(errors, e);
  const handleSignUp: SubmitHandler<PasswordChangeInput> = async ({ confirmNewPassword, newPassword, password }) => {
    if (newPassword !== confirmNewPassword) {
      return;
    }
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, password, newPassword);
      setError('');
      props.setPasswordChangeState(PasswordChangeState.Complete);
    } catch (err) {
      console.error({ err });
      setError(<CognitoError error={err} />);
    }
  };

  return (
    <PageContainer title="パスワードの変更">
      <ValidationPasswordInput control={control} type="password" />
      <ValidationPasswordInput control={control} type="newPassword" />
      <ValidationPasswordInput control={control} type="confirmNewPassword" />
      {error}
      <Button
        onPress={() => {
          void (async () => {
            await handleSubmit(handleSignUp, onError)();
          })();
        }}
        isLoading={isSubmitting}
      >
        確認画面
      </Button>
    </PageContainer>
  );
};
