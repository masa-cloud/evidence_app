import { useTheme } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { useFontColor } from '../lib/useColorStyle';

export default function MyPageScreen(): JSX.Element {
  const { colors } = useTheme();
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1')}>
      <Text style={[tailwind('text-xl font-bold'), useFontColor(colors.text)]}>
        MyPage
      </Text>
    </View>
  );
}
