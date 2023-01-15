import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

type noteHeight = {
  id: number;
  height: number;
};

type State = {
  noteHeights: noteHeight[];
};

const initialState: State = {
  noteHeights: [{ id: 0, height: 0 }],
};

export const noteHeightSlice = createSlice({
  name: 'noteHeights',
  initialState,
  reducers: {
    updateHeight: (state, action: PayloadAction<Required<noteHeight>>) => {
      const updateNoteHeight = state.noteHeights.find((noteHeight) => {
        return noteHeight.id === action.payload.id;
      });
      if (updateNoteHeight !== undefined) {
        updateNoteHeight.height = action.payload.height;
      } else {
        state.noteHeights.push({
          id: action.payload.id,
          height: action.payload.height,
        });
      }
    },
  },
});

const { updateHeight } = noteHeightSlice.actions;

const selectNoteHeight = (state: RootState): State => state.noteHeight;

export { selectNoteHeight, updateHeight };
export default noteHeightSlice.reducer;
