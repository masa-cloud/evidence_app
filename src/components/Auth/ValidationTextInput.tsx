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
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import { ErrorText } from '../Text';

interface Props extends TextInputProps {
  areaName: string;
  autoCompleteType: string;
  control: Control<any>;
  defaultValue?: any;
  label: string;
  style?: StyleProp<TextStyle>;
}

/** @package */
export const ValidationTextInput: React.FC<Props> = ({
  areaName,
  control,
  defaultValue,
  style,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={areaName}
      defaultValue={defaultValue}
      render={({
        field: { name, onBlur, onChange, value },
        formState: { errors },
      }) => (
        <View>
          <TextInput
            // このpropsにautoCompleteTypeなど諸々乗っかってくる
            {...props}
            style={[styles.input, style]}
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            value={value || ''}
            onBlur={onBlur}
            onChangeText={onChange}
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
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
});
