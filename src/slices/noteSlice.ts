import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/types/types-external';

import { UpdateNoteInput } from '~/API';
import {
  createBrotherNoteApi,
  createChildNoteApi,
  createEmojiApi,
  deleteNoteApi,
  getNotesApi,
  updateEmojiApi,
  updateNoteApi,
  updateNoteOrdersApi,
} from '~/api/noteAPI';
import { FetchEmoji, Note } from '~/types/types';

import type { RootState } from '../store';

type State = {
  notes: Note[];
};

const initialState: State = {
  notes: [],
};

// === START CREATE ===
const addAsyncEmoji = createAsyncThunk<
  { ids: string[]; newEmoji: FetchEmoji },
  {
    emoji: string;
    ids: string[];
  },
  {
    rejectValue: string;
    state: { notes: State };
  }
>('notes/addAsyncEmoji', async (focusData) => {
  const newChildNote = await createEmojiApi({ ...focusData }).catch((error) => {
    throw error;
  });
  if (newChildNote) {
    return newChildNote;
  } else {
    throw new Error('error addAsyncChildNote');
  }
});

const addAsyncBrotherNote = createAsyncThunk<
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
>('notes/addAsyncBrotherNote', async (focusNote) => {
  const newBrotherNotes = await createBrotherNoteApi({ ...focusNote }).catch(
    (error) => {
      throw error;
    },
  );
  if (newBrotherNotes) {
    return newBrotherNotes;
  } else {
    throw new Error('error addAsyncBrotherNote');
  }
});

const addAsyncChildNote = createAsyncThunk<
  { ids: string[]; newNote: Note },
  { id: string; childrenLength: number; focusLevel: number; ids: string[] },
  {
    rejectValue: string;
    state: { notes: State };
  }
>('notes/addAsyncChildNote', async (focusData) => {
  const newChildNote = await createChildNoteApi({ ...focusData }).catch(
    (error) => {
      throw error;
    },
  );
  if (newChildNote) {
    return newChildNote;
  } else {
    throw new Error('error addAsyncChildNote');
  }
}); // === END CREATE ===
// === START READ
const fetchAsyncNotes = createAsyncThunk('notes/fetchAsyncNotes', async () => {
  const notes = await getNotesApi().catch((error) => {
    throw error;
  });
  if (notes) {
    return notes;
  } else {
    return initialState.notes;
  }
}); // === END READ ===
// === START UPDATE ===
const updateAsyncNoteOrder = createAsyncThunk<
  { ids: string[]; targetOrderNumber: number },
  {
    ids: string[];
    isIncreased: boolean;
    parentId: string | undefined | null;
    targetOrderNumber: number;
  },
  {
    rejectValue: string;
    state: { notes: State };
  }
>(
  'notes/updateAsyncNoteOrder',
  async ({ ids, isIncreased, parentId, targetOrderNumber }) => {
    return { ids, targetOrderNumber };
  },
);

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
const deleteAsyncNote = createAsyncThunk<
  { deletedNote: Note; ids: string[] },
  { id: string; ids: string[] },
  {
    rejectValue: string;
    state: { notes: State };
  }
>('notes/deleteAsyncNote', async (focusData) => {
  const notes = await deleteNoteApi({ ...focusData }).catch((error) => {
    throw error;
  });
  if (notes) {
    return { ...notes, ids: focusData.ids };
  } else {
    throw new Error('error addAsyncChildNote');
  }
}); // === END DELETE ===

export const noteSlice = createSlice({
  name: 'notes',
  extraReducers: (builder) => {
    builder // === START CREATE ==
      .addCase(addAsyncEmoji.fulfilled, (state, action) => {
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
      .addCase(addAsyncBrotherNote.fulfilled, (state, action) => {
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
      .addCase(addAsyncChildNote.fulfilled, (state, action) => {
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
      .addCase(updateAsyncNoteOrder.fulfilled, (state, action) => {
        const loopCount = action.payload.ids.length - 1;
        const ids = action.payload.ids;
        const notes = state.notes;
        const noteTitleUpdate = async (
          targetNote: Array<WritableDraft<Note>>,
          loopCount: number,
          parentNote?: WritableDraft<Note>,
        ): Promise<void> => {
          if (loopCount === 0) {
            const deleteNote = targetNote.filter(
              (state) => state.id !== ids[0],
            );
            const insertNote = targetNote.find((state) => state.id === ids[0]);
            if (insertNote !== undefined) {
              deleteNote.splice(
                action.payload.targetOrderNumber,
                0,
                insertNote,
              );
              if (parentNote) {
                parentNote.children = deleteNote;
                await updateNoteOrdersApi({
                  deleteNote: parentNote.children,
                }).catch((error) => {
                  throw error;
                });
              } else {
                state.notes = deleteNote;
                await updateNoteOrdersApi({
                  deleteNote: state.notes,
                }).catch((error) => {
                  throw error;
                });
              }
            }
          } else {
            const parentNote = notes.find((note) => note.id === ids[loopCount]);
            parentNote?.children &&
              noteTitleUpdate(parentNote.children, loopCount - 1, parentNote);
          }
        };
        notes && noteTitleUpdate(notes, loopCount);
      })
      .addCase(updateAsyncNote.fulfilled, (state, action) => {
        const loopCount = action.payload.ids.length - 1;
        const ids = action.payload.ids;
        const note = state.notes.find((note) => note.id === ids[loopCount]);
        const updateStoreNote = (
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
              childNote && updateStoreNote(childNote, minusLoopCount);
            }
          }
        };
        if (note !== undefined) updateStoreNote(note, loopCount);
      }) // === END UPDATE ===
      // === START DELETE ===
      .addCase(deleteAsyncNote.fulfilled, (state, action) => {
        const ids = action.payload.ids;
        const targetId = action.payload.deletedNote.id;
        findNoteAndRemove(state.notes, ids, targetId);
      }); // == END DELETE ===
  },
  initialState,
  reducers: {},
});

const findNoteAndRemove = (
  notes: Array<WritableDraft<Note>>,
  ids: string[],
  targetId: string,
  depth: number = 0,
): void => {
  if (depth === ids.length - 1) {
    const index = notes.findIndex((note) => note.id === targetId);
    if (index !== -1) {
      notes.splice(index, 1);
    }
    return;
  }

  const note = notes.find((note) => note.id === ids[depth]);
  if (note?.children) {
    findNoteAndRemove(note.children, ids, targetId, depth + 1);
  }
};

// const { updateOrder } = noteSlice.actions;

const selectNote = (state: RootState): State => state.notes;

export {
  addAsyncBrotherNote,
  addAsyncChildNote,
  addAsyncEmoji,
  deleteAsyncNote,
  fetchAsyncNotes,
  selectNote,
  updateAsyncEmoji,
  updateAsyncNote,
  updateAsyncNoteOrder,
};

export default noteSlice.reducer;
