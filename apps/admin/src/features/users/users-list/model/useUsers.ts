import { useState } from 'react'

import { useSortUsers } from '@/common/lib/hooks/useSortUsers'
import { GET_USERS_FOR_LIST } from '@/features/users/users-list/model/usersQueries'
import { useQuery } from '@apollo/client'
import { TableHeader } from '@packages/shared/ui'

export const useUsers = () => {
  const {
    sortBy,
    sortDate,
    sortDirection,
    sortDirectionBtnDate,
    sortDirectionBtnUserName,
    sortName,
  } = useSortUsers()

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const {
    data: usersListData,
    error: usersListError,
    loading: usersListLoading,
  } = useQuery(GET_USERS_FOR_LIST, {
    fetchPolicy: 'no-cache',
    variables: { pageNumber, pageSize, sortBy, sortDirection },
  })

  const tableHeaderData: TableHeader[] = [
    {
      name: 'User ID',
    },
    {
      name: 'Username',
      onClickSortButton: sortName,
      sort: sortDirectionBtnUserName,
    },
    {
      name: 'Profile link',
    },
    {
      name: 'Date added',
      onClickSortButton: sortDate,
      sort: sortDirectionBtnDate,
    },
    {
      name: '',
    },
  ]

  const handlerPageNumber = (pageNumber: number) => {
    setPageNumber(pageNumber)
  }

  const handlerPageSize = (pageSize: string) => {
    setPageSize(+pageSize)
  }

  return {
    handlerPageNumber,
    handlerPageSize,
    tableHeaderData,
    usersListData,
    usersListError,
    usersListLoading,
  }
}
