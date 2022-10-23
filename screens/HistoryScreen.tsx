import { useTheme } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { useFontColor } from '../hooks/useColorStyle';

export default function HistoryScreen(): JSX.Element {
  const tailwind = useTailwind();
  const { colors } = useTheme();

  return (
    <View style={tailwind('flex-1 justify-center')}>
      <Text style={useFontColor(colors.text)}>History</Text>
    </View>
  );
}
