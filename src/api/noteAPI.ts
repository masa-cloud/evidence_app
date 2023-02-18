import { Amplify } from '@aws-amplify/core';
import { API, graphqlOperation } from 'aws-amplify';

import {
  CreateChildrenIdInput,
  CreateEmojiInput,
  CreateNoteInput,
  DeleteNoteInput,
  UpdateNoteInput,
} from '~/API';
import awsExports from '~/aws-exports';
import {
  createChildrenId,
  createNote,
  deleteNote,
  updateEmoji,
  updateNote,
} from '~/graphql/mutations';
import { listNotes } from '~/graphql/queries';
import { FetchEmoji, Note } from '~/types/types';

import { UpdateEmojiInput } from './../API';
import { createEmoji } from './../graphql/mutations';

Amplify.configure(awsExports);

// === START CREATE ===
export const createEmojiApi = async (focusNote: {
  emoji: string;
  ids: string[];
}): Promise<
  | {
      ids: string[];
      newEmoji: FetchEmoji;
    }
  | undefined
> => {
  try {
    const emojiDetails: CreateEmojiInput = {
      name: focusNote.emoji,
    };
    const newEmoji = (await API.graphql({
      query: createEmoji,
      variables: { input: emojiDetails },
    })) as { data: { createEmoji: FetchEmoji } };
    if (focusNote.ids[0]) {
      const noteDetails: UpdateNoteInput = {
        id: focusNote.ids[0],
        noteEmojiId: newEmoji.data.createEmoji.id,
      };
      await API.graphql({
        query: updateNote,
        variables: { input: noteDetails },
      });
      return {
        ids: focusNote.ids,
        newEmoji: newEmoji.data.createEmoji,
      };
    } else {
      throw new Error('error createEmojiApi');
    }
  } catch (err) {
    console.error(err);
    throw new Error('error createEmojiApi');
  }
};

const getNotesChildren = async (items: Note[]): Promise<Note[]> => {
  const fetchedNoteChildren = async (
    childrenIds: Array<{ childrenId: string }>,
  ): Promise<Note[]> => {
    const fetchIds = childrenIds
      .filter(({ childrenId }) => typeof childrenId === 'string')
      .map(({ childrenId }) => ({ id: { eq: childrenId } }));
    const filter = {
      or: fetchIds,
    };

    const {
      data: {
        listNotes: { items: childNotes },
      },
    } = (await API.graphql(graphqlOperation(listNotes, { filter }))) as {
      data: { listNotes: { items: Note[] } };
    };

    return childNotes;
  };
  const notesWithChildren = await Promise.all(
    items.map(async (note) => {
      if (note.childrenIds?.items.length) {
        const childrenIds = note.childrenIds.items.map((idData) => {
          return { childrenId: idData?.childrenId as string };
        });
        const childNotes = await fetchedNoteChildren(childrenIds);
        const isNestedNote = childNotes.some(
          (childNote) => childNote.childrenIds?.items.length !== 0,
        );

        if (isNestedNote) {
          note.children = await getNotesChildren(childNotes);
        } else {
          note.children = childNotes;
        }
      }
      return note;
    }),
  );
  return notesWithChildren;
};

export const createBrotherNote = async (focusNote: {
  focusLevel: number;
  ids: string[];
  orderNumber: number;
  parentId: string | undefined | null;
}): Promise<
  | {
      ids: string[];
      newNote: Note;
      orderNumber: number;
    }
  | undefined
> => {
  try {
    // TODO:orderNumberがおかしいはず。
    const noteDetails: CreateNoteInput = {
      title: '',
      description: '',
      expanded: true,
      level: focusNote.focusLevel,
      orderNumber: focusNote.orderNumber + 1,
    };
    focusNote.parentId &&
      Object.assign(noteDetails, { parentId: focusNote.parentId });
    // parentId: focusNote.parentId ?? null,
    const newNote = (await API.graphql({
      query: createNote,
      variables: { input: noteDetails },
    })) as { data: { createNote: Note } };
    return {
      ids: focusNote.ids,
      newNote: newNote.data.createNote,
      orderNumber: focusNote.orderNumber,
    };
  } catch (err) {
    console.error(err);
    throw new Error('error createBrotherNote');
  }
};

export const createChildNote = async (focusNote: {
  id: string;
  childrenLength: number;
  focusLevel: number;
  ids: string[];
}): Promise<
  | {
      ids: string[];
      newNote: Note;
    }
  | undefined
> => {
  try {
    const noteDetail: CreateNoteInput = {
      title: '',
      description: '',
      expanded: true,
      level: focusNote.focusLevel + 1,
      orderNumber: focusNote.childrenLength + 1,
      parentId: focusNote.id,
    };
    // NOTE:childrenIdをchildrenIdsに加えないとおかしくなるようだったら見直す
    const newNote = (await API.graphql({
      query: createNote,
      variables: { input: noteDetail },
    })) as { data: { createNote: Note } };
    const childrenIdDetail: CreateChildrenIdInput = {
      childrenId: newNote.data.createNote.id,
      noteChildrenIdsId: focusNote.id,
    };
    await API.graphql({
      query: createChildrenId,
      variables: { input: childrenIdDetail },
    });
    return { ids: focusNote.ids, newNote: newNote.data.createNote };
  } catch (err) {
    console.error(err);
    throw new Error('error createChildNote');
  }
}; // === END CREATE ===
// === START READ ===
export const getNotes = async (): Promise<Note[] | undefined> => {
  try {
    const filter = { level: { eq: 0 } };

    const {
      data: {
        listNotes: { items: notes },
      },
    } = (await API.graphql(graphqlOperation(listNotes, { filter }))) as {
      data: { listNotes: { items: Note[] } };
    };

    if (notes) {
      return await getNotesChildren(notes);
    }

    return undefined;
  } catch (err) {
    console.error(err);
    throw new Error('Error fetching notes');
  }
}; // === END READ ===
// === START UPDATE ===
export const updateEmojiApi = async ({
  emoji,
  ids,
  updateEmojiId,
}: {
  emoji: string;
  ids: string[];
  updateEmojiId: string;
}): Promise<
  | {
      ids: string[];
      updatedEmoji: FetchEmoji;
    }
  | undefined
> => {
  try {
    const updateNoteDetail: UpdateEmojiInput = {
      id: updateEmojiId,
      name: emoji,
    };
    const updatedEmoji = (await API.graphql({
      query: updateEmoji,
      variables: { input: updateNoteDetail },
    })) as { data: { updateEmoji: FetchEmoji } };
    return { ids, updatedEmoji: updatedEmoji.data.updateEmoji };
  } catch (err) {
    throw new Error('error updateNoteApi');
  }
};
export const updateNoteApi = async (
  updateNoteData: UpdateNoteInput,
): Promise<
  | {
      updatedNote: Note;
    }
  | undefined
> => {
  try {
    const updateNoteDetail: UpdateNoteInput = { ...updateNoteData };
    const updatedNote = (await API.graphql({
      query: updateNote,
      variables: { input: updateNoteDetail },
    })) as { data: { updateNote: Note } };
    return { updatedNote: updatedNote.data.updateNote };
  } catch (err) {
    throw new Error('error updateNoteApi');
  }
}; // === END UPDATE ===
// === START DELETE ===
export const deleteNoteApi = async (focusNote: {
  id: string;
}): Promise<
  | {
      deletedNote: Note;
    }
  | undefined
> => {
  try {
    const deleteNoteDetail: DeleteNoteInput = { id: focusNote.id };
    const deletedNote = (await API.graphql({
      query: deleteNote,
      variables: { input: deleteNoteDetail },
    })) as { data: { deleteNote: Note } };
    return { deletedNote: deletedNote.data.deleteNote };
  } catch (err) {
    console.error(err);
    throw new Error('error deleteNoteApi');
  }
}; // === END DELETE ===
