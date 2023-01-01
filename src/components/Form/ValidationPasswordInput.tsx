import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Icon, Text } from 'native-base';
import React, { useState } from 'react';
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
  View,
} from 'react-native';

import { ErrorText } from '~/components/Text';

interface Props extends TextInputProps {
  control: Control<any>;
  defaultValue?: any;
  style?: StyleProp<TextStyle>;
  type: 'password' | 'newPassword' | 'confirmNewPassword' | 'confirmPassword';
}

/** @package */
export const ValidationPasswordInput: React.FC<Props> = (props) => {
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const { colors } = useTheme();
  const labelNameBox = {
    confirmNewPassword: '新しいパスワードの確認',
    confirmPassword: 'パスワードの確認',
    newPassword: '新しいパスワード',
    password: 'パスワード',
  };
  return (
    <Controller
      control={props.control}
      name={props.type}
      defaultValue={props.defaultValue}
      render={({
        field: { name, onBlur, onChange, value },
        formState: { errors },
      }) => (
        <View style={styles.marginTop}>
          <Text fontWeight="bold" color={colors.text}>
            {labelNameBox[props.type]} <Text color={colors.error}>必須</Text>
          </Text>
          <View style={styles.container}>
            <View style={styles.sectionStyle}>
              <TextInput
                placeholder="入力してください"
                secureTextEntry={secureTextEntry}
                style={[styles.input, props.style]}
                value={value || ''}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              <Icon
                onPress={() => setSecureTextEntry((prev) => !prev)}
                as={Ionicons}
                name={secureTextEntry ? 'eye' : 'eye-off'}
                size="8"
                style={styles.imageStyle}
              />
              {/* バリエーションエラー表示 */}
            </View>
          </View>
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
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 38,
  },
  imageStyle: {
    alignItems: 'center',
    height: 50,
    padding: 10,
    resizeMode: 'stretch',
    width: 50,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 25,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  marginTop: {
    marginTop: 16,
  },
  sectionStyle: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
  },
});
