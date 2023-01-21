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
      orderNumber
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
        orderNumber
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
          orderNumber
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
          orderNumber
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
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($filter: ModelSubscriptionNoteFilterInput) {
    onUpdateNote(filter: $filter) {
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
      parent {
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
        parent {
          id
          title
          description
          expanded
          level
          orderNumber
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
          orderNumber
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
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($filter: ModelSubscriptionNoteFilterInput) {
    onDeleteNote(filter: $filter) {
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
      parent {
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
        parent {
          id
          title
          description
          expanded
          level
          orderNumber
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
          orderNumber
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
