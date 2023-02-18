import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/types/types-external';

import { UpdateNoteInput } from '~/API';
import {
  createBrotherNote,
  createChildNote,
  createEmojiApi,
  deleteNoteApi,
  getNotes,
  updateEmojiApi,
  updateNoteApi,
} from '~/api/noteAPI';
import { FetchEmoji, Note } from '~/types/types';

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

// === START CREATE ===
const addEmoji = createAsyncThunk<
  { ids: string[]; newEmoji: FetchEmoji },
  {
    emoji: string;
    ids: string[];
  },
  {
    rejectValue: string;
    state: { notes: State };
  }
>('notes/addEmoji', async (focusData) => {
  const newChildNote = await createEmojiApi({ ...focusData }).catch((error) => {
    throw error;
  });
  if (newChildNote) {
    return newChildNote;
  } else {
    throw new Error('error addChildNote');
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
}); // === END CREATE ===
// === START READ
const fetchAsyncNotes = createAsyncThunk('notes/fetchAsyncNotes', async () => {
  const notes = await getNotes().catch((error) => {
    throw error;
  });
  if (notes) {
    return notes;
  } else {
    return initialState.notes;
  }
}); // === END READ ===
// === START UPDATE ===
const updateAsyncEmoji = createAsyncThunk<
  { ids: string[]; updatedEmoji: FetchEmoji },
  { emoji: string; ids: string[]; updateEmojiId: string },
  {
    rejectValue: string;
    state: { notes: State };
  }
>('notes/updateAsyncEmoji', async ({ emoji, ids, updateEmojiId }) => {
  const updatedEmoji = await updateEmojiApi({
    emoji,
    ids,
    updateEmojiId,
  }).catch((error) => {
    throw error;
  });
  if (updatedEmoji) {
    return updatedEmoji;
  } else {
    throw new Error('error updateAsyncNote');
  }
});
const updateAsyncNote = createAsyncThunk<
  { ids: string[]; updatedNote: Note; updateNoteData: UpdateNoteInput },
  { ids: string[]; updateNoteData: UpdateNoteInput },
  {
    rejectValue: string;
    state: { notes: State };
  }
>('notes/updateAsyncNote', async ({ ids, updateNoteData }) => {
  const updatedNote = await updateNoteApi(updateNoteData).catch((error) => {
    throw error;
  });
  if (updatedNote) {
    return { ...updatedNote, ids, updateNoteData };
  } else {
    throw new Error('error updateAsyncNote');
  }
}); // === END UPDATE ===
// === START DELETE ===
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
}); // === END DELETE ===

export const noteSlice = createSlice({
  name: 'notes',
  extraReducers: (builder) => {
    builder // === START CREATE ==
      .addCase(addEmoji.fulfilled, (state, action) => {
        const loopCount = action.payload.ids.length - 1;
        const ids = action.payload.ids;
        const note = state.notes.find((note) => note.id === ids[loopCount]);
        const createStoreEmoji = (
          note: WritableDraft<Note>,
          loopCount: number,
        ): void => {
          if (loopCount === 0) {
            const newEmoji = action.payload.newEmoji;
            note.emoji = newEmoji;
          } else {
            const minusLoopCount = loopCount - 1;
            if (note.children) {
              const childNote = note.children.find(
                (note) => note.id === ids[minusLoopCount],
              );
              childNote && createStoreEmoji(childNote, minusLoopCount);
            }
          }
        };
        if (note !== undefined) createStoreEmoji(note, loopCount);
      })
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
      }) // === END CREATE ===
      // === START READ ===
      .addCase(fetchAsyncNotes.pending, (state) => {
        // TODO:ロードの完了有無追加
        // state.status = 'loading';
      })
      .addCase(fetchAsyncNotes.fulfilled, (state, action) => {
        // TODO:ロードの完了有無追加
        // state.status = 'idle';
        state.notes = action.payload;
      }) // === END READ ===
      // === START UPDATE ===
      .addCase(updateAsyncEmoji.fulfilled, (state, action) => {
        const loopCount = action.payload.ids.length - 1;
        const ids = action.payload.ids;
        const note = state.notes.find((note) => note.id === ids[loopCount]);
        const updateStoreEmoji = (
          note: WritableDraft<Note>,
          loopCount: number,
        ): void => {
          if (loopCount === 0) {
            const updateEmoji = action.payload.updatedEmoji;
            note.emoji = updateEmoji;
          } else {
            const minusLoopCount = loopCount - 1;
            if (note.children) {
              const childNote = note.children.find(
                (note) => note.id === ids[minusLoopCount],
              );
              childNote && updateStoreEmoji(childNote, minusLoopCount);
            }
          }
        };
        if (note !== undefined) updateStoreEmoji(note, loopCount);
      })
      .addCase(updateAsyncNote.fulfilled, (state, action) => {
        const loopCount = action.payload.ids.length - 1;
        const ids = action.payload.ids;
        const note = state.notes.find((note) => note.id === ids[loopCount]);
        // TODO:更新ができていない。
        const noteTitleUpdate = (
          note: WritableDraft<Note>,
          loopCount: number,
        ): void => {
          if (loopCount === 0) {
            // NOTE:childrenがないから？
            const updateNoteData = action.payload.updateNoteData;
            const updatedNote = action.payload.updatedNote;
            if (updateNoteData.title) note.title = updatedNote.title;
            if (updateNoteData.orderNumber)
              note.orderNumber = updatedNote.orderNumber;
            if (updateNoteData.description)
              note.description = updatedNote.description;
            if (updateNoteData.expanded) note.expanded = updatedNote.expanded;
            if (updateNoteData.title) note.title = updatedNote.title;
          } else {
            const minusLoopCount = loopCount - 1;
            if (note.children) {
              const childNote = note.children.find(
                (note) => note.id === ids[minusLoopCount],
              );
              childNote && noteTitleUpdate(childNote, minusLoopCount);
            }
          }
        };
        if (note !== undefined) noteTitleUpdate(note, loopCount);
      }) // === END UPDATE ===
      // === START CREATE ===
      .addCase(deleteNote.fulfilled, (state, action) => {
        // TODO:ロードの完了有無追加
        // state.status = 'idle';
        // state.notes = action.payload;
        state.notes = state.notes.filter(
          (note) => note.id !== action.payload.deletedNote.id,
        );
      }); // == END CREATE ===
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
  },
});

const { updateDescription, updateOrder } = noteSlice.actions;

const selectNote = (state: RootState): State => state.notes;

export {
  addBrotherNote,
  addChildNote,
  addEmoji,
  deleteNote,
  fetchAsyncNotes,
  selectNote,
  updateAsyncEmoji,
  updateAsyncNote,
  updateDescription,
  updateOrder,
};

export default noteSlice.reducer;
