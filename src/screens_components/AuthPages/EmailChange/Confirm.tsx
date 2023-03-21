import { yupResolver } from '@hookform/resolvers/yup';
import { Auth } from 'aws-amplify';
import React, { FC, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '~/components/Button';
import { CognitoError, ValidationTextInput } from '~/components/Form';
import { PageContainer } from '~/components/PageContainer';
import { confirmEmailChangeSchema } from '~/schema/schema';

import { EmailChangeScreenNavigationProps, EmailChangeState } from './page';

type ConfirmInput = {
  certificationCode: string;
};

type Props = {
  navigation: EmailChangeScreenNavigationProps;
  setEmailChangeState: React.Dispatch<React.SetStateAction<EmailChangeState>>;
};

/** @package */
export const Confirm: FC<Props> = (props) => {
  const [error, setError] = useState<string | React.ReactNode>('');
  // const { updateAuthUser } = useAuth();
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<ConfirmInput>({
    resolver: yupResolver(confirmEmailChangeSchema),
  });
  const onError: SubmitErrorHandler<ConfirmInput> = (errors: any, e: any) => console.log(errors, e);

  const confirmEmailChange: SubmitHandler<ConfirmInput> = async ({ certificationCode }) => {
    try {
      await Auth.verifyCurrentUserAttributeSubmit('email', certificationCode);
      props.setEmailChangeState(EmailChangeState.Complete);
      setError('');
    } catch (err) {
      setError(<CognitoError error={err} />);
      console.error({ err });
    }
  };

  return (
    <PageContainer
      title="認証コード入力"
      description={`新しいメールアドレスに認証コードを送信しました。
記載されているコードを入力してください。`}
    >
      <ValidationTextInput control={control} type="certificationCode" />
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
