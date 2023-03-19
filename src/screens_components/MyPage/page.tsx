import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import DraggableFlatList, {
  OpacityDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';

const NUM_ITEMS = 10;
function getColor(i: number): string {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

type Item = {
  backgroundColor: string;
  child?: Item[];
  height: number;
  key: string;
  label: string;
  width: number;
};

const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
  const backgroundColor = getColor(index);
  return {
    backgroundColor,
    child: [
      {
        backgroundColor,
        height: 100,
        key: `item-${index}`,
        label: String(index) + '',
        width: 60 + Math.random() * 40,
      },
    ],
    height: 100,
    key: `item-${index}`,
    label: String(index) + '',
    width: 60 + Math.random() * 40,
  };
});

export function MyPage(): JSX.Element {
  const [data, setData] = useState(initialData);

  const renderItem = ({
    drag,
    isActive,
    item,
  }: RenderItemParams<Item>): JSX.Element => {
    return (
      <OpacityDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            { backgroundColor: isActive ? 'red' : item.backgroundColor },
          ]}
        >
          <Text style={styles.text}>{item.label}</Text>
        </TouchableOpacity>
      </OpacityDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={({ data }) => setData(data)}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  rowItem: {
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
