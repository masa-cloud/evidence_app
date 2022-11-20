import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Box, Flex, Icon, Radio, Text } from 'native-base';
import React, { FC } from 'react';

import { Repeat } from '~/components/Repeat';

export const RadioGroupChildren: FC = () => {
  const { colors } = useTheme();
  return (
    <>
      <Box
        backgroundColor={colors.border}
        w="85%"
        left="7.5%"
        position="absolute"
        top="5"
        py="1"
        px="4"
      />
      <Flex
        direction="row"
        w="87%"
        margin="auto"
        alignItems="center"
        justifyContent="space-between"
      >
        <Repeat numTimes={5}>
          {(index: number) => (
            <Radio
              key={index}
              colorScheme={'blue'}
              borderRadius="6"
              size="9"
              value={String(index)}
              icon={
                <Icon
                  as={<MaterialCommunityIcons name="checkbox-marked" />}
                  size="43px"
                />
              }
              my={1}
            />
          )}
        </Repeat>
      </Flex>
      <Flex
        direction="row"
        w="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color={colors.text} fontSize="sm" textAlign="center">
          全く{'\n'}あてはまらない
        </Text>
        <Text color={colors.text} fontSize="sm" mr="4" textAlign="center">
          どちらとも{'\n'}いえない
        </Text>
        <Text color={colors.text} fontSize="sm" mr="2.5" textAlign="center">
          完全に{'\n'}あてはまる
        </Text>
      </Flex>
    </>
  );
};
