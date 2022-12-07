import React, { FC, ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = {
  children: ReactNode;
};

/** @package */
export const ErrorText: FC<Props> = (props) => {
  return <Text style={styles.text}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: 'red',
  },
});
