import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { width } from '~/lib/constants';

import type { RootState } from '../store';

type State = {
  position:
    | {
        pressStyle?: never;
        x: number;
        y: number;
      }
    | {
        pressStyle: {
          scale: number;
        };
        x: number;
        y: number;
      }
    | undefined;
};

const initialState: State = {
  position: {
    x: width,
    y: 0,
  },
};

export const sideTreeSlice = createSlice({
  name: 'sideTree',
  initialState,
  reducers: {
    updatePosition: (state, action: PayloadAction<Required<Pick<State, 'position'>>>) => {
      state.position = action.payload.position;
    },
  },
});

const { updatePosition } = sideTreeSlice.actions;

const selectSideTree = (state: RootState): State => state.sideTree;

export { selectSideTree, updatePosition };
export default sideTreeSlice.reducer;
