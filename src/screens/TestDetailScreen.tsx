import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Button, Heading, Icon, Image, Text } from 'native-base';
import React from 'react';

import { Images } from '~/assets/images';
import { HomeTabParamList, RouteName } from '~/navigation/rootStackParamList';

type TestDetailScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'TestDetailScreen'
>;

type Props = {
  navigation: TestDetailScreenNavigationProps;
};

export const TestDetailScreen = ({ navigation }: Props): JSX.Element => {
  const { colors } = useTheme();
  const explain = {
    title: 'VIA強みテスト',
    detail:
      'あなたの強みを○○大学の研究を元に診断します。○○が分かると、○○なメリットがあります。',
    testCount: '16',
    testTime: '2',
  };
  // 全16問 (平均解答時間 2分)
  return (
    <Box pt="4" px="4">
      <Heading color={colors.text} fontSize="2xl" pl="2" pb="4">
        {explain.title}
      </Heading>
      <Text color={colors.text} fontSize="lg" mb="4">
        {`全${explain.testCount}問(平均解答時間${explain.testTime}分)`}
      </Text>
      <Image
        borderRadius={10}
        size="72px"
        source={Images.doctors}
        resizeMode="cover"
        mb="4"
      />
      <Text color={colors.text} fontSize="lg" mb="8">
        {explain.detail}
      </Text>
      <Button
        leftIcon={
          <Icon
            as={FontAwesome}
            name="cloud-upload"
            size={6}
            color={colors.text}
          />
        }
        bgColor={colors.primary}
        onPress={() => navigation.navigate(RouteName.TestActionScreen)}
      >
        <Text color={colors.text} fontSize="lg">
          診断を始める
        </Text>
      </Button>
    </Box>
  );
};
