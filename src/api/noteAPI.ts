import { GraphQLResult } from '@aws-amplify/api';
import { Amplify } from '@aws-amplify/core';
import { API, graphqlOperation } from 'aws-amplify';

import awsExports from '~/aws-exports';
import { createNote } from '~/graphql/mutations';
import { listNotes } from '~/graphql/queries';
import { Note } from '~/types/types';

import { CreateNoteInput } from './../API';

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

const fetchNotesChildren = async (items: Note[]): Promise<Note[]> => {
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
          note.children = await fetchNotesChildren(childNotes);
        } else {
          note.children = childNotes;
        }
      }

      return note;
    }),
  );

  return notesWithChildren;
};

export const fetchNotes = async (): Promise<Note[] | undefined> => {
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
      return await fetchNotesChildren(notes);
    }

    return undefined;
  } catch (err) {
    throw new Error('Error fetching notes');
  }
};

export const addBrotherNote = async (focusData: {
  focusLevel: number;
  orderNumber: number;
}): Promise<
  | {
      newNote: CreateNoteInput | undefined;
    }
  | undefined
> => {
  try {
    if (!focusData.focusLevel || !focusData.orderNumber) return;
    const note: CreateNoteInput = {
      title: '',
      description: '',
      expanded: true,
      level: focusData.focusLevel,
      orderNumber: focusData.orderNumber + 1,
    };
    const newNote = (await API.graphql(
      graphqlOperation(createNote, { input: note }),
    )) as GraphQLResult<CreateNoteInput>;
    console.log({ newNote });
    return { newNote: newNote.data };
  } catch (err) {
    throw new Error('error addBrotherNote');
  }
};
