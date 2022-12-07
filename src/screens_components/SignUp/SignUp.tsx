import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { Button } from 'native-base';
import React, { FC, useState } from 'react';
import {
  Control,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { StyleSheet } from 'react-native';

import { CognitoError, ValidationTextInput } from '~/components/Auth';
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
  const { colors } = useTheme();
  const { control, handleSubmit } = useForm<SignUpInput>({
    resolver: yupResolver(signUpSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | React.ReactNode>('');
  const onError: SubmitErrorHandler<SignUpInput> = (errors: any, e: any) =>
    console.log(errors, e);
  const handleSignUp: SubmitHandler<SignUpInput> = async ({
    confirmPassword,
    email,
    password,
  }) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  return (
    <PageContainer>
      <ValidationTextInput
        control={control as unknown as Control<FieldValues>}
        areaName="email"
        label="メールアドレス"
        placeholder="メールアドレス"
        autoCompleteType="email"
        autoCapitalize="none"
      />
      <ValidationTextInput
        control={control as unknown as Control<FieldValues>}
        areaName="password"
        label="パスワード"
        placeholder="パスワード"
        autoCompleteType="password"
        secureTextEntry
      />
      <ValidationTextInput
        control={control as unknown as Control<FieldValues>}
        areaName="confirmPassword"
        label="パスワードの確認"
        placeholder="パスワードの確認"
        autoCompleteType="confirmPassword"
        secureTextEntry
      />
      {error}
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button
        onPress={async () => await handleSubmit(handleSignUp, onError)()}
        isLoading={isLoading}
        // TODO:style簡潔に書く
        _text={{
          color: colors.text,
          fontSize: 16,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          lineHeight: 21,
        }}
        style={styles.button}
      >
        BUTTON
      </Button>
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 8,
    elevation: 3,
    justifyContent: 'center',
    marginTop: 30,
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    marginHorizontal: 100,
    paddingTop: 22,
  },
});
