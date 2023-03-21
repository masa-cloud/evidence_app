import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

type noteHeight = {
  id: string;
  contentsHeight: number;
  height: number;
};

type State = {
  noteHeights: noteHeight[];
};

const initialState: State = {
  noteHeights: [],
};

export const noteHeightSlice = createSlice({
  name: 'noteHeights',
  initialState,
  reducers: {
    updateContentsHeight: (state, action: PayloadAction<Required<Omit<noteHeight, 'height'>>>) => {
      const updateNoteHeight = state.noteHeights.find((noteHeight) => {
        return noteHeight.id === action.payload.id;
      });
      if (updateNoteHeight !== undefined) {
        updateNoteHeight.contentsHeight = action.payload.contentsHeight;
      } else {
        state.noteHeights.push({
          id: action.payload.id,
          contentsHeight: action.payload.contentsHeight,
          height: 0,
        });
      }
    },
    updateHeight: (state, action: PayloadAction<Required<Omit<noteHeight, 'contentsHeight'>>>) => {
      const updateNoteHeight = state.noteHeights.find((noteHeight) => {
        return noteHeight.id === action.payload.id;
      });
      if (updateNoteHeight !== undefined) {
        updateNoteHeight.height = action.payload.height;
      } else {
        state.noteHeights.push({
          id: action.payload.id,
          contentsHeight: 0,
          height: action.payload.height,
        });
      }
    },
  },
});

const { updateContentsHeight, updateHeight } = noteHeightSlice.actions;

const selectNoteHeight = (state: RootState): State => state.noteHeight;

export { selectNoteHeight, updateContentsHeight, updateHeight };
export default noteHeightSlice.reducer;
