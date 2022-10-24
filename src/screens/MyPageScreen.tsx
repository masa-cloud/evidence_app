import { useTheme } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useTailwind as tw } from 'tailwind-rn/dist';

import { useFontColor } from '../lib/useColorStyle';

export default function MyPageScreen(): JSX.Element {
  const { colors } = useTheme();

  return (
    <View style={tw()('flex-1')}>
      <Text style={[tw()('text-xl font-bold'), useFontColor(colors.text)]}>
        MyPage
      </Text>
    </View>
  );
}
