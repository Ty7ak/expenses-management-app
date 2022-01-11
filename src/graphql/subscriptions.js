/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTransaction = /* GraphQL */ `
  subscription OnCreateTransaction($owner: String) {
    onCreateTransaction(owner: $owner) {
      amount
      category
      date
      id
      type
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction($owner: String) {
    onUpdateTransaction(owner: $owner) {
      amount
      category
      date
      id
      type
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteTransaction = /* GraphQL */ `
  subscription OnDeleteTransaction($owner: String) {
    onDeleteTransaction(owner: $owner) {
      amount
      category
      date
      id
      type
      createdAt
      updatedAt
      owner
    }
  }
`;
