/* eslint-disable no-void */
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { Button, Text } from 'native-base';
import React, { FC, useCallback, useState } from 'react';
import {
  Control,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { CognitoError, ValidationTextInput } from '~/components/Auth';
import { PageContainer } from '~/components/PageContainer';
import { RouteName } from '~/navigation/rootStackParamList';
import { loginSchema } from '~/schema/schema';
import { login, logout } from '~/slices/userSlice';
import { AppDispatch } from '~/store';

import { LoginScreenNavigationProps } from './page';

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
  const { control, handleSubmit } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | React.ReactNode>('');
  const dispatch: AppDispatch = useDispatch();
  const cognitoLogout = useCallback(() => {
    return dispatch(logout());
  }, [dispatch]);
  const onError: SubmitErrorHandler<LoginInput> = (errors: any, e: any) =>
    console.log(errors, e);
  const handleLogin: SubmitHandler<LoginInput> = async ({
    email,
    password,
  }) => {
    setIsLoading(true);
    try {
      dispatch(login(await Auth.signIn({ password, username: email })));
      setError('');
      props.navigation.navigate(RouteName.HomeScreen);
      // TODO:ログイン完了したらHOMEに遷移
    } catch (err) {
      console.log({ err });
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
      {error}
      <Button
        onPress={() =>
          void (async () => {
            await handleSubmit(handleLogin, onError)();
          })()
        }
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
        <Text>BUTTON</Text>
      </Button>
      <Text color={colors.text} fontSize="18">
        メールアドレス:scs_lo_ol_728+3@icloud.com
      </Text>
      <Text color={colors.text} fontSize="18">
        パスワード:12345678
      </Text>
      <Button
        onPress={() =>
          void (async () => {
            await cognitoLogout();
          })()
        }
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
        <Text>ログアウト</Text>
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
