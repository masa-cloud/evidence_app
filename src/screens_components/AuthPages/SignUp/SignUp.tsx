import { yupResolver } from '@hookform/resolvers/yup';
import { Auth } from 'aws-amplify';
import React, { FC, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Spinner } from 'tamagui';

import {
  CognitoError,
  ValidationPasswordInput,
  ValidationTextInput,
} from '~/components/Form';
import { PageContainer } from '~/components/PageContainer';
import { signUpSchema } from '~/schema/schema';

import { SignUpState } from './page';

type SignUpInput = {
  confirmPassword: string;
  email: string;
  password: string;
};

type Props = {
  setSignUpState: React.Dispatch<React.SetStateAction<SignUpState>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
};

/** @package */
export const SignUp: FC<Props> = (props) => {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<SignUpInput>({
    resolver: yupResolver(signUpSchema),
  });
  const [error, setError] = useState<string | React.ReactNode>('');
  const onError: SubmitErrorHandler<SignUpInput> = (errors: any, e: any) =>
    console.log(errors, e);
  const handleSignUp: SubmitHandler<SignUpInput> = async ({
    confirmPassword,
    email,
    password,
  }) => {
    if (password !== confirmPassword) {
      return;
    }
    try {
      const { user } = await Auth.signUp({
        autoSignIn: {
          enabled: true,
        },
        password,
        username: email,
      });
      console.warn({ user });
      setError('');
      props.setSignUpState(SignUpState.Confirm);
      props.setUserName(email);
    } catch (err) {
      console.error({ err });
      setError(<CognitoError error={err} />);
    }
  };

  return (
    <PageContainer>
      <ValidationTextInput control={control} type="email" />
      <ValidationPasswordInput control={control} type="password" />
      <ValidationPasswordInput control={control} type="confirmPassword" />
      {error}
      <Button
        onPress={() => {
          void (async () => {
            await handleSubmit(handleSignUp, onError)();
          })();
        }}
        icon={isSubmitting ? <Spinner size="large" color="$green10" /> : <></>}
      >
        会員登録する
      </Button>
    </PageContainer>
  );
};
