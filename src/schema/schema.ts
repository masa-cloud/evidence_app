import * as yup from 'yup';

const email = yup
  .string()
  .label('メールアドレス')
  .lowercase()
  .email('正しいメールアドレスを入力してください。')
  .required('メールアドレスは必須項目です。');

const newEmail = yup
  .string()
  .label('メールアドレス')
  .email(({ label }) => `${label}の形式が正しくありません`)
  .required(({ label }) => `${label}が入力されていません`)
  .test(
    'password-match',
    ({ label }) => `同じ${label}には変更できません`,
    (newEmail, { parent: { email } }) => newEmail !== email,
  );

const cognitoPassword = (name: string, field: string): any[] => [
  yup
    .string()
    .label(name)
    .min(8, `${name}は8文字以上で入力してください。`)
    .max(256, `${name}は256文字以内で入力してください`)
    .required(`${name}が入力されていません`),
  yup
    .string()
    .label(name)
    .required(`${name}が入力されていません`)
    .test('ensure_to_have_text', '', (confirmPassword, { createError, parent }) => {
      if (confirmPassword !== parent[field]) {
        return createError({
          message: `${name}が一致しません。`,
        });
      }
      return true;
    }),
];

const certificationCode: any = yup
  .string()
  .matches(/^.{1,2048}$/, { message: '認証コードの形式が正しくありません。' })
  .required('認証コードが入力されていません。');

const [password, confirmPassword] = cognitoPassword('パスワード', 'password');
const [newPassword, confirmNewPassword] = cognitoPassword('新しいパスワード', 'newPassword');

export const signUpSchema = yup
  .object()
  .shape({
    confirmPassword,
    email,
    password,
  })
  .noUnknown();

export const confirmSignUpSchema = yup
  .object()
  .shape({
    certificationCode,
  })
  .noUnknown();

export const loginSchema = yup
  .object()
  .shape({
    email,
    password,
  })
  .noUnknown();

export const emailChangeSchema = yup
  .object()
  .shape({
    newEmail,
  })
  .noUnknown();

export const passwordResetEmailSchema = yup
  .object()
  .shape({
    email,
  })
  .noUnknown();

export const passwordResetFormSchema = yup
  .object()
  .shape({
    certificationCode,
    confirmPassword,
    email,
    password,
  })
  .noUnknown();

export const passwordChangeSchema = yup
  .object()
  .shape({
    confirmNewPassword,
    newPassword,
    password,
  })
  .noUnknown();

export const confirmEmailChangeSchema = yup.object().shape({
  certificationCode,
});
