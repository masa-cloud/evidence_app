import { useTheme } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import EditScreenInfo from '../components/EditScreenInfo';
import { RootTabScreenProps } from '../types';

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<'Home'>): JSX.Element {
  // const { colors } = useTheme();
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1 align-center justify-center')}>
      <Text style={tailwind('text-xl font-bold bg-white text-white')}>
        Tab One
      </Text>
      <View style={tailwind('my-8 h-1 w-4/5')} />
      <EditScreenInfo path="/screens/HomeScreen.tsx" />
    </View>
  );
}
