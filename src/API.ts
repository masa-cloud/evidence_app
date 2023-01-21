/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateNoteInput = {
  id?: string | null;
  title: string;
  description: string;
  expanded: boolean;
  level: number;
  orderNumber: number;
  noteChildrenId?: string | null;
  noteEmojiId?: string | null;
};

export type ModelNoteConditionInput = {
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  expanded?: ModelBooleanInput | null;
  level?: ModelIntInput | null;
  orderNumber?: ModelIntInput | null;
  and?: Array<ModelNoteConditionInput | null> | null;
  or?: Array<ModelNoteConditionInput | null> | null;
  not?: ModelNoteConditionInput | null;
  noteChildrenId?: ModelIDInput | null;
  noteEmojiId?: ModelIDInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null',
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type Note = {
  __typename: 'Note';
  id: string;
  title: string;
  description: string;
  expanded: boolean;
  level: number;
  orderNumber: number;
  emoji?: Emoji | null;
  parent?: Note | null;
  children?: ModelNoteConnection | null;
  createdAt: string;
  updatedAt: string;
  noteChildrenId?: string | null;
  noteEmojiId?: string | null;
};

export type Emoji = {
  __typename: 'Emoji';
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ModelNoteConnection = {
  __typename: 'ModelNoteConnection';
  items: Array<Note | null>;
  nextToken?: string | null;
};

export type UpdateNoteInput = {
  id: string;
  title?: string | null;
  description?: string | null;
  expanded?: boolean | null;
  level?: number | null;
  orderNumber?: number | null;
  noteChildrenId?: string | null;
  noteEmojiId?: string | null;
};

export type DeleteNoteInput = {
  id: string;
};

export type CreateEmojiInput = {
  id?: string | null;
  name: string;
};

export type ModelEmojiConditionInput = {
  name?: ModelStringInput | null;
  and?: Array<ModelEmojiConditionInput | null> | null;
  or?: Array<ModelEmojiConditionInput | null> | null;
  not?: ModelEmojiConditionInput | null;
};

export type UpdateEmojiInput = {
  id: string;
  name?: string | null;
};

export type DeleteEmojiInput = {
  id: string;
};

export type ModelNoteFilterInput = {
  id?: ModelIDInput | null;
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  expanded?: ModelBooleanInput | null;
  level?: ModelIntInput | null;
  orderNumber?: ModelIntInput | null;
  and?: Array<ModelNoteFilterInput | null> | null;
  or?: Array<ModelNoteFilterInput | null> | null;
  not?: ModelNoteFilterInput | null;
  noteChildrenId?: ModelIDInput | null;
  noteEmojiId?: ModelIDInput | null;
};

export enum ModelSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type ModelEmojiFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  and?: Array<ModelEmojiFilterInput | null> | null;
  or?: Array<ModelEmojiFilterInput | null> | null;
  not?: ModelEmojiFilterInput | null;
};

export type ModelEmojiConnection = {
  __typename: 'ModelEmojiConnection';
  items: Array<Emoji | null>;
  nextToken?: string | null;
};

export type ModelSubscriptionNoteFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  title?: ModelSubscriptionStringInput | null;
  description?: ModelSubscriptionStringInput | null;
  expanded?: ModelSubscriptionBooleanInput | null;
  level?: ModelSubscriptionIntInput | null;
  orderNumber?: ModelSubscriptionIntInput | null;
  and?: Array<ModelSubscriptionNoteFilterInput | null> | null;
  or?: Array<ModelSubscriptionNoteFilterInput | null> | null;
};

export type ModelSubscriptionIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
};

export type ModelSubscriptionIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  in?: Array<number | null> | null;
  notIn?: Array<number | null> | null;
};

export type ModelSubscriptionEmojiFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionEmojiFilterInput | null> | null;
  or?: Array<ModelSubscriptionEmojiFilterInput | null> | null;
};

export type CreateNoteMutationVariables = {
  input: CreateNoteInput;
  condition?: ModelNoteConditionInput | null;
};

export type CreateNoteMutation = {
  createNote?: {
    __typename: 'Note';
    id: string;
    title: string;
    description: string;
    expanded: boolean;
    level: number;
    orderNumber: number;
    emoji?: {
      __typename: 'Emoji';
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    } | null;
    parent?: {
      __typename: 'Note';
      id: string;
      title: string;
      description: string;
      expanded: boolean;
      level: number;
      orderNumber: number;
      emoji?: {
        __typename: 'Emoji';
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
      } | null;
      parent?: {
        __typename: 'Note';
        id: string;
        title: string;
        description: string;
        expanded: boolean;
        level: number;
        orderNumber: number;
        createdAt: string;
        updatedAt: string;
        noteChildrenId?: string | null;
        noteEmojiId?: string | null;
      } | null;
      children?: {
        __typename: 'ModelNoteConnection';
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      noteChildrenId?: string | null;
      noteEmojiId?: string | null;
    } | null;
    children?: {
      __typename: 'ModelNoteConnection';
      items: Array<{
        __typename: 'Note';
        id: string;
        title: string;
        description: string;
        expanded: boolean;
        level: number;
        orderNumber: number;
        createdAt: string;
        updatedAt: string;
        noteChildrenId?: string | null;
        noteEmojiId?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    noteChildrenId?: string | null;
    noteEmojiId?: string | null;
  } | null;
};

export type UpdateNoteMutationVariables = {
  input: UpdateNoteInput;
  condition?: ModelNoteConditionInput | null;
};

export type UpdateNoteMutation = {
  updateNote?: {
    __typename: 'Note';
    id: string;
    title: string;
    description: string;
    expanded: boolean;
    level: number;
    orderNumber: number;
    emoji?: {
      __typename: 'Emoji';
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    } | null;
    parent?: {
      __typename: 'Note';
      id: string;
      title: string;
      description: string;
      expanded: boolean;
      level: number;
      orderNumber: number;
      emoji?: {
        __typename: 'Emoji';
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
      } | null;
      parent?: {
        __typename: 'Note';
        id: string;
        title: string;
        description: string;
        expanded: boolean;
        level: number;
        orderNumber: number;
        createdAt: string;
        updatedAt: string;
        noteChildrenId?: string | null;
        noteEmojiId?: string | null;
      } | null;
      children?: {
        __typename: 'ModelNoteConnection';
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      noteChildrenId?: string | null;
      noteEmojiId?: string | null;
    } | null;
    children?: {
      __typename: 'ModelNoteConnection';
      items: Array<{
        __typename: 'Note';
        id: string;
        title: string;
        description: string;
        expanded: boolean;
        level: number;
        orderNumber: number;
        createdAt: string;
        updatedAt: string;
        noteChildrenId?: string | null;
        noteEmojiId?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    noteChildrenId?: string | null;
    noteEmojiId?: string | null;
  } | null;
};

export type DeleteNoteMutationVariables = {
  input: DeleteNoteInput;
  condition?: ModelNoteConditionInput | null;
};

export type DeleteNoteMutation = {
  deleteNote?: {
    __typename: 'Note';
    id: string;
    title: string;
    description: string;
    expanded: boolean;
    level: number;
    orderNumber: number;
    emoji?: {
      __typename: 'Emoji';
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    } | null;
    parent?: {
      __typename: 'Note';
      id: string;
      title: string;
      description: string;
      expanded: boolean;
      level: number;
      orderNumber: number;
      emoji?: {
        __typename: 'Emoji';
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
      } | null;
      parent?: {
        __typename: 'Note';
        id: string;
        title: string;
        description: string;
        expanded: boolean;
        level: number;
        orderNumber: number;
        createdAt: string;
        updatedAt: string;
        noteChildrenId?: string | null;
        noteEmojiId?: string | null;
      } | null;
      children?: {
        __typename: 'ModelNoteConnection';
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      noteChildrenId?: string | null;
      noteEmojiId?: string | null;
    } | null;
    children?: {
      __typename: 'ModelNoteConnection';
      items: Array<{
        __typename: 'Note';
        id: string;
        title: string;
        description: string;
        expanded: boolean;
        level: number;
        orderNumber: number;
        createdAt: string;
        updatedAt: string;
        noteChildrenId?: string | null;
        noteEmojiId?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    noteChildrenId?: string | null;
    noteEmojiId?: string | null;
  } | null;
};

export type CreateEmojiMutationVariables = {
  input: CreateEmojiInput;
  condition?: ModelEmojiConditionInput | null;
};

export type CreateEmojiMutation = {
  createEmoji?: {
    __typename: 'Emoji';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateEmojiMutationVariables = {
  input: UpdateEmojiInput;
  condition?: ModelEmojiConditionInput | null;
};

export type UpdateEmojiMutation = {
  updateEmoji?: {
    __typename: 'Emoji';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteEmojiMutationVariables = {
  input: DeleteEmojiInput;
  condition?: ModelEmojiConditionInput | null;
};

export type DeleteEmojiMutation = {
  deleteEmoji?: {
    __typename: 'Emoji';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type GetNoteQueryVariables = {
  id: string;
};

export type GetNoteQuery = {
  getNote?: {
    __typename: 'Note';
    id: string;
    title: string;
    description: string;
    expanded: boolean;
    level: number;
    orderNumber: number;
    emoji?: {
      __typename: 'Emoji';
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    } | null;
    parent?: {
      __typename: 'Note';
      id: string;
      title: string;
      description: string;
      expanded: boolean;
      level: number;
      orderNumber: number;
      emoji?: {
        __typename: 'Emoji';
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
      } | null;
      parent?: {
        __typename: 'Note';
        id: string;
        title: string;
        description: string;
        expanded: boolean;
        level: number;
        orderNumber: number;
        createdAt: string;
        updatedAt: string;
        noteChildrenId?: string | null;
        noteEmojiId?: string | null;
      } | null;
      children?: {
        __typename: 'ModelNoteConnection';
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      noteChildrenId?: string | null;
      noteEmojiId?: string | null;
    } | null;
    children?: {
      __typename: 'ModelNoteConnection';
      items: Array<{
        __typename: 'Note';
        id: string;
        title: string;
        description: string;
        expanded: boolean;
        level: number;
        orderNumber: number;
        createdAt: string;
        updatedAt: string;
        noteChildrenId?: string | null;
        noteEmojiId?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    noteChildrenId?: string | null;
    noteEmojiId?: string | null;
  } | null;
};

export type ListNotesQueryVariables = {
  id?: string | null;
  filter?: ModelNoteFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListNotesQuery = {
  listNotes?: {
    __typename: 'ModelNoteConnection';
    items: Array<{
      __typename: 'Note';
      id: string;
      title: string;
      description: string;
      expanded: boolean;
      level: number;
      orderNumber: number;
      emoji?: {
        __typename: 'Emoji';
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
      } | null;
      parent?: {
        __typename: 'Note';
        id: string;
        title: string;
        description: string;
        expanded: boolean;
        level: number;
        orderNumber: number;
        createdAt: string;
        updatedAt: string;
        noteChildrenId?: string | null;
        noteEmojiId?: string | null;
      } | null;
      children?: {
        __typename: 'ModelNoteConnection';
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      noteChildrenId?: string | null;
      noteEmojiId?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetEmojiQueryVariables = {
  id: string;
};

export type GetEmojiQuery = {
  getEmoji?: {
    __typename: 'Emoji';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListEmojisQueryVariables = {
  filter?: ModelEmojiFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListEmojisQuery = {
  listEmojis?: {
    __typename: 'ModelEmojiConnection';
    items: Array<{
      __typename: 'Emoji';
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type OnCreateNoteSubscriptionVariables = {
  filter?: ModelSubscriptionNoteFilterInput | null;
};

export type OnCreateNoteSubscription = {
  onCreateNote?: {
    __typename: 'Note';
    id: string;
    title: string;
    description: string;
    expanded: boolean;
    level: number;
    orderNumber: number;
    emoji?: {
      __typename: 'Emoji';
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    } | null;
    parent?: {
      __typename: 'Note';
      id: string;
      title: string;
      description: string;
      expanded: boolean;
      level: number;
      orderNumber: number;
      emoji?: {
        __typename: 'Emoji';
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
      } | null;
      parent?: {
        __typename: 'Note';
        id: string;
        title: string;
        description: string;
        expanded: boolean;
        level: number;
        orderNumber: number;
        createdAt: string;
        updatedAt: string;
        noteChildrenId?: string | null;
        noteEmojiId?: string | null;
      } | null;
      children?: {
        __typename: 'ModelNoteConnection';
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      noteChildrenId?: string | null;
      noteEmojiId?: string | null;
    } | null;
    children?: {
      __typename: 'ModelNoteConnection';
      items: Array<{
        __typename: 'Note';
        id: string;
        title: string;
        description: string;
        expanded: boolean;
        level: number;
        orderNumber: number;
        createdAt: string;
        updatedAt: string;
        noteChildrenId?: string | null;
        noteEmojiId?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    noteChildrenId?: string | null;
    noteEmojiId?: string | null;
  } | null;
};

export type OnUpdateNoteSubscriptionVariables = {
  filter?: ModelSubscriptionNoteFilterInput | null;
};

export type OnUpdateNoteSubscription = {
  onUpdateNote?: {
    __typename: 'Note';
    id: string;
    title: string;
    description: string;
    expanded: boolean;
    level: number;
    orderNumber: number;
    emoji?: {
      __typename: 'Emoji';
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    } | null;
    parent?: {
      __typename: 'Note';
      id: string;
      title: string;
      description: string;
      expanded: boolean;
      level: number;
      orderNumber: number;
      emoji?: {
        __typename: 'Emoji';
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
      } | null;
      parent?: {
        __typename: 'Note';
        id: string;
        title: string;
        description: string;
        expanded: boolean;
        level: number;
        orderNumber: number;
        createdAt: string;
        updatedAt: string;
        noteChildrenId?: string | null;
        noteEmojiId?: string | null;
      } | null;
      children?: {
        __typename: 'ModelNoteConnection';
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      noteChildrenId?: string | null;
      noteEmojiId?: string | null;
    } | null;
    children?: {
      __typename: 'ModelNoteConnection';
      items: Array<{
        __typename: 'Note';
        id: string;
        title: string;
        description: string;
        expanded: boolean;
        level: number;
        orderNumber: number;
        createdAt: string;
        updatedAt: string;
        noteChildrenId?: string | null;
        noteEmojiId?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    noteChildrenId?: string | null;
    noteEmojiId?: string | null;
  } | null;
};

export type OnDeleteNoteSubscriptionVariables = {
  filter?: ModelSubscriptionNoteFilterInput | null;
};

export type OnDeleteNoteSubscription = {
  onDeleteNote?: {
    __typename: 'Note';
    id: string;
    title: string;
    description: string;
    expanded: boolean;
    level: number;
    orderNumber: number;
    emoji?: {
      __typename: 'Emoji';
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    } | null;
    parent?: {
      __typename: 'Note';
      id: string;
      title: string;
      description: string;
      expanded: boolean;
      level: number;
      orderNumber: number;
      emoji?: {
        __typename: 'Emoji';
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
      } | null;
      parent?: {
        __typename: 'Note';
        id: string;
        title: string;
        description: string;
        expanded: boolean;
        level: number;
        orderNumber: number;
        createdAt: string;
        updatedAt: string;
        noteChildrenId?: string | null;
        noteEmojiId?: string | null;
      } | null;
      children?: {
        __typename: 'ModelNoteConnection';
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      noteChildrenId?: string | null;
      noteEmojiId?: string | null;
    } | null;
    children?: {
      __typename: 'ModelNoteConnection';
      items: Array<{
        __typename: 'Note';
        id: string;
        title: string;
        description: string;
        expanded: boolean;
        level: number;
        orderNumber: number;
        createdAt: string;
        updatedAt: string;
        noteChildrenId?: string | null;
        noteEmojiId?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    noteChildrenId?: string | null;
    noteEmojiId?: string | null;
  } | null;
};

export type OnCreateEmojiSubscriptionVariables = {
  filter?: ModelSubscriptionEmojiFilterInput | null;
};

export type OnCreateEmojiSubscription = {
  onCreateEmoji?: {
    __typename: 'Emoji';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateEmojiSubscriptionVariables = {
  filter?: ModelSubscriptionEmojiFilterInput | null;
};

export type OnUpdateEmojiSubscription = {
  onUpdateEmoji?: {
    __typename: 'Emoji';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteEmojiSubscriptionVariables = {
  filter?: ModelSubscriptionEmojiFilterInput | null;
};

export type OnDeleteEmojiSubscription = {
  onDeleteEmoji?: {
    __typename: 'Emoji';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};
