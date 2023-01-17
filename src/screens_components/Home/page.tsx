import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList } from '@stream-io/flat-list-mvcp';
import React, { FC, useCallback, useRef } from 'react';
import { ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Stack } from 'tamagui';

import { Images } from '~/assets/images';
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
