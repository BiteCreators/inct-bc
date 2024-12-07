import { gql } from '@/common/__generated-types__'

export const GET_USERS_FOR_LIST = gql(`
  query GET_USERS_FOR_LIST(
    $pageSize: Int = 10
    $pageNumber: Int = 1
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
  ){
    getUsers(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
  ) {
    users{
      id
      userName
      email
      createdAt
      userBan{
        reason
        createdAt
      }
    }
    pagination{
        pagesCount
        page
        pageSize
        totalCount
    }
  }
}
`)
