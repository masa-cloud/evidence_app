import { useTheme } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useTailwind as tw } from 'tailwind-rn/dist';

import { useFontColor } from '../lib/useColorStyle';

export default function HistoryScreen(): JSX.Element {
  const { colors } = useTheme();

  return (
    <View style={tw()('flex-1 justify-center')}>
      <Text style={useFontColor(colors.text)}>History</Text>
    </View>
  );
}
