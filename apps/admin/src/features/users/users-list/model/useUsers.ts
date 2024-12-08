import { useState } from 'react'

import { useQuery } from '@apollo/client'

import { GET_USERS_FOR_LIST } from './usersQueries'

export const useUsers = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const {
    data: usersListData,
    error: usersListError,
    loading: usersListLoading,
    refetch,
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

  const refetchUsers = () => {
    refetch({ pageNumber, pageSize })
  }

  return {
    handlerPageNumber,
    handlerPageSize,
    refetchUsers,
    usersListData,
    usersListError,
    usersListLoading,
  }
}
