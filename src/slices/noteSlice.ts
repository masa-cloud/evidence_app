import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import { WritableDraft } from 'immer/dist/types/types-external';

import { CreateNoteInput, Note } from '~/API';
import * as mutations from '~/graphql/mutations';
import { Notes } from '~/types/types';

import type { RootState } from '../store';

type State = {
  focusNote: focusNote;
  maxId: number;
  notes: Notes[];
};

const addBrotherNote = createAsyncThunk<
  { newNote: Note },
  { focusLevel: number; orderNumber: number },
  {
    rejectValue: string;
    state: { notes: State };
  }
>('notes/addBrotherNote', async (focusData) => {
  const noteDetails: CreateNoteInput = {
    title: '',
    description: '',
    expanded: true,
    level: focusData.focusLevel,
    orderNumber: focusData.orderNumber + 1,
  };
  const newNote = (await API.graphql({
    query: mutations.createNote,
    variables: { input: noteDetails },
  })) as Note;
  return { newNote };
});

const addChildNote = createAsyncThunk<
  { newNote: Note },
  { childrenLength: number; focusLevel: number },
  {
    rejectValue: string;
    state: { notes: State };
  }
>('notes/addChildNote', async (focusData) => {
  const noteDetails: CreateNoteInput = {
    title: '',
    description: '',
    expanded: true,
    level: focusData.focusLevel + 1,
    orderNumber: focusData.childrenLength + 1,
  };
  const newNote = (await API.graphql({
    query: mutations.createNote,
    variables: { input: noteDetails },
  })) as Note;
  return { newNote };
});

const initialState: State = {
  focusNote: {
    focusChildrenLength: 0,
    focusId: '1',
    ids: [],
    level: 0,
    levelStock: 0,
    orderNumber: 0,
  },
  maxId: 10,
  notes: [
    {
      id: '1',
      title: '1',
      children: [
        {
          id: '2',
          title: 'カスタムヘッダー1',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: false,
          level: 1,
          orderNumber: 0,
          parentId: 1,
        },
        {
          id: '3',
          title: 'カスタムヘッダー2',
          children: [
            {
              id: '9',
              title: 'カスタムヘッダー',
              description: 'メモメモメモメモメモメモメモメモメモメモ',
              expanded: true,
              level: 2,
              orderNumber: 0,
              parentId: 1,
            },
          ],
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: true,
          level: 1,
          orderNumber: 1,
          parentId: 1,
        },
        {
          id: '4',
          title: 'カスタムヘッダー3',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: false,
          level: 1,
          orderNumber: 2,
          parentId: 1,
        },
      ],
      description:
        'メモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモ',
      emoji: '😁',
      expanded: true,
      level: 0,
      orderNumber: 0,
    },
    {
      id: '5',
      title: '5',
      children: [
        {
          id: '6',
          title: 'カスタムヘッダー',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: false,
          level: 1,
          orderNumber: 1,
          parentId: 1,
        },
        {
          id: '7',
          title: 'カスタムヘッダー',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: true,
          level: 1,
          orderNumber: 2,
          parentId: 1,
        },
        {
          id: '8',
          title: 'カスタムヘッダー',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: false,
          level: 1,
          orderNumber: 3,
          parentId: 1,
        },
      ],
      description:
        'メモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモ',
      emoji: '😁',
      expanded: true,
      level: 0,
      orderNumber: 1,
    },
    {
      id: '15',
      title: '15',
      children: [
        {
          id: '16',
          title: 'カスタムヘッダー',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: false,
          level: 1,
          orderNumber: 1,
          parentId: 1,
        },
        {
          id: '17',
          title: 'カスタムヘッダー',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: true,
          level: 1,
          orderNumber: 2,
          parentId: 1,
        },
        {
          id: '18',
          title: 'カスタムヘッダー',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: false,
          level: 1,
          orderNumber: 3,
          parentId: 1,
        },
      ],
      description:
        'メモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモ',
      emoji: '😁',
      expanded: true,
      level: 0,
      orderNumber: 2,
    },
  ],
};

type targetIds = {
  ids: string[];
};

type focusNote = {
  focusChildrenLength: number;
  focusId: string;
  ids: string[];
  level: number;
  levelStock: number;
  orderNumber: number;
};

type orderIds = {
  from: number;
  ids: string[];
  to: number;
};

export const noteSlice = createSlice({
  name: 'notes',
  extraReducers: (builder) => {
    builder.addCase(addBrotherNote.fulfilled, (state, action) => {
      const loopCount: number = state.focusNote.ids.length - 1;
      const ids: string[] = state.focusNote.ids;
      const notes: WritableDraft<Notes> | undefined = state.notes.find(
        (note) => note.id === ids[loopCount],
      );
      const addNoteObject = {
        id: action.payload.newNote.id,
        title: '',
        description: '',
        expanded: true,
        level: state.focusNote.level,
        orderNumber: state.focusNote.orderNumber + 1,
      };
      const orderUpdateNote = (
        orderChangeNotes: Array<WritableDraft<Notes>>,
      ): void => {
        for (const note of orderChangeNotes) {
          note.orderNumber = note.orderNumber + 1;
        }
      };
      const addNote = (
        parentNote: WritableDraft<Notes>,
        loopCount: number,
      ): void => {
        if (loopCount === 1) {
          if (parentNote.children) {
            const orderChangeNotes = parentNote.children.filter(
              (note) => note.orderNumber >= state.focusNote.orderNumber + 1,
            );
            parentNote.children.splice(
              state.focusNote.orderNumber + 1,
              0,
              addNoteObject,
            );
            orderUpdateNote(orderChangeNotes);
            state.maxId = state.maxId + 1;
          }
        }
        if (parentNote.children) {
          const childNotes = parentNote.children.find(
            (note) => note.id === ids[loopCount - 1],
          );
          childNotes && addNote(childNotes, loopCount - 1);
        }
      };
      if (loopCount === 0) {
        const orderChangeNotes = state.notes.filter(
          (note) => note.orderNumber >= state.focusNote.orderNumber + 1,
        );
        state.notes.splice(state.focusNote.orderNumber + 1, 0, addNoteObject);
        orderUpdateNote(orderChangeNotes);
        state.maxId = state.maxId + 1;
      } else {
        notes && addNote(notes, loopCount);
      }
    });
    builder.addCase(addChildNote.fulfilled, (state, action) => {
      const loopCount = state.focusNote.ids.length - 1;
      const ids = state.focusNote.ids;
      const notes = state.notes.find((note) => note.id === ids[loopCount]);
      const addChildObject = {
        id: action.payload.newNote.id,
        title: '',
        description: '',
        expanded: true,
        level: state.focusNote.level + 1,
        orderNumber: state.focusNote.orderNumber + 1,
      };
      const noteDescriptionUpdate = (
        notes: WritableDraft<Notes>,
        loopCount: number,
      ): void => {
        if (loopCount === 0) {
          if (!notes.children) notes.children = [];
          notes.children.push(addChildObject);
          state.maxId = state.maxId + 1;
        }
        if (notes.children) {
          const childNotes = notes.children.find(
            (note) => note.id === ids[loopCount - 1],
          );
          childNotes && noteDescriptionUpdate(childNotes, loopCount - 1);
        }
      };
      notes && noteDescriptionUpdate(notes, loopCount);
    });
  },
  initialState,
  reducers: {
    updateDescription: (
      state,
      action: PayloadAction<Required<Pick<Notes, 'description'>> & targetIds>,
    ) => {
      const loopCount = action.payload.ids.length - 1;
      const ids = action.payload.ids;
      const description = action.payload.description;
      const notes = state.notes.find((note) => note.id === ids[loopCount]);
      const noteDescriptionUpdate = (
        notes: WritableDraft<Notes>,
        loopCount: number,
      ): void => {
        if (loopCount === 0) {
          notes.description = description;
        }
        if (notes.children) {
          const childNotes = notes.children.find(
            (note) => note.id === ids[loopCount - 1],
          );
          childNotes && noteDescriptionUpdate(childNotes, loopCount - 1);
        }
      };
      notes && noteDescriptionUpdate(notes, loopCount);
    },
    updateEmoji: (
      state,
      action: PayloadAction<Required<Pick<Notes, 'emoji'>> & targetIds>,
    ) => {
      const loopCount = action.payload.ids.length - 1;
      const ids = action.payload.ids;
      const emoji = action.payload.emoji;
      const notes = state.notes.find((note) => note.id === ids[loopCount]);
      const noteEmojiUpdate = (
        notes: WritableDraft<Notes>,
        loopCount: number,
      ): void => {
        if (loopCount === 0) {
          notes.emoji = emoji;
        }
        if (notes.children) {
          const childNotes = notes.children.find(
            (note) => note.id === ids[loopCount - 1],
          );
          childNotes && noteEmojiUpdate(childNotes, loopCount - 1);
        }
      };
      notes && noteEmojiUpdate(notes, loopCount);
    },
    updateExpanded: (
      state,
      action: PayloadAction<Required<Pick<Notes, 'expanded'>> & targetIds>,
    ) => {
      const loopCount = action.payload.ids.length - 1;
      const ids = action.payload.ids;
      const expanded = action.payload.expanded;
      const notes = state.notes.find((note) => note.id === ids[loopCount]);
      const noteExpandedUpdate = (
        notes: WritableDraft<Notes>,
        loopCount: number,
      ): void => {
        if (loopCount === 0) {
          notes.expanded = expanded;
        }
        if (notes.children) {
          const childNotes = notes.children.find(
            (note) => note.id === ids[loopCount - 1],
          );
          childNotes && noteExpandedUpdate(childNotes, loopCount - 1);
        }
      };
      notes && noteExpandedUpdate(notes, loopCount);
    },
    updateFucusId: (
      state,
      action: PayloadAction<Omit<focusNote, 'levelStock'>>,
    ) => {
      if (state.focusNote.levelStock === 0) {
        state.focusNote.focusId = action.payload.focusId;
        state.focusNote.levelStock = action.payload.level;
        state.focusNote.focusChildrenLength =
          action.payload.focusChildrenLength;
        state.focusNote.level = action.payload.level;
        state.focusNote.orderNumber = action.payload.orderNumber;
        state.focusNote.ids = action.payload.ids;
      } else {
        state.focusNote.levelStock--;
      }
    },
    updateOrder: (state, action: PayloadAction<Required<orderIds>>) => {
      const loopCount = action.payload.ids.length - 1;
      const ids = action.payload.ids;
      const notes = state.notes;
      const noteTitleUpdate = (
        targetNotes: Array<WritableDraft<Notes>>,
        loopCount: number,
        parentNote?: WritableDraft<Notes>,
      ): void => {
        if (loopCount === 0) {
          const deleteNotes = targetNotes.filter(
            (state) => state.id !== ids[0],
          );
          const insertNote = targetNotes.find((state) => state.id === ids[0]);
          if (insertNote !== undefined) {
            deleteNotes.splice(action.payload.to, 0, insertNote);
            if (parentNote) {
              parentNote.children = deleteNotes;
            } else {
              state.notes = deleteNotes;
            }
          }
        } else {
          const parentNotes = notes.find((note) => note.id === ids[loopCount]);
          parentNotes?.children &&
            noteTitleUpdate(parentNotes.children, loopCount - 1, parentNotes);
        }
      };
      notes && noteTitleUpdate(notes, loopCount);
    },
    updateTitle: (
      state,
      action: PayloadAction<Required<Pick<Notes, 'title'>> & targetIds>,
    ) => {
      const loopCount = action.payload.ids.length - 1;
      const ids = action.payload.ids;
      const title = action.payload.title;
      const notes = state.notes.find((note) => note.id === ids[loopCount]);
      const noteTitleUpdate = (
        notes: WritableDraft<Notes>,
        loopCount: number,
      ): void => {
        if (loopCount === 0) {
          notes.title = title;
        }
        const minusLoopCount = loopCount - 1;
        if (notes.children) {
          const childNotes = notes.children.find(
            (note) => note.id === ids[minusLoopCount],
          );
          childNotes && noteTitleUpdate(childNotes, minusLoopCount);
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
  updateFucusId,
  updateOrder,
  updateTitle,
} = noteSlice.actions;

const selectNote = (state: RootState): State => state.notes;

export {
  addBrotherNote,
  addChildNote,
  selectNote,
  updateDescription,
  updateEmoji,
  updateExpanded,
  updateFucusId,
  updateOrder,
  updateTitle,
};
export default noteSlice.reducer;
