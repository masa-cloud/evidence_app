import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList } from '@stream-io/flat-list-mvcp';
import { API } from 'aws-amplify';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import { ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Stack } from 'tamagui';

import { Images } from '~/assets/images';
import * as mutations from '~/graphql/mutations';
import * as queries from '~/graphql/queries';
import { HomeTabParamList, RouteName } from '~/navigation/rootStackParamList';
import { selectNote } from '~/slices/noteSlice';
import { Notes } from '~/types/types';

import { HomeHeader } from './HomeHeader';
import { NoteCard } from './NoteCard';
import { SideTree } from './SideTree';

type HomeScreenNavigationProps = NativeStackNavigationProp<
  HomeTabParamList,
  'HomeScreen'
>;

type Props = {
  navigation: HomeScreenNavigationProps;
};

/** @package */
export const Home: FC<Props> = (props) => {
  // const dispatch: AppDispatch = useDispatch();
  const { notes } = useSelector(selectNote);
  const flatListRef = useRef<any>(undefined);
  const todoDetails = {
    name: 'Todo 1',
    description: 'Learn AWS AppSync',
  };
  const deleteTodoDetails = {
    id: 'some_id',
  };

  const addTodo = async (): Promise<void> => {
    const newTodo = await API.graphql({
      query: mutations.createTodo,
      variables: { input: todoDetails },
    });
    console.log({ newTodo });
  };

  const deleteTodo = async (): Promise<void> => {
    const deletedTodo = await API.graphql({
      query: mutations.deleteTodo,
      variables: { input: deleteTodoDetails },
    });
    console.log({ deletedTodo });
  };

  const getAllTodo = async (): Promise<void> => {
    const allTodos = await API.graphql({ query: queries.listTodos });
    console.log(allTodos);
  };

  const getOneTodo = async (): Promise<void> => {
    // Query using a parameter
    const oneTodo = await API.graphql({
      query: queries.getTodo,
      variables: { id: '246fe283-2c58-4459-8358-ee0ece37a71e' },
    });
    console.log(oneTodo);
  };

  useEffect(() => {
    void getAllTodo();
  }, []);
  const onPress = (height: number): void => {
    flatListRef.current.scrollToOffset({ animated: true, offset: height });
  };

  const renderItem = useCallback(({ item }: { item: Notes }): JSX.Element => {
    return <NoteCard note={item} ids={[item.id]} />;
  }, []);

  return (
    <SafeAreaView>
      <ImageBackground
        source={Images.background}
        resizeMode="cover"
        style={{ height: '100%', width: '100%' }}
      >
        <SideTree notes={notes} onNoteNavigate={onPress} />
        <TouchableOpacity
          onPress={() => props.navigation.navigate(RouteName.MyPageScreen)}
        ></TouchableOpacity>
        <Stack h={2} />
        <FlatList
          data={notes}
          ref={flatListRef}
          extraData={flatListRef}
          keyExtractor={(item, index) => `item-${item.id}-${index}`}
          renderItem={renderItem}
        />
        <HomeHeader />
      </ImageBackground>
    </SafeAreaView>
  );
};
