import { useState } from 'react'

import { SortDirection, UserBlockStatus } from '@/common/__generated-types__/graphql'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { GET_USERS } from '../api/usersQuery'

type QueryParams = {
  block_status_filter?: UserBlockStatus
  sort?: string
  user_name?: string
}

export const useUsersTable = () => {
  const router = useRouter()
  const {
    block_status_filter: blockStatusFilter,
    sort,
    user_name: userNameSearch,
  }: QueryParams = router.query

  const [currentPage, setCurrentPage] = useState(1)
  const [dataPortion, setDataPortion] = useState(10)

  const [sortBy, sortDirection] = sort ? sort.split('_') : []

  const { data, error, loading } = useQuery(GET_USERS, {
    variables: {
      pageNumber: currentPage,
      pageSize: dataPortion,
      searchTerm: userNameSearch,
      sortBy,
      sortDirection: sortDirection as SortDirection,
      statusFilter: blockStatusFilter ?? UserBlockStatus.All,
    },
  })

  const handleDataPortionChange = (dataPortion: string) => {
    setDataPortion(Number(dataPortion))
  }
  const handlePaginationButtonClick = (page: number) => {
    setCurrentPage(page)
  }

  const pagesCount = data?.getUsers?.pagination?.totalCount
    ? Math.ceil(data?.getUsers?.pagination?.totalCount / Number(dataPortion ?? 10))
    : 1

  return {
    currentPage,
    data,
    error,
    handleDataPortionChange,
    handlePaginationButtonClick,
    loading,
    pagesCount,
  }
}
