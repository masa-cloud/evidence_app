import { useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { useTailwind as tw } from 'tailwind-rn/dist';

import { BottomTabParamList } from '~/navigation/rootStackParamList';

type HistoryScreenNavigationProps = NativeStackNavigationProp<
  BottomTabParamList,
  'HistoryScreen'
>;

type Props = {
  navigation: HistoryScreenNavigationProps;
};

export const HistoryScreen = ({ navigation }: Props): JSX.Element => {
  const { colors } = useTheme();

  return (
    <View style={tw()('flex-1 justify-center')}>
      <Text style={{ color: colors.text }}>History</Text>
    </View>
  );
};
