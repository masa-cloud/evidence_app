/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      title
      description
      expanded
      level
      order_number
      emoji {
        id
        name
        createdAt
        updatedAt
      }
      parent {
        id
        title
        description
        expanded
        level
        order_number
        emoji {
          id
          name
          createdAt
          updatedAt
        }
        parent {
          id
          title
          description
          expanded
          level
          order_number
          createdAt
          updatedAt
          noteChildrenId
          noteEmojiId
        }
        children {
          nextToken
        }
        createdAt
        updatedAt
        noteChildrenId
        noteEmojiId
      }
      children {
        items {
          id
          title
          description
          expanded
          level
          order_number
          createdAt
          updatedAt
          noteChildrenId
          noteEmojiId
        }
        nextToken
      }
      createdAt
      updatedAt
      noteChildrenId
      noteEmojiId
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      title
      description
      expanded
      level
      order_number
      emoji {
        id
        name
        createdAt
        updatedAt
      }
      parent {
        id
        title
        description
        expanded
        level
        order_number
        emoji {
          id
          name
          createdAt
          updatedAt
        }
        parent {
          id
          title
          description
          expanded
          level
          order_number
          createdAt
          updatedAt
          noteChildrenId
          noteEmojiId
        }
        children {
          nextToken
        }
        createdAt
        updatedAt
        noteChildrenId
        noteEmojiId
      }
      children {
        items {
          id
          title
          description
          expanded
          level
          order_number
          createdAt
          updatedAt
          noteChildrenId
          noteEmojiId
        }
        nextToken
      }
      createdAt
      updatedAt
      noteChildrenId
      noteEmojiId
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      title
      description
      expanded
      level
      order_number
      emoji {
        id
        name
        createdAt
        updatedAt
      }
      parent {
        id
        title
        description
        expanded
        level
        order_number
        emoji {
          id
          name
          createdAt
          updatedAt
        }
        parent {
          id
          title
          description
          expanded
          level
          order_number
          createdAt
          updatedAt
          noteChildrenId
          noteEmojiId
        }
        children {
          nextToken
        }
        createdAt
        updatedAt
        noteChildrenId
        noteEmojiId
      }
      children {
        items {
          id
          title
          description
          expanded
          level
          order_number
          createdAt
          updatedAt
          noteChildrenId
          noteEmojiId
        }
        nextToken
      }
      createdAt
      updatedAt
      noteChildrenId
      noteEmojiId
    }
  }
`;
export const createEmoji = /* GraphQL */ `
  mutation CreateEmoji(
    $input: CreateEmojiInput!
    $condition: ModelEmojiConditionInput
  ) {
    createEmoji(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateEmoji = /* GraphQL */ `
  mutation UpdateEmoji(
    $input: UpdateEmojiInput!
    $condition: ModelEmojiConditionInput
  ) {
    updateEmoji(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteEmoji = /* GraphQL */ `
  mutation DeleteEmoji(
    $input: DeleteEmojiInput!
    $condition: ModelEmojiConditionInput
  ) {
    deleteEmoji(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
