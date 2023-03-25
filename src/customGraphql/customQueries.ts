/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const notesByOrderNumberGEetTitleEmojiChildren = /* GraphQL */ `
  query NotesByOrderNumber(
    $type: String!
    $orderNumber: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notesByOrderNumber(type: $type, orderNumber: $orderNumber, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
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
        noteEmojiId
      }
      nextToken
    }
  }
`;
