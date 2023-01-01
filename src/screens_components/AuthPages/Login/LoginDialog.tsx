import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { Box, Text } from 'native-base';
import React, { FC, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Button } from '~/components/Button';
import {
  CognitoError,
  ValidationPasswordInput,
  ValidationTextInput,
} from '~/components/Form';
import { PageContainer } from '~/components/PageContainer';
import { LinkText } from '~/components/Text';
import { RouteName } from '~/navigation/rootStackParamList';
import { loginSchema } from '~/schema/schema';
import { LoginScreenNavigationProps } from '~/screens/Auth/LoginScreen';
import { login } from '~/slices/userSlice';
import { AppDispatch } from '~/store';

type LoginInput = {
  email: string;
  password: string;
};

type Props = {
  navigation: LoginScreenNavigationProps;
};

/** @package */
export const LoginDialog: FC<Props> = (props) => {
  const { colors } = useTheme();
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
  });
  const [error, setError] = useState<string | React.ReactNode>('');
  const dispatch: AppDispatch = useDispatch();

  const onError: SubmitErrorHandler<LoginInput> = (errors: any, e: any) =>
    console.log(errors, e);

  const handleLogin: SubmitHandler<LoginInput> = async ({
    email,
    password,
  }) => {
    try {
      dispatch(login(await Auth.signIn({ password, username: email })));
      setError('');
    } catch (err) {
      console.log({ err });
      setError(<CognitoError error={err} />);
    }
  };

  return (
    <PageContainer title="ログイン">
      <ValidationTextInput control={control} type="email" />
      <ValidationPasswordInput control={control} type="password" />
      {error}
      <Text color={colors.text} fontSize="18">
        メールアドレス:scs_lo_ol_728@icloud.com
      </Text>
      <Text color={colors.text} fontSize="18">
        パスワード:12345678
      </Text>
      <Button
        onPress={() => {
          void (async () => {
            await handleSubmit(handleLogin, onError)();
          })();
        }}
        isLoading={isSubmitting}
      >
        ログイン
      </Button>
      <Box py="1" />
      <Button
        onPress={() => props.navigation.navigate(RouteName.SignUpScreen)}
        isWhite={true}
        isNoneMarginTop={true}
      >
        新規登録
      </Button>
      <LinkText
        onPress={() => props.navigation.navigate(RouteName.PasswordResetScreen)}
      >
        パスワードをお忘れの方
      </LinkText>
    </PageContainer>
  );
};
