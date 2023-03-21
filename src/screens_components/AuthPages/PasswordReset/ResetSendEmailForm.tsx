import { yupResolver } from '@hookform/resolvers/yup';
import { Auth } from 'aws-amplify';
import React, { FC, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Text } from 'tamagui';

import { Button } from '~/components/Button';
import { CognitoError, ValidationTextInput } from '~/components/Form';
import { PageContainer } from '~/components/PageContainer';
import { passwordResetEmailSchema } from '~/schema/schema';

import { PasswordResetState } from './page';

type EmailChangeInput = {
  email: string;
};

type Props = {
  setEmailChangeState: React.Dispatch<React.SetStateAction<PasswordResetState>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
};

/** @package */
export const ResetSendEmailForm: FC<Props> = (props) => {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<EmailChangeInput>({
    resolver: yupResolver(passwordResetEmailSchema),
  });
  const [error, setError] = useState<string | React.ReactNode>('');
  const onError: SubmitErrorHandler<EmailChangeInput> = (errors: any, e: any) => console.log(errors, e);
  const handleSignUp: SubmitHandler<EmailChangeInput> = async ({ email }) => {
    try {
      await Auth.forgotPassword(email);
      setError('');
      props.setEmailChangeState(PasswordResetState.PasswordResetForm);
    } catch (err) {
      console.error({ err });
      setError(<CognitoError error={err} />);
    }
  };

  return (
    <PageContainer
      title="パスワードのリセット"
      description={`パスワードを忘れた方、パスワードを変更したい型は登録のメールアドレスを入力して、パスワードリセットコードを受け取ってください。`}
    >
      <Text style={styles.text}></Text>
      <ValidationTextInput control={control} type="email" />
      {error}
      <Button
        onPress={() => {
          void (async () => {
            await handleSubmit(handleSignUp, onError)();
          })();
        }}
        isLoading={isSubmitting}
      >
        リセットコードを送る
      </Button>
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
