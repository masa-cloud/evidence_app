import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box } from 'native-base';
import React, { FC } from 'react';
import { ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';

import { Images } from '~/assets/images';
import { HomeTabParamList, RouteName } from '~/navigation/rootStackParamList';
import { selectNote, updateOrder } from '~/slices/noteSlice';
import { AppDispatch } from '~/store';
import { Notes } from '~/types/types';

import { HomeHeader } from './HomeHeader';
import { NoteCard } from './NoteCard';

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
  // const [stateNotes, setStateNotes] = useState(notes)

  const renderItem = ({
    drag,
    isActive,
    item,
  }: RenderItemParams<Notes>): JSX.Element => {
    return (
      <ScaleDecorator>
        <TouchableOpacity onLongPress={drag} disabled={isActive}>
          <NoteCard note={item} ids={[item.id]} />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={Images.background}
        resizeMode="cover"
        style={{ height: '100%', width: '100%' }}
      >
        <HomeHeader />
        <TouchableOpacity
          onPress={() => props.navigation.navigate(RouteName.MyPageScreen)}
        ></TouchableOpacity>
        <Box h="2" />
        {
          // TODO:key一位なkeyになるように修正
          // return <NoteCard key={index} note={note} ids={[note.id]}/>
          <DraggableFlatList
            data={notes}
            activationDistance={10}
            onDragEnd={({ data, from, to }) => {
              // setStateNotes(data)
              const id = data[to]?.id;
              if (id !== undefined) {
                dispatch(updateOrder({ from, ids: [id], to }));
              }
            }}
            keyExtractor={(item) => `item-${item.id}`}
            renderItem={renderItem}
          />
        }
      </ImageBackground>
    </SafeAreaView>
  );
};
