import { useTheme } from '@react-navigation/native';
import { Text, View } from 'native-base';
import React from 'react';
import {
  Control,
  Controller,
  DeepMap,
  FieldError,
  FieldValues,
} from 'react-hook-form';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
} from 'react-native';

import { ErrorText } from '~/components/Text';

interface Props extends TextInputProps {
  control: Control<any>;
  defaultValue?: any;
  style?: StyleProp<TextStyle>;
  type: 'email' | 'certificationCode' | 'newEmail';
}

/** @package */
export const ValidationTextInput: React.FC<Props> = (props) => {
  const labelNameBox = {
    certificationCode: 'コードを入力してください',
    email: 'メールアドレス',
    newEmail: 'メールアドレス',
  };
  const placeholderBox = {
    certificationCode: '123456',
    email: 'example@example.com',
    newEmail: 'example@example.com',
  };
  const { colors } = useTheme();
  return (
    <Controller
      control={props.control}
      name={props.type}
      defaultValue={props.defaultValue}
      render={({
        field: { name, onBlur, onChange, value },
        formState: { errors },
      }) => (
        <View mt="4">
          <Text fontWeight="bold" color={colors.text}>
            {labelNameBox[props.type]} <Text color={colors.error}>必須</Text>
          </Text>
          <TextInput
            placeholder={placeholderBox[props.type]}
            style={[styles.input, props.style]}
            value={value || ''}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize="none"
          />
          {/* バリエーションエラー表示 */}
          {errors[name] != null && (
            <ErrorText>
              {(errors[name] as DeepMap<FieldValues, FieldError>)?.message}
            </ErrorText>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
});
