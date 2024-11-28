/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query GetFollowers(\n    $pageSize: Int = 10\n    $pageNumber: Int = 1\n    $sortBy: String = \"createdAt\"\n    $sortDirection: SortDirection = desc\n    $userId: Int!\n  ){\n    getFollowers(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      userId: $userId,\n  ) {\n    pagesCount\n    totalCount\n    pageSize\n    page\n    items{\n      id\n      userId\n      userName\n      createdAt\n      }\n  }\n}\n": types.GetFollowersDocument,
    "\nquery GetUser($userId: Int!) {\n    getUser(userId: $userId) {\n      id\n      userName\n      email\n      createdAt\n      profile {\n        firstName\n        lastName\n        avatars {\n          url\n        }\n      }\n      userBan {\n        createdAt\n        reason\n      }\n    }\n  }": types.GetUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetFollowers(\n    $pageSize: Int = 10\n    $pageNumber: Int = 1\n    $sortBy: String = \"createdAt\"\n    $sortDirection: SortDirection = desc\n    $userId: Int!\n  ){\n    getFollowers(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      userId: $userId,\n  ) {\n    pagesCount\n    totalCount\n    pageSize\n    page\n    items{\n      id\n      userId\n      userName\n      createdAt\n      }\n  }\n}\n"): (typeof documents)["\n  query GetFollowers(\n    $pageSize: Int = 10\n    $pageNumber: Int = 1\n    $sortBy: String = \"createdAt\"\n    $sortDirection: SortDirection = desc\n    $userId: Int!\n  ){\n    getFollowers(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      userId: $userId,\n  ) {\n    pagesCount\n    totalCount\n    pageSize\n    page\n    items{\n      id\n      userId\n      userName\n      createdAt\n      }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetUser($userId: Int!) {\n    getUser(userId: $userId) {\n      id\n      userName\n      email\n      createdAt\n      profile {\n        firstName\n        lastName\n        avatars {\n          url\n        }\n      }\n      userBan {\n        createdAt\n        reason\n      }\n    }\n  }"): (typeof documents)["\nquery GetUser($userId: Int!) {\n    getUser(userId: $userId) {\n      id\n      userName\n      email\n      createdAt\n      profile {\n        firstName\n        lastName\n        avatars {\n          url\n        }\n      }\n      userBan {\n        createdAt\n        reason\n      }\n    }\n  }"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;