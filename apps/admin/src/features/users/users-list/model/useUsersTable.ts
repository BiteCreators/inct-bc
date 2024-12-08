import { SortDirection, UserBlockStatus } from '@/common/__generated-types__/graphql'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { GET_USERS } from '../api/usersQueries'

type QueryParams = {
  block_status_filter?: UserBlockStatus
  data_portion?: string
  filter?: string
  page?: string
  sort_by_date_added?: SortDirection
  sort_by_name?: SortDirection
  user_name?: string
}

export const useUsersTable = () => {
  const router = useRouter()
  const {
    block_status_filter: blockStatusFilter,
    data_portion: dataPortion,
    page: currentPage,
    sort_by_date_added: sortByDateAdded,
    sort_by_name: sortByName,
    user_name: userNameSearch,
  }: QueryParams = router.query

  const { data, error, loading } = useQuery(GET_USERS, {
    variables: {
      pageNumber: Number(currentPage ?? 1),
      pageSize: Number(dataPortion ?? 10),
      searchTerm: userNameSearch,
      sortBy: (sortByName && 'userName') || (sortByDateAdded && 'createdAt') || undefined,
      sortDirection: sortByName || sortByDateAdded || undefined,
      statusFilter: blockStatusFilter ?? UserBlockStatus.All,
    },
  })
  const handleDataPortionChange = (dataPortion: string) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        data_portion: dataPortion,
      },
    })
  }
  const handlePaginationButtonClick = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page,
      },
    })
  }

  const handleUserNameSortButtonClick = () => {
    const sort =
      (!sortByName && SortDirection.Asc) ||
      (sortByName === SortDirection.Asc && SortDirection.Desc) ||
      (sortByName === SortDirection.Desc && SortDirection.Asc)

    delete router.query['sort_by_date_added']
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        sort_by_name: sort,
      },
    })
  }
  const handleAddedDateSortButtonClick = () => {
    const sort =
      (!sortByDateAdded && SortDirection.Asc) ||
      (sortByDateAdded === SortDirection.Asc && SortDirection.Desc) ||
      (sortByDateAdded === SortDirection.Desc && SortDirection.Asc)

    delete router.query['sort_by_name']
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        sort_by_date_added: sort,
      },
    })
  }

  const pagesCount = data?.getUsers?.pagination?.totalCount
    ? Math.ceil(data?.getUsers?.pagination?.totalCount / Number(dataPortion ?? 10))
    : 1

  return {
    currentPage: Number(currentPage ?? 1),
    data,
    error,
    handleAddedDateSortButtonClick,
    handleDataPortionChange,
    handlePaginationButtonClick,
    handleUserNameSortButtonClick,
    loading,
    pagesCount,
    sortByDateAdded,
    sortByName,
  }
}
