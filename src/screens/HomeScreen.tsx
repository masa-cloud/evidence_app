import { useTheme } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useTailwind as tw } from 'tailwind-rn/dist';

import { RootTabScreenProps } from '../../types';
import { useFontColor } from '../lib/useColorStyle';

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<'Home'>): JSX.Element {
  const { colors } = useTheme();
  return (
    <View style={tw()('flex-1 justify-center')}>
      <Text style={[tw()('text-xl font-bold'), useFontColor(colors.text)]}>
        Home
      </Text>
      <View style={tw()('my-8 h-1 w-4/5')} />
    </View>
  );
}
