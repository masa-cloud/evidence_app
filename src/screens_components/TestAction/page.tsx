import { useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Center, Progress, Spacer } from 'native-base';
import React from 'react';

import { LeftIconButton } from '~/components/Button';
import { PageContainer } from '~/components/PageContainer';
import { HomeTabParamList, RouteName } from '~/navigation/rootStackParamList';
import { RadioGroup } from '~/screens_components/TestAction/RadioGroup';

type TestActionScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'TestActionScreen'
>;

type Props = {
  navigation: TestActionScreenNavigationProps;
};

/** @package */
export const TestAction = ({ navigation }: Props): JSX.Element => {
  const { colors } = useTheme();
  // 全16問 (平均解答時間 2分)
  return (
    <PageContainer>
      <Center w="100%">
        <Box w="100%">
          <Progress
            bg={colors.text}
            _filledTrack={{
              bg: colors.primary,
            }}
            value={75}
          />
        </Box>
      </Center>
      <RadioGroup />
      <RadioGroup />
      <RadioGroup />
      <RadioGroup />
      <Spacer size={8} />
      <LeftIconButton
        text="結果を見る"
        onPress={() => navigation.navigate(RouteName.TestResultScreen)}
        iconName="cloud-upload"
      />
    </PageContainer>
  );
};
