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
      orderNumber
      emoji {
        id
        name
        createdAt
        updatedAt
      }
      childrenIds {
        items {
          id
          childrenId
          createdAt
          updatedAt
          noteChildrenIdsId
        }
        nextToken
      }
      parentId
      createdAt
      updatedAt
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
      orderNumber
      emoji {
        id
        name
        createdAt
        updatedAt
      }
      childrenIds {
        items {
          id
          childrenId
          createdAt
          updatedAt
          noteChildrenIdsId
        }
        nextToken
      }
      parentId
      createdAt
      updatedAt
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
      orderNumber
      emoji {
        id
        name
        createdAt
        updatedAt
      }
      childrenIds {
        items {
          id
          childrenId
          createdAt
          updatedAt
          noteChildrenIdsId
        }
        nextToken
      }
      parentId
      createdAt
      updatedAt
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
export const createChildrenId = /* GraphQL */ `
  mutation CreateChildrenId(
    $input: CreateChildrenIdInput!
    $condition: ModelChildrenIdConditionInput
  ) {
    createChildrenId(input: $input, condition: $condition) {
      id
      childrenId
      createdAt
      updatedAt
      noteChildrenIdsId
    }
  }
`;
export const updateChildrenId = /* GraphQL */ `
  mutation UpdateChildrenId(
    $input: UpdateChildrenIdInput!
    $condition: ModelChildrenIdConditionInput
  ) {
    updateChildrenId(input: $input, condition: $condition) {
      id
      childrenId
      createdAt
      updatedAt
      noteChildrenIdsId
    }
  }
`;
export const deleteChildrenId = /* GraphQL */ `
  mutation DeleteChildrenId(
    $input: DeleteChildrenIdInput!
    $condition: ModelChildrenIdConditionInput
  ) {
    deleteChildrenId(input: $input, condition: $condition) {
      id
      childrenId
      createdAt
      updatedAt
      noteChildrenIdsId
    }
  }
`;
