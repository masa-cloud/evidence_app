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
import { RouteName } from '~/navigation/rootStackParamList';
import { confirmSignUpSchema } from '~/schema/schema';

import { SignUpScreenNavigationProps } from './page';

type ConfirmInput = {
  certificationCode: string;
};

type Props = {
  navigation: SignUpScreenNavigationProps;
  userName: string;
};

/** @package */
export const ConfirmSignUp: FC<Props> = (props) => {
  const { colors } = useTheme();
  const [error, setError] = useState<string | React.ReactNode>('');
  // const { updateAuthUser } = useAuth();
  const { control, handleSubmit } = useForm<ConfirmInput>({
    resolver: yupResolver(confirmSignUpSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onError: SubmitErrorHandler<ConfirmInput> = (errors: any, e: any) =>
    console.log(errors, e);

  const confirmSignUp: SubmitHandler<ConfirmInput> = async ({
    certificationCode,
  }): Promise<void> => {
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(props.userName, certificationCode);
      setError('');
      props.navigation.navigate(RouteName.HomeScreen);
    } catch (err) {
      setError(<CognitoError error={err} />);
      console.error({ err });
    }
    setIsLoading(false);
  };

  return (
    <PageContainer>
      <ValidationTextInput
        control={control as unknown as Control<FieldValues>}
        areaName="certificationCode"
        label="コードを入力してください"
        placeholder="コードを入力してください"
        autoCompleteType="cer"
        autoCapitalize="none"
      />
      {error}
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button
        onPress={async () => await handleSubmit(confirmSignUp, onError)()}
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
        送信
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
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    lineHeight: 21,
  },
});
