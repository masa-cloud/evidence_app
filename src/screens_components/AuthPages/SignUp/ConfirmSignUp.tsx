import { yupResolver } from '@hookform/resolvers/yup';
import { Auth } from 'aws-amplify';
import React, { FC, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '~/components/Button';
import { CognitoError, ValidationTextInput } from '~/components/Form';
import { PageContainer } from '~/components/PageContainer';
import { confirmSignUpSchema } from '~/schema/schema';
import { SignUpScreenNavigationProps } from '~/screens/Auth/SignUpScreen';

type ConfirmInput = {
  certificationCode: string;
};

type Props = {
  navigation: SignUpScreenNavigationProps;
  userName: string;
};

/** @package */
export const ConfirmSignUp: FC<Props> = (props) => {
  const [error, setError] = useState<string | React.ReactNode>('');
  // const { updateAuthUser } = useAuth();
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<ConfirmInput>({
    resolver: yupResolver(confirmSignUpSchema),
  });
  const onError: SubmitErrorHandler<ConfirmInput> = (errors: any, e: any) =>
    console.log(errors, e);

  const confirmSignUp: SubmitHandler<ConfirmInput> = async ({
    certificationCode,
  }) => {
    try {
      console.log(props.userName);
      await Auth.confirmSignUp(props.userName, certificationCode);
      setError('');
      // props.navigation.navigate(RouteName.HomeScreen);
    } catch (err) {
      setError(<CognitoError error={err} />);
      console.error({ err });
    }
  };

  return (
    <PageContainer>
      <ValidationTextInput control={control} type="certificationCode" />
      {error}
      <Button
        onPress={() => async () => {
          await handleSubmit(confirmSignUp, onError)();
        }}
        isLoading={isSubmitting}
      >
        送信
      </Button>
    </PageContainer>
  );
};
