/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($filter: ModelSubscriptionNoteFilterInput) {
    onCreateNote(filter: $filter) {
      id
      title
      description
      expanded
      level
      type
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
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($filter: ModelSubscriptionNoteFilterInput) {
    onUpdateNote(filter: $filter) {
      id
      title
      description
      expanded
      level
      type
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
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($filter: ModelSubscriptionNoteFilterInput) {
    onDeleteNote(filter: $filter) {
      id
      title
      description
      expanded
      level
      type
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
export const onCreateEmoji = /* GraphQL */ `
  subscription OnCreateEmoji($filter: ModelSubscriptionEmojiFilterInput) {
    onCreateEmoji(filter: $filter) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEmoji = /* GraphQL */ `
  subscription OnUpdateEmoji($filter: ModelSubscriptionEmojiFilterInput) {
    onUpdateEmoji(filter: $filter) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEmoji = /* GraphQL */ `
  subscription OnDeleteEmoji($filter: ModelSubscriptionEmojiFilterInput) {
    onDeleteEmoji(filter: $filter) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChildrenId = /* GraphQL */ `
  subscription OnCreateChildrenId(
    $filter: ModelSubscriptionChildrenIdFilterInput
  ) {
    onCreateChildrenId(filter: $filter) {
      id
      childrenId
      createdAt
      updatedAt
      noteChildrenIdsId
    }
  }
`;
export const onUpdateChildrenId = /* GraphQL */ `
  subscription OnUpdateChildrenId(
    $filter: ModelSubscriptionChildrenIdFilterInput
  ) {
    onUpdateChildrenId(filter: $filter) {
      id
      childrenId
      createdAt
      updatedAt
      noteChildrenIdsId
    }
  }
`;
export const onDeleteChildrenId = /* GraphQL */ `
  subscription OnDeleteChildrenId(
    $filter: ModelSubscriptionChildrenIdFilterInput
  ) {
    onDeleteChildrenId(filter: $filter) {
      id
      childrenId
      createdAt
      updatedAt
      noteChildrenIdsId
    }
  }
`;
