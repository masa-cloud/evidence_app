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
export const getChildrenId = /* GraphQL */ `
  query GetChildrenId($id: ID!) {
    getChildrenId(id: $id) {
      id
      childrenId
      createdAt
      updatedAt
      noteChildrenIdsId
    }
  }
`;
export const listChildrenIds = /* GraphQL */ `
  query ListChildrenIds(
    $filter: ModelChildrenIdFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChildrenIds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        childrenId
        createdAt
        updatedAt
        noteChildrenIdsId
      }
      nextToken
    }
  }
`;
