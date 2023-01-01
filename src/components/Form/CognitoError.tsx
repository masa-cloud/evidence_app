import React from 'react';

import { ErrorText } from '../Text';

/** @package */
export const CognitoError = ({
  email,
  error: err,
}: {
  email?: string;
  error: any;
}): JSX.Element => {
  switch (err.code) {
    // TODO:エラーメッセージ整理
    case 'UserNotFoundException':
    case 'NotAuthorizedException':
      return (
        <ErrorText>
          メールアドレスまたはパスワードをもう一度入力してください。
        </ErrorText>
      );
    case 'UsernameExistsException':
      return (
        <ErrorText>
          既に登録されているメールアドレスです。こちらからログインしてください。
        </ErrorText>
      );
  }
  return <ErrorText>予期せぬエラーが発生しました。</ErrorText>;
};
