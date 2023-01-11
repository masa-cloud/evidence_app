import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/types/types-external';

import { FocusInputType } from '~/screens_components/Home/NoteCard';
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
    focusInputType: FocusInputType.None,
    ids: [],
    level: 0,
    levelStock: 0,
  },
  maxId: 10,
  notes: [
    {
      id: 1,
      title: 'メモ1aaa',
      children: [
        {
          id: 2,
          title: 'カスタムヘッダー1',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: false,
          level: 1,
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
              parentId: 1,
            },
          ],
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: true,
          level: 1,
          parentId: 1,
        },
        {
          id: 4,
          title: 'カスタムヘッダー3',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: false,
          level: 1,
          parentId: 1,
        },
      ],
      description:
        'メモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモ',
      emoji: '😁',
      expanded: true,
      level: 0,
    },
    {
      id: 5,
      title: 'カスタムヘッダーメモメモメモメモメモメモメモメモメモメモ',
      children: [
        {
          id: 6,
          title: 'カスタムヘッダー',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: false,
          level: 1,
          parentId: 1,
        },
        {
          id: 7,
          title: 'カスタムヘッダー',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: true,
          level: 1,
          parentId: 1,
        },
        {
          id: 8,
          title: 'カスタムヘッダー',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: false,
          level: 1,
          parentId: 1,
        },
      ],
      description:
        'メモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモ',
      emoji: '😁',
      expanded: true,
      level: 0,
    },
    {
      id: 15,
      title: 'カスタムヘッダーメモメモメモメモメモメモメモメモメモメモ',
      children: [
        {
          id: 16,
          title: 'カスタムヘッダー',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: false,
          level: 1,
          parentId: 1,
        },
        {
          id: 17,
          title: 'カスタムヘッダー',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: true,
          level: 1,
          parentId: 1,
        },
        {
          id: 18,
          title: 'カスタムヘッダー',
          description: 'メモメモメモメモメモメモメモメモメモメモ',
          expanded: false,
          level: 1,
          parentId: 1,
        },
      ],
      description:
        'メモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモ',
      emoji: '😁',
      expanded: true,
      level: 0,
    },
  ],
};

type targetIds = {
  ids: number[];
};

type focusNote = {
  focusId: number;
  focusInputType: FocusInputType;
  ids: number[];
  level: number;
  levelStock: number;
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
    addBrotherNote: (state) => {
      const loopCount = state.focusNote.ids.length - 1;
      const ids = state.focusNote.ids;
      const notes = state.notes.find((note) => note.id === ids[loopCount]);
      const noteDescriptionUpdate = (
        notes: WritableDraft<Notes>,
        loopCount: number,
      ): void => {
        if (loopCount === 1) {
          if (notes.children) {
            notes.children.push({
              id: state.maxId + 1,
              title: '',
              description: '',
              expanded: true,
              level: notes.level + 1,
            });
            state.maxId = state.maxId + 1;
          }
        }
        if (loopCount === 0) {
          state.notes.push({
            id: state.maxId + 1,
            title: '',
            description: '',
            expanded: true,
            level: 0,
          });
          state.maxId = state.maxId + 1;
        }
        if (notes.children) {
          const childNotes = notes.children.find(
            (note) => note.id === ids[loopCount - 1],
          );
          childNotes && noteDescriptionUpdate(childNotes, loopCount - 1);
        }
        // state.notes.reduceRight
      };
      notes && noteDescriptionUpdate(notes, loopCount);
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
      console.log({ ids });
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
    updateFucusId: (
      state,
      action: PayloadAction<Omit<focusNote, 'levelStock' | 'focusInputType'>>,
    ) => {
      if (state.focusNote.levelStock === 0) {
        state.focusNote.focusId = action.payload.focusId;
        state.focusNote.levelStock = action.payload.level;
        state.focusNote.level = action.payload.level;
        state.focusNote.ids = action.payload.ids;
      } else {
        state.focusNote.levelStock--;
      }
    },
    updateFucusInputType: (
      state,
      action: PayloadAction<Pick<focusNote, 'focusInputType'>>,
    ) => {
      state.focusNote.focusInputType = action.payload.focusInputType;
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
          console.log({ insertNote });
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
        if (notes.children) {
          const childNotes = notes.children.find(
            (note) => note.id === ids[loopCount - 1],
          );
          childNotes && noteTitleUpdate(childNotes, loopCount - 1);
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
  updateFucusId,
  updateFucusInputType,
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
  updateFucusId,
  updateFucusInputType,
  updateOrder,
  updateTitle,
};
export default noteSlice.reducer;