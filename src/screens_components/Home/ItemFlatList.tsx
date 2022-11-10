import { useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Box,
  FlatList,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { HomeTabParamList, RouteName } from '~/navigation/rootStackParamList';

type HomeScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'HomeScreen'
>;

type Props = {
  data: Array<{
    id: string;
    avatarUrl: any;
    fullName: string;
    recentText: string;
    timeStamp: string;
  }>;
  navigation: HomeScreenNavigationProps;
};

/** @package */
export const ItemFlatList = (props: Props): JSX.Element => {
  const { colors } = useTheme();
  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => props.navigation.navigate(RouteName.TestDetailScreen)}
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
  );
};
