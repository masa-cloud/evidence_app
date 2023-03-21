import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

type State = {
  focusNote: focusNote;
};

type focusNote = {
  focusChildrenLength: number;
  focusId: string;
  ids: string[];
  level: number;
  levelStock: number;
  orderNumber: number;
  parentId: string | undefined | null;
};

const initialState: State = {
  focusNote: {
    focusChildrenLength: 0,
    focusId: '1',
    ids: [],
    level: 0,
    levelStock: 0,
    orderNumber: 0,
    parentId: undefined,
  },
};

export const focusNoteSlice = createSlice({
  name: 'focusNote',
  initialState,
  reducers: {
    updateFucusId: (state, action: PayloadAction<Omit<focusNote, 'levelStock'>>) => {
      // TODO:最初押したやつが反映されるよに！
      if (state.focusNote.levelStock === 0) {
        state.focusNote.focusId = action.payload.focusId;
        state.focusNote.levelStock = action.payload.level;
        state.focusNote.focusChildrenLength = action.payload.focusChildrenLength;
        state.focusNote.level = action.payload.level;
        state.focusNote.orderNumber = action.payload.orderNumber;
        state.focusNote.ids = action.payload.ids;
        state.focusNote.parentId = action.payload.parentId;
      } else {
        state.focusNote.levelStock--;
      }
    },
  },
});

const { updateFucusId } = focusNoteSlice.actions;

const selectFocusNote = (state: RootState): State => state.focusNote;

export { selectFocusNote, updateFucusId };
export default focusNoteSlice.reducer;
