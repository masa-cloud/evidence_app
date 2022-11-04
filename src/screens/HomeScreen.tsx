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
import { TouchableOpacity } from 'react-native';

import { Images } from '~/assets/images';
import { HomeTabParamList, RouteName } from '~/navigation/rootStackParamList';

type HomeScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'HomeScreen'
>;

type Props = {
  navigation: HomeScreenNavigationProps;
};

export const HomeScreen = ({ navigation }: Props): JSX.Element => {
  const { colors } = useTheme();
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      avatarUrl: Images.doctors,
      fullName: 'テスト',
      recentText: 'コーネル大学',
      timeStamp: '12:47 PM',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      avatarUrl: Images.doctors,
      fullName: 'テスト',
      recentText: 'コーネル大学',
      timeStamp: '11:11 PM',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      avatarUrl: Images.doctors,
      fullName: 'テスト',
      recentText: 'コーネル大学',
      timeStamp: '6:22 PM',
    },
    {
      id: '68694a0f-3da1-431f-bd56-142371e29d72',
      avatarUrl: Images.doctors,
      fullName: 'テスト',
      recentText: 'コーネル大学',
      timeStamp: '8:56 PM',
    },
    {
      id: '28694a0f-3da1-471f-bd96-142456e29d72',
      avatarUrl: Images.doctors,
      fullName: 'テスト',
      recentText: 'コーネル大学',
      timeStamp: '12:47 PM',
    },
  ];
  return (
    <Box pt="4" px="4">
      <Heading color={colors.text} fontSize="2xl" pb="1">
        今週のTOP5
      </Heading>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(RouteName.TestDetailScreen)}
          >
            <Box py="3">
              <HStack space="4" justifyContent="space-between">
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
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};
