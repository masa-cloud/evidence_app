import { yupResolver } from '@hookform/resolvers/yup';
import { Auth } from 'aws-amplify';
import React, { FC, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Text } from 'tamagui';

import { Button } from '~/components/Button';
import {
  CognitoError,
  ValidationPasswordInput,
  ValidationTextInput,
} from '~/components/Form';
import { PageContainer } from '~/components/PageContainer';
import { passwordResetFormSchema } from '~/schema/schema';
import { PasswordResetScreenNavigationProps } from '~/screens/Auth/PasswordResetScreen';

import { PasswordResetState } from './page';

type ConfirmInput = {
  certificationCode: string;
  confirmPassword: string;
  email: string;
  password: string;
};

type Props = {
  navigation: PasswordResetScreenNavigationProps;
  setEmailChangeState: React.Dispatch<React.SetStateAction<PasswordResetState>>;
  userName: string;
};

/** @package */
export const PasswordResetForm: FC<Props> = (props) => {
  const [error, setError] = useState<string | React.ReactNode>('');
  // const { updateAuthUser } = useAuth();
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<ConfirmInput>({
    resolver: yupResolver(passwordResetFormSchema),
  });
  const onError: SubmitErrorHandler<ConfirmInput> = (errors: any, e: any) =>
    console.log(errors, e);

  const confirmEmailChange: SubmitHandler<ConfirmInput> = async ({
    certificationCode,
    confirmPassword,
    email,
    password,
  }) => {
    try {
      if (password !== confirmPassword) {
        return;
      }
      await Auth.forgotPasswordSubmit(email, certificationCode, password);
      props.setEmailChangeState(PasswordResetState.Complete);
      setError('');
    } catch (err) {
      setError(<CognitoError error={err} />);
      console.error({ err });
    }
  };

  return (
    <PageContainer
      title="パスワードのリセット"
      description={`登録されているメールアドレスに認証コードを送信しました。
記載されているコードを入力してください`}
    >
      <Text style={styles.text}></Text>
      <ValidationTextInput control={control} type="email" />
      <ValidationTextInput control={control} type="certificationCode" />
      <ValidationPasswordInput control={control} type="password" />
      <ValidationPasswordInput control={control} type="confirmPassword" />
      {error}
      <Button
        onPress={() => {
          void (async () => {
            await handleSubmit(confirmEmailChange, onError)();
          })();
        }}
        isLoading={isSubmitting}
      >
        送信
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
