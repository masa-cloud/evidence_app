import * as yup from 'yup';

const email = yup
  .string()
  .lowercase()
  .email('正しいメールアドレスを入力してください。')
  .required('メールアドレスは必須項目です。');

const cognitoPassword = (name: string, field: string): any[] => [
  yup
    .string()
    .min(8, `${name}は8文字以上で入力してください。`)
    .max(256, `${name}は256文字以内で入力してください`)
    .required(`${name}が入力されていません`),
  yup
    .string()
    .required(`${name}が入力されていません`)
    .test(
      'ensure_to_have_text',
      '',
      (confirmPassword, { createError, parent }) => {
        if (confirmPassword !== parent[field]) {
          return createError({
            message: `${name}が一致しません。`,
          });
        }
        return true;
      },
    ),
];

const certificationCode: any = yup
  .string()
  .matches(/^.{1,2048}$/, { message: '認証コードの形式が正しくありません。' })
  .required('認証コードが入力されていません。');

const [password, confirmPassword] = cognitoPassword('パスワード', 'password');

export const signUpSchema = yup.object().shape({
  confirmPassword,
  email,
  password,
});

export const confirmSignUpSchema = yup.object().shape({
  certificationCode,
});

export const loginSchema = yup.object().shape({
  email,
  password,
});
