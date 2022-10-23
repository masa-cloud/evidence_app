import { useTheme } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { RootTabScreenProps } from '../../types';
import { useFontColor } from '../lib/useColorStyle';

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<'Home'>): JSX.Element {
  const { colors } = useTheme();
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1 justify-center')}>
      <Text style={[tailwind('text-xl font-bold'), useFontColor(colors.text)]}>
        Home
      </Text>
      <View style={tailwind('my-8 h-1 w-4/5')} />
    </View>
  );
}
