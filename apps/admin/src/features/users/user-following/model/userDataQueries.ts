import { gql } from '@/common/__generated-types__'

export const GET_USER_DATA = gql(`
query GetUserData($userId: Int!) {
    getUser(userId: $userId) {
      id
      userName
      createdAt
      profile {
        firstName
        lastName
      }
    }
  }`)
