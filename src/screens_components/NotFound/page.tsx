import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { PageContainer } from '~/components/PageContainer';
import { RootStackParamList } from '~/navigation/rootStackParamList';

type NotFoundScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'NotFoundScreen'
>;

type Props = {
  navigation: NotFoundScreenNavigationProps;
};

/** @package */
export const NotFound: FC<Props> = (props) => {
  return (
    <PageContainer>
      <Text style={styles.title}>This screen doesn&apos;t exist.</Text>
      <TouchableOpacity
        onPress={() => props.navigation.replace('Root')}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    color: '#2e78b7',
    fontSize: 14,
  },
});
