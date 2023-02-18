// import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from '@stream-io/flat-list-mvcp';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { FC, useCallback, useRef } from 'react';
import { ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Stack } from 'tamagui';

import { Images } from '~/assets/images';
import { fetchAsyncNotes, selectNote } from '~/slices/noteSlice';
import { AppDispatch } from '~/store';
import { Note } from '~/types/types';

import { HomeHeader } from './HomeHeader';
import { NoteCard } from './NoteCard';
import { SideTree } from './SideTree';

// type HomeScreenNavigationProps = NativeStackNavigationProp<
//   HomeTabParamList,
//   'HomeScreen'
// >;

// type Props = {
//   navigation: HomeScreenNavigationProps;
// };

/** @package */
export const Home: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { notes } = useSelector(selectNote);
  const flatListRef = useRef<any>(undefined);

  useFocusEffect(
    useCallback(() => {
      // APIを叩く処理を記述
      const fetchNotes = async (): Promise<void> => {
        try {
          await dispatch(fetchAsyncNotes());
        } catch (e) {
          console.log({ e });
          // Handle error
        }
      };
      void fetchNotes();
    }, [dispatch]),
  );

  // const getOneTodo = async (): Promise<void> => {
  //   // Query using a parameter
  //   const oneTodo = await API.graphql({
  //     query: queries.getTodo,
  //     variables: { id: '246fe283-2c58-4459-8358-ee0ece37a71e' },
  //   });
  //   console.log(oneTodo);
  // };

  const onPress = (height: number): void => {
    flatListRef.current.scrollToOffset({ animated: true, offset: height });
  };

  const renderItem = useCallback(({ item }: { item: Note }): JSX.Element => {
    return <NoteCard note={item} ids={[item.id]} />;
  }, []);

  // TODO:データが無い時のハンドリング
  // if ( notes.length === 0 ) return <></>

  return (
    <SafeAreaView>
      <ImageBackground
        source={Images.background}
        resizeMode="cover"
        style={{ height: '100%', width: '100%' }}
      >
        <HomeHeader />
        <SideTree notes={notes} onNoteNavigate={onPress} />
        <TouchableOpacity
          onPress={() => router.push('/MyPageScreen')}
        ></TouchableOpacity>
        <Stack h={60} />
        <FlatList
          data={notes}
          ref={flatListRef}
          extraData={flatListRef}
          keyExtractor={(item, index) => `item-${item.id}-${index}`}
          renderItem={renderItem}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};
