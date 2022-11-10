import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Box, Flex, Icon, Radio, Text } from 'native-base';
import React from 'react';

export const RadioGroup = (): JSX.Element => {
  const { colors } = useTheme();

  return (
    <Box mb={6}>
      <Text color={colors.text} ml={3} mb="1" fontSize="3xl" bold>
        Q1
      </Text>
      <Radio.Group
        w="100%"
        size="lg"
        name="exampleGroup"
        accessibilityLabel="pick a choice"
      >
        <Box
          backgroundColor={colors.border}
          w="91%"
          left="4.5%"
          position="absolute"
          top="5"
          py="1"
          px="4"
        />
        <Flex
          direction="row"
          w="94%"
          margin="auto"
          alignItems="center"
          justifyContent="space-between"
        >
          <Radio
            colorScheme={'blue'}
            borderRadius="6"
            size="9"
            value="1"
            icon={
              <Icon
                as={<MaterialCommunityIcons name="checkbox-marked" />}
                size="43px"
              />
            }
            my={1}
          />
          <Radio
            colorScheme={'blue'}
            borderRadius="6"
            size="9"
            value="2"
            icon={
              <Icon
                as={<MaterialCommunityIcons name="checkbox-marked" />}
                size="43px"
              />
            }
            my={1}
          />
          <Radio
            colorScheme={'blue'}
            borderRadius="6"
            size="9"
            value="3"
            icon={
              <Icon
                as={<MaterialCommunityIcons name="checkbox-marked" />}
                size="43px"
              />
            }
            my={1}
          />
          <Radio
            colorScheme={'blue'}
            borderRadius="6"
            size="9"
            value="4"
            icon={
              <Icon
                as={<MaterialCommunityIcons name="checkbox-marked" />}
                size="43px"
              />
            }
            my={1}
          />
          <Radio
            colorScheme={'blue'}
            borderRadius="6"
            size="9"
            value="5"
            icon={
              <Icon
                as={<MaterialCommunityIcons name="checkbox-marked" />}
                size="43px"
              />
            }
            my={1}
          />
        </Flex>
        <Flex
          direction="row"
          w="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text color={colors.text} fontSize="md" textAlign="center">
            全く{'\n'}思わない
          </Text>
          <Text color={colors.text} fontSize="md" textAlign="center">
            どちらとも{'\n'}いえない
          </Text>
          <Text color={colors.text} fontSize="md" textAlign="center">
            とても{'\n'}そう思う
          </Text>
        </Flex>
      </Radio.Group>
    </Box>
  );
};
