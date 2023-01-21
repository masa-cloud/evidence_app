/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
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
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $id: ID
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listNotes(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getEmoji = /* GraphQL */ `
  query GetEmoji($id: ID!) {
    getEmoji(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listEmojis = /* GraphQL */ `
  query ListEmojis(
    $filter: ModelEmojiFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmojis(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
