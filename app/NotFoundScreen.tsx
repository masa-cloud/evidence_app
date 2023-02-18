import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '~/navigation/rootStackParamList';
import { NotFound } from '~/screens_components/NotFound';

type NotFoundScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'NotFoundScreen'
>;

type Props = {
  navigation: NotFoundScreenNavigationProps;
};

export default function NotFoundScreen(props: Props): JSX.Element {
  return <NotFound {...props} />;
}
