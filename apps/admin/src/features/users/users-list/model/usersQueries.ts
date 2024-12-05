import { gql } from '@/common/__generated-types__'

export const GET_USERS = gql(`
  query GetUsers(
    $pageSize: Int = 10
    $pageNumber: Int = 1
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
    $searchTerm: String
    $statusFilter: UserBlockStatus = ALL
  ) {
    getUsers(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
      statusFilter: $statusFilter
    ) {
			pagination {
				pagesCount
				totalCount
				pageSize
				page
			}
			users {
				id
        userName
        createdAt
        profile {
          firstName
          lastName
        }
        userBan {
          reason
        }
			}
    }
  }
`)
