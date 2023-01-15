import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useCallback, useRef } from 'react';
import { ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { Stack } from 'tamagui';

import { Images } from '~/assets/images';
import { HomeTabParamList, RouteName } from '~/navigation/rootStackParamList';
import { selectNote, updateOrder } from '~/slices/noteSlice';
import { AppDispatch } from '~/store';
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
  const dispatch: AppDispatch = useDispatch();
  const { notes } = useSelector(selectNote);
  const flatListRef = useRef<any>(undefined);

  const onPress = (height: number): void => {
    flatListRef.current.scrollToOffset({ animated: true, offset: height });
  };

  const renderItem = useCallback(
    ({ drag, isActive, item }: RenderItemParams<Notes>): JSX.Element => {
      return (
        <ScaleDecorator>
          <TouchableOpacity onLongPress={drag} disabled={isActive}>
            <NoteCard note={item} ids={[item.id]} />
          </TouchableOpacity>
        </ScaleDecorator>
      );
    },
    [],
  );

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
        <DraggableFlatList
          data={notes}
          ref={flatListRef}
          activationDistance={10}
          onDragEnd={({ data, from, to }) => {
            // setStateNotes(data)
            const id = data[to]?.id;
            if (id !== undefined) {
              dispatch(updateOrder({ from, ids: [id], to }));
            }
          }}
          extraData={flatListRef}
          keyExtractor={(item, index) => `item-${item.id}-${index}`}
          renderItem={renderItem}
        />
        <HomeHeader />
      </ImageBackground>
    </SafeAreaView>
  );
};
