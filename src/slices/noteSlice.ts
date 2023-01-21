import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/types/types-external';

import { Notes } from '~/types/types';

import type { RootState } from '../store';

type State = {
  focusNote: focusNote;
  maxId: number;
  notes: Notes[];
};

const initialState: State = {
  focusNote: {
    focusId: 0,
    ids: [],
    level: 0,
    levelStock: 0,
    order_number: 0,
  },
  maxId: 10,
  notes: [
    {
      id: 1,
      title: '1',
      children: [
        {
          id: 2,
          title: 'カスタムヘッダー1',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: false,
          level: 1,
          order_number: 0,
          parentId: 1,
        },
        {
          id: 3,
          title: 'カスタムヘッダー2',
          children: [
            {
              id: 9,
              title: 'カスタムヘッダー',
              description: 'メモメモメモメモメモメモメモメモメモメモ',
              expanded: true,
              level: 2,
              order_number: 0,
              parentId: 1,
            },
          ],
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: true,
          level: 1,
          order_number: 1,
          parentId: 1,
        },
        {
          id: 4,
          title: 'カスタムヘッダー3',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: false,
          level: 1,
          order_number: 2,
          parentId: 1,
        },
      ],
      description:
        'メモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモ',
      emoji: '😁',
      expanded: true,
      level: 0,
      order_number: 0,
    },
    {
      id: 5,
      title: '5',
      children: [
        {
          id: 6,
          title: 'カスタムヘッダー',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: false,
          level: 1,
          order_number: 1,
          parentId: 1,
        },
        {
          id: 7,
          title: 'カスタムヘッダー',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: true,
          level: 1,
          order_number: 2,
          parentId: 1,
        },
        {
          id: 8,
          title: 'カスタムヘッダー',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: false,
          level: 1,
          order_number: 3,
          parentId: 1,
        },
      ],
      description:
        'メモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモ',
      emoji: '😁',
      expanded: true,
      level: 0,
      order_number: 1,
    },
    {
      id: 15,
      title: '15',
      children: [
        {
          id: 16,
          title: 'カスタムヘッダー',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: false,
          level: 1,
          order_number: 1,
          parentId: 1,
        },
        {
          id: 17,
          title: 'カスタムヘッダー',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: true,
          level: 1,
          order_number: 2,
          parentId: 1,
        },
        {
          id: 18,
          title: 'カスタムヘッダー',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: false,
          level: 1,
          order_number: 3,
          parentId: 1,
        },
      ],
      description:
        'メモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモ',
      emoji: '😁',
      expanded: true,
      level: 0,
      order_number: 2,
    },
  ],
};

type targetIds = {
  ids: number[];
};

type focusNote = {
  focusId: number;
  ids: number[];
  level: number;
  levelStock: number;
  order_number: number;
};

type orderIds = {
  from: number;
  ids: number[];
  to: number;
};
export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    // TODO:そもそも選択している要素の↓に入ってくれない
    addBrotherNote: (state) => {
      const loopCount: number = state.focusNote.ids.length - 1;
      const ids: number[] = state.focusNote.ids;
      const notes: WritableDraft<Notes> | undefined = state.notes.find(
        (note) => note.id === ids[loopCount],
      );
      const addNoteObject = {
        id: state.maxId + 1,
        title: '',
        description: '',
        expanded: true,
        level: 0,
        order_number: state.focusNote.order_number + 1,
      };
      const orderUpdateNote = (
        orderChangeNotes: Array<WritableDraft<Notes>>,
      ): void => {
        for (const note of orderChangeNotes) {
          note.order_number = note.order_number + 1;
        }
      };
      const addNote = (
        parentNote: WritableDraft<Notes>,
        loopCount: number,
      ): void => {
        if (loopCount === 1) {
          if (parentNote.children) {
            const orderChangeNotes = parentNote.children.filter(
              (note) => note.order_number >= state.focusNote.order_number + 1,
            );
            parentNote.children.splice(
              state.focusNote.order_number + 1,
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
          (note) => note.order_number >= state.focusNote.order_number + 1,
        );
        state.notes.splice(state.focusNote.order_number + 1, 0, addNoteObject);
        orderUpdateNote(orderChangeNotes);
        state.maxId = state.maxId + 1;
      } else {
        notes && addNote(notes, loopCount);
      }
    },
    addChildNote: (state) => {
      const loopCount = state.focusNote.ids.length - 1;
      const ids = state.focusNote.ids;
      const notes = state.notes.find((note) => note.id === ids[loopCount]);
      const noteDescriptionUpdate = (
        notes: WritableDraft<Notes>,
        loopCount: number,
      ): void => {
        if (loopCount === 0) {
          if (notes.children) {
            notes.children.push({
              id: state.maxId + 1,
              title: '',
              description: '',
              expanded: true,
              level: notes.level + 1,
              order_number: notes.children.length,
            });
            state.maxId = state.maxId + 1;
          } else {
            notes.children = [];
            notes.children.push({
              id: state.maxId + 1,
              title: '',
              description: '',
              expanded: true,
              level: notes.level + 1,
              order_number: notes.children.length,
            });
            state.maxId = state.maxId + 1;
          }
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
        state.focusNote.level = action.payload.level;
        state.focusNote.order_number = action.payload.order_number;
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
  addBrotherNote,
  addChildNote,
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
