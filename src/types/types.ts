import { GetEmojiQuery, GetNoteQuery } from '~/API';

import { DeepOmit } from './DeepOmit';

type FirstOfUnion<U> = ((U extends any ? (k: U[]) => void : never) extends (k: infer I1) => void ? I1 : never) extends Array<infer I2> ? I2 : never;

export type User = {
  email: string;
  uid: string;
};

export type FetchNote = FirstOfUnion<DeepOmit<Exclude<GetNoteQuery['getNote'], null>, '__typename'>>;

// TODO:どうハンドリングするか悩ましい
export type PickedNote = Pick<Note, 'title' | 'id' | 'emoji' | 'childrenIds' | 'parentId' | 'noteEmojiId' | 'noteEmojiId' | 'children'>;

export type NoteChildren = { children?: Note[] | PickedNote[] };

export type Note = NoteChildren & FetchNote;

export type FetchEmoji = FirstOfUnion<DeepOmit<Exclude<GetEmojiQuery['getEmoji'], null>, '__typename'>>;

// export type Notes = {
//   id: string;
//   title: string;
//   children?: Notes[];
//   description: string;
//   emoji?: string;
//   expanded: boolean;
//   level: number;
//   orderNumber: number;
//   parentId?: number;
// };
