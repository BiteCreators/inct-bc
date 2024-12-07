import { useState } from 'react'

import { GET_USERS_FOR_LIST } from '@/features/users/users-list/model/usersQueries'
import { useQuery } from '@apollo/client'

export const useUsers = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const {
    data: usersListData,
    error: usersListError,
    loading: usersListLoading,
  } = useQuery(GET_USERS_FOR_LIST, {
    fetchPolicy: 'no-cache',
    variables: { pageNumber, pageSize },
  })

  const handlerPageNumber = (pageNumber: number) => {
    setPageNumber(pageNumber)
  }

  const handlerPageSize = (pageSize: string) => {
    setPageSize(+pageSize)
  }

  return {
    handlerPageNumber,
    handlerPageSize,
    usersListData,
    usersListError,
    usersListLoading,
  }
}
