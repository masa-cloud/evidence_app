import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { BottomTabParamList } from '~/navigation/rootStackParamList';
import { History } from '~/screens_components/History';

type HistoryScreenNavigationProps = NativeStackNavigationProp<
  BottomTabParamList,
  'HistoryScreen'
>;

type Props = {
  navigation: HistoryScreenNavigationProps;
};

export const HistoryScreen = (props: Props): JSX.Element => {
  return <History {...props} />;
};
