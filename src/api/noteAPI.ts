import { Amplify } from '@aws-amplify/core';
import { API, graphqlOperation } from 'aws-amplify';

import {
  CreateChildrenIdInput,
  CreateNoteInput,
  DeleteNoteInput,
  UpdateNoteInput,
} from '~/API';
import awsExports from '~/aws-exports';
import {
  createChildrenId,
  createNote,
  deleteNote,
  updateNote,
} from '~/graphql/mutations';
import { listNotes } from '~/graphql/queries';
import { Note } from '~/types/types';

Amplify.configure(awsExports);

// TODO:特にネストの処理のリファクタリングのコードに問題がなかったら消す。
// const ex = async (items: Note[]): Promise<Note[]> => {
//   return await Promise.all(
//     items.map(async (note) => {
//       if (note.childrenIds?.items.length) {
//         const fetchIds = note.childrenIds?.items
//           .map((childrenId) => {
//             if (typeof childrenId?.childrenId === 'string') {
//               return { id: { eq: childrenId?.childrenId } };
//             }
//             return undefined;
//           })
//           .filter((fetchId) => fetchId !== undefined) as Array<{
//           id: {
//             eq: string;
//           };
//         }>;
//         const filter = {
//           or: fetchIds,
//         };
//         const childNoteData = (await API.graphql(
//           graphqlOperation(listNotes, { filter }),
//         )) as { data: { listNotes: { items: Note[] } } };
//         const isNestNote = childNoteData.data.listNotes.items.some((childNote) => childNote.childrenIds?.items.length !== 0)
//         if(isNestNote) {
//           note.children = await ex(childNoteData.data.listNotes.items);
//         } else {
//           note.children = childNoteData.data.listNotes.items;
//         }
//       }
//       return note;
//     }),
//   );
// };

// export const fetchNotes = async (): Promise<Note[] | undefined> => {
//   try {
//     const filter = {
//       level: {
//         eq: 0,
//       },
//     };
//     const noteData = (await API.graphql(
//       graphqlOperation(listNotes, { filter }),
//     )) as { data: { listNotes: { items: Note[] } } };
//     if (noteData.data.listNotes.items) {
//       return await ex(noteData.data.listNotes.items);
//     }
//     return undefined;
//   } catch (err) {
//     throw new Error('error fetchNotes');
//   }
// };
// === END CREATE ===
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
    throw new Error('Error fetching notes');
  }
}; // === END CREATE ===
// === START CREATE ===
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
      parentId: focusNote.parentId ?? null,
    };
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
    throw new Error('error createChildNote');
  }
}; // === END CREATE ===
// === START UPDATE ===
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
    console.log({ updateNoteDetail });
    const updatedNote = (await API.graphql({
      query: updateNote,
      variables: { input: updateNoteDetail },
    })) as { data: { updateNote: Note } };
    console.log({ updateNoteDetail });
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
    throw new Error('error deleteNoteApi');
  }
}; // === END DELETE ===
