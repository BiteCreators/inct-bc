import { useState } from 'react'

import { SortDirection } from '@/common/__generated-types__/graphql'
import { useQuery } from '@apollo/client'
import { TableHeader } from '@packages/shared/ui'

import { GET_USERS } from './usersQueries'

export const useUsers = () => {
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)
  const [sortDirectionBtnUserName, setSortDirectionBtnUserName] = useState<'asc' | 'desc' | null>(
    null
  )
  const [sortDirectionBtnDate, setSortDirectionBtnDate] = useState<'asc' | 'desc' | null>('desc')

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const { data, error, loading } = useQuery(GET_USERS, {
    fetchPolicy: 'no-cache',
    variables: { pageNumber, pageSize, sortBy, sortDirection },
  })

  const tableHeaderData: TableHeader[] = [
    {
      name: 'User ID',
    },
    {
      name: 'Username',
    },
    {
      name: 'Profile link',
      onClickSortButton: () => {
        setSortBy('userName')
        setSortDirection(
          sortDirection === SortDirection.Desc ? SortDirection.Asc : SortDirection.Desc
        )
        setSortDirectionBtnUserName(sortDirection === SortDirection.Desc ? 'desc' : 'asc')
        setSortDirectionBtnDate(null)
      },
      sort: sortDirectionBtnUserName,
    },
    {
      name: 'Date added',
      onClickSortButton: () => {
        setSortBy('createdAt')
        setSortDirection(
          sortDirection === SortDirection.Desc ? SortDirection.Asc : SortDirection.Desc
        )
        setSortDirectionBtnDate(sortDirection === SortDirection.Desc ? 'asc' : 'desc')
        setSortDirectionBtnUserName(null)
      },
      sort: sortDirectionBtnDate,
    },
    {
      name: '',
    },
  ]

  const handlerPageSize = (pagesPortion: string) => setPageSize(+pagesPortion)
  const handlerPageNumber = (page: number) => setPageNumber(page)

  return {
    data,
    error,
    handlerPageNumber,
    handlerPageSize,
    loading,
    pageNumber,
    pageSize,
    tableHeaderData,
  }
}
