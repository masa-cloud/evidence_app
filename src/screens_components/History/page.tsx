import { useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FC } from 'react';
import { Text, View } from 'react-native';
import { useTailwind as tw } from 'tailwind-rn/dist';

import { i18n } from '~/locale/i18n';
import { BottomTabParamList } from '~/navigation/rootStackParamList';

type HistoryScreenNavigationProps = NativeStackNavigationProp<
  BottomTabParamList,
  'HistoryScreen'
>;

type Props = {
  navigation: HistoryScreenNavigationProps;
};

/** @package */
export const History: FC<Props> = (props) => {
  const { colors } = useTheme();

  return (
    <View style={tw()('flex-1 justify-center')}>
      <Text style={{ color: colors.text }}>{i18n.t('placeholder')}</Text>
    </View>
  );
};
