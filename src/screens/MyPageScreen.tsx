import { useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { useTailwind as tw } from 'tailwind-rn/dist';

import { BottomTabParamList } from '~/navigation/rootStackParamList';

type MyPageScreenNavigationProps = NativeStackNavigationProp<
  BottomTabParamList,
  'MyPageScreen'
>;

type Props = {
  navigation: MyPageScreenNavigationProps;
};

// export function MyPageScreen(): JSX.Element {
export const MyPageScreen = ({ navigation }: Props): JSX.Element => {
  const { colors } = useTheme();

  return (
    <View style={tw()('flex-1')}>
      <Text style={[tw()('text-xl font-bold'), { color: colors.text }]}>
        MyPage
      </Text>
    </View>
  );
};
