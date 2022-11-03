import { useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Box,
  FlatList,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import React from 'react';

import { Images } from '~/assets/images';
import { HomeTabParamList } from '~/navigation/rootStackParamList';

type TestDetailScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'TestDetailScreen'
>;

type Props = {
  navigation: TestDetailScreenNavigationProps;
};

export const TestDetailScreen = ({ navigation }: Props): JSX.Element => {
  const { colors } = useTheme();
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      avatarUrl: Images.doctors,
      fullName: '自分の長所を測るVIA強みテスト',
      recentText: 'コーネル大学',
      timeStamp: '12:47 PM',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      avatarUrl: Images.doctors,
      fullName: '自分の長所を測るVIA強みテスト',
      recentText: 'コーネル大学',
      timeStamp: '11:11 PM',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      avatarUrl: Images.doctors,
      fullName: '自分の長所を測るVIA強みテスト',
      recentText: 'コーネル大学',
      timeStamp: '6:22 PM',
    },
    {
      id: '68694a0f-3da1-431f-bd56-142371e29d72',
      avatarUrl: Images.doctors,
      fullName: '自分の長所を測るVIA強みテスト',
      recentText: 'コーネル大学',
      timeStamp: '8:56 PM',
    },
    {
      id: '28694a0f-3da1-471f-bd96-142456e29d72',
      avatarUrl: Images.doctors,
      fullName: '自分の長所を測るVIA強みテスト',
      recentText: 'コーネル大学',
      timeStamp: '12:47 PM',
    },
  ];
  return (
    <Box>
      <Heading color={colors.text} fontSize="2xl" pl="2" py="3">
        今週のTOP5
      </Heading>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Box pl={['2', '4']} pr={['0', '5']} py="1">
            <HStack space={[5, 3]} justifyContent="space-between">
              <Image
                borderRadius={10}
                size="72px"
                source={item.avatarUrl}
                resizeMode="cover"
              />
              <VStack>
                <Text color={colors.text} bold fontSize="lg">
                  {item.fullName}
                </Text>
                <Text color={colors.text} bold fontSize="md">
                  {item.recentText}
                </Text>
              </VStack>
              <Spacer />
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};
