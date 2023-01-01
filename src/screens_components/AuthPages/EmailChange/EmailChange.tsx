import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { Text } from 'native-base';
import React, { FC, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '~/components/Button';
import { CognitoError, ValidationTextInput } from '~/components/Form';
import { PageContainer } from '~/components/PageContainer';
import { emailChangeSchema } from '~/schema/schema';
import { emailChange, selectUser } from '~/slices/userSlice';
import { AppDispatch } from '~/store';

import { EmailChangeState } from './page';

type EmailChangeInput = {
  newEmail: string;
};

type Props = {
  setEmailChangeState: React.Dispatch<React.SetStateAction<EmailChangeState>>;
};

/** @package */
export const EmailChange: FC<Props> = (props) => {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<EmailChangeInput>({
    resolver: yupResolver(emailChangeSchema),
  });
  const { colors } = useTheme();
  const {
    user: { email },
  } = useSelector(selectUser);
  const [error, setError] = useState<string | React.ReactNode>('');
  const dispatch: AppDispatch = useDispatch();
  const onError: SubmitErrorHandler<EmailChangeInput> = (errors: any, e: any) =>
    console.log(errors, e);

  const handleSignUp: SubmitHandler<EmailChangeInput> = async ({
    newEmail,
  }) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, {
        email: newEmail,
      });
      setError('');
      dispatch(emailChange({ email: newEmail }));
      props.setEmailChangeState(EmailChangeState.Confirm);
    } catch (err) {
      console.error({ err });
      setError(<CognitoError error={err} />);
    }
  };

  return (
    <PageContainer title="メールアドレスの変更">
      <Text fontSize="20" fontWeight="bold" color={colors.text}>
        現在のメールアドレス
      </Text>
      <Text mt="2" mb="4" color={colors.text}>
        {email}
      </Text>
      <ValidationTextInput control={control} type="newEmail" />
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
