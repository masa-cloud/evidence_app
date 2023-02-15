import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/types/types-external';

import {
  createBrotherNote,
  createChildNote,
  deleteNoteApi,
  getNotes,
} from '~/api/noteAPI';
import { Note } from '~/types/types';

import type { RootState } from '../store';

type State = {
  notes: Note[];
};

type targetIds = {
  ids: string[];
};

type orderIds = {
  from: number;
  ids: string[];
  to: number;
};

const initialState: State = {
  notes: [],
};

const fetchAsyncNotes = createAsyncThunk('notes/fetchAsyncNotes', async () => {
  const notes = await getNotes().catch((error) => {
    throw error;
  });
  if (notes) {
    return notes;
  } else {
    return initialState.notes;
  }
});

const addBrotherNote = createAsyncThunk<
  { ids: string[]; newNote: Note; orderNumber: number },
  {
    focusLevel: number;
    ids: string[];
    orderNumber: number;
    parentId: string | undefined | null;
  },
  {
    rejectValue: string;
    state: { notes: State };
  }
>('notes/addBrotherNote', async (focusNote) => {
  const newBrotherNotes = await createBrotherNote({ ...focusNote }).catch(
    (error) => {
      throw error;
    },
  );
  if (newBrotherNotes) {
    return newBrotherNotes;
  } else {
    throw new Error('error addBrotherNote');
  }
});

const addChildNote = createAsyncThunk<
  { ids: string[]; newNote: Note },
  { id: string; childrenLength: number; focusLevel: number; ids: string[] },
  {
    rejectValue: string;
    state: { notes: State };
  }
>('notes/addChildNote', async (focusData) => {
  const newChildNote = await createChildNote({ ...focusData }).catch(
    (error) => {
      throw error;
    },
  );
  if (newChildNote) {
    return newChildNote;
  } else {
    throw new Error('error addChildNote');
  }
});

const deleteNote = createAsyncThunk<
  { deletedNote: Note },
  { id: string },
  {
    rejectValue: string;
    state: { notes: State };
  }
>('notes/deleteNote', async (focusData) => {
  const notes = await deleteNoteApi({ ...focusData }).catch((error) => {
    throw error;
  });
  if (notes) {
    return notes;
  } else {
    throw new Error('error addChildNote');
  }
});

export const noteSlice = createSlice({
  name: 'notes',
  extraReducers: (builder) => {
    builder
      .addCase(addBrotherNote.fulfilled, (state, action) => {
        const loopCount: number = action.payload.ids.length - 1;
        const ids: string[] = action.payload.ids;
        const notes: WritableDraft<Note> | undefined = state.notes.find(
          (note) => note.id === ids[loopCount],
        );
        const orderUpdateNote = (
          orderChangeNote: Array<WritableDraft<Note>>,
        ): void => {
          for (const note of orderChangeNote) {
            note.orderNumber = note.orderNumber + 1;
          }
        };
        const addNote = (
          parentNote: WritableDraft<Note>,
          loopCount: number,
        ): void => {
          if (loopCount === 1) {
            if (parentNote.children) {
              const orderChangeNote = parentNote.children.filter(
                (note) =>
                  note !== null &&
                  note.orderNumber >= action.payload.orderNumber + 1,
              );
              parentNote.children.splice(
                action.payload.orderNumber + 1,
                0,
                action.payload.newNote,
              );
              orderUpdateNote(orderChangeNote);
            }
          }
          if (parentNote.children) {
            const childNote = parentNote.children.find(
              (note) => note?.id === ids[loopCount - 1],
            );
            childNote && addNote(childNote, loopCount - 1);
          }
        };
        if (loopCount === 0) {
          const orderChangeNote = state.notes.filter(
            (note) => note.orderNumber >= action.payload.orderNumber + 1,
          );
          state.notes.splice(
            action.payload.orderNumber + 1,
            0,
            action.payload.newNote,
          );
          orderUpdateNote(orderChangeNote);
        } else {
          notes && addNote(notes, loopCount);
        }
      })
      .addCase(addChildNote.fulfilled, (state, action) => {
        const loopCount: number = action.payload.ids.length - 1;
        const ids: string[] = action.payload.ids;
        const notes: WritableDraft<Note> | undefined = state.notes.find(
          (note) => note.id === ids[loopCount],
        );
        const noteDescriptionUpdate = (
          targetNotes: WritableDraft<Note>,
          loopCount: number,
        ): void => {
          if (loopCount === 0) {
            if (targetNotes.children) {
              targetNotes.children.push(action.payload.newNote);
            } else {
              targetNotes.children = [action.payload.newNote];
            }
          }
          // childrenがある場合と無い場合で分ける
          if (targetNotes) {
            const childNote = targetNotes.children?.find(
              (note) => note?.id === ids[loopCount - 1],
            );
            childNote !== null &&
              childNote !== undefined &&
              noteDescriptionUpdate(childNote, loopCount - 1);
          }
          // childrenがある場合と無い場合で分ける
        };
        notes && noteDescriptionUpdate(notes, loopCount);
      })
      .addCase(fetchAsyncNotes.pending, (state) => {
        // TODO:ロードの完了有無追加
        // state.status = 'loading';
      })
      .addCase(fetchAsyncNotes.fulfilled, (state, action) => {
        // TODO:ロードの完了有無追加
        // state.status = 'idle';
        console.log('action', action.payload);
        state.notes = action.payload;
      })
      .addCase(deleteNote.pending, (state) => {
        // TODO:ロードの完了有無追加
        // state.status = 'loading';
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        // TODO:ロードの完了有無追加
        // state.status = 'idle';
        // state.notes = action.payload;
        state.notes = state.notes.filter(
          (note) => note.id !== action.payload.deletedNote.id,
        );
      });
  },
  initialState,
  reducers: {
    updateDescription: (
      state,
      action: PayloadAction<Required<Pick<Note, 'description'>> & targetIds>,
    ) => {
      const loopCount = action.payload.ids.length - 1;
      const ids = action.payload.ids;
      const description = action.payload.description;
      const notes = state.notes.find((note) => note.id === ids[loopCount]);
      const noteDescriptionUpdate = (
        notes: WritableDraft<Note>,
        loopCount: number,
      ): void => {
        if (loopCount === 0) {
          notes.description = description;
        }
        if (notes.children) {
          const childNote = notes.children.find(
            (note) => note.id === ids[loopCount - 1],
          );
          childNote && noteDescriptionUpdate(childNote, loopCount - 1);
        }
      };
      notes && noteDescriptionUpdate(notes, loopCount);
    },
    updateEmoji: (
      state,
      action: PayloadAction<Required<Pick<Note, 'emoji'>> & targetIds>,
    ) => {
      const loopCount = action.payload.ids.length - 1;
      const ids = action.payload.ids;
      const emoji = action.payload.emoji;
      const notes = state.notes.find((note) => note.id === ids[loopCount]);
      const noteEmojiUpdate = (
        notes: WritableDraft<Note>,
        loopCount: number,
      ): void => {
        if (loopCount === 0) {
          notes.emoji = emoji;
        }
        if (notes.children) {
          const childNote = notes.children.find(
            (note) => note.id === ids[loopCount - 1],
          );
          childNote && noteEmojiUpdate(childNote, loopCount - 1);
        }
      };
      notes && noteEmojiUpdate(notes, loopCount);
    },
    updateExpanded: (
      state,
      action: PayloadAction<Required<Pick<Note, 'expanded'>> & targetIds>,
    ) => {
      const loopCount = action.payload.ids.length - 1;
      const ids = action.payload.ids;
      const expanded = action.payload.expanded;
      const notes = state.notes.find((note) => note.id === ids[loopCount]);
      const noteExpandedUpdate = (
        notes: WritableDraft<Note>,
        loopCount: number,
      ): void => {
        if (loopCount === 0) {
          notes.expanded = expanded;
        }
        if (notes.children) {
          const childNote = notes.children.find(
            (note) => note.id === ids[loopCount - 1],
          );
          childNote && noteExpandedUpdate(childNote, loopCount - 1);
        }
      };
      notes && noteExpandedUpdate(notes, loopCount);
    },
    updateOrder: (state, action: PayloadAction<Required<orderIds>>) => {
      const loopCount = action.payload.ids.length - 1;
      const ids = action.payload.ids;
      const notes = state.notes;
      const noteTitleUpdate = (
        targetNote: Array<WritableDraft<Note>>,
        loopCount: number,
        parentNote?: WritableDraft<Note>,
      ): void => {
        if (loopCount === 0) {
          const deleteNote = targetNote.filter((state) => state.id !== ids[0]);
          const insertNote = targetNote.find((state) => state.id === ids[0]);
          if (insertNote !== undefined) {
            deleteNote.splice(action.payload.to, 0, insertNote);
            if (parentNote) {
              parentNote.children = deleteNote;
            } else {
              state.notes = deleteNote;
            }
          }
        } else {
          const parentNote = notes.find((note) => note.id === ids[loopCount]);
          parentNote?.children &&
            noteTitleUpdate(parentNote.children, loopCount - 1, parentNote);
        }
      };
      notes && noteTitleUpdate(notes, loopCount);
    },
    updateTitle: (
      state,
      action: PayloadAction<Required<Pick<Note, 'title'>> & targetIds>,
    ) => {
      const loopCount = action.payload.ids.length - 1;
      const ids = action.payload.ids;
      const title = action.payload.title;
      const notes = state.notes.find((note) => note.id === ids[loopCount]);
      const noteTitleUpdate = (
        notes: WritableDraft<Note>,
        loopCount: number,
      ): void => {
        if (loopCount === 0) {
          notes.title = title;
        }
        const minusLoopCount = loopCount - 1;
        if (notes.children) {
          const childNote = notes.children.find(
            (note) => note.id === ids[minusLoopCount],
          );
          childNote && noteTitleUpdate(childNote, minusLoopCount);
        }
      };
      notes && noteTitleUpdate(notes, loopCount);
    },
  },
});

const {
  updateDescription,
  updateEmoji,
  updateExpanded,
  updateOrder,
  updateTitle,
} = noteSlice.actions;

const selectNote = (state: RootState): State => state.notes;

export {
  addBrotherNote,
  addChildNote,
  deleteNote,
  fetchAsyncNotes,
  selectNote,
  updateDescription,
  updateEmoji,
  updateExpanded,
  updateOrder,
  updateTitle,
};

export default noteSlice.reducer;
