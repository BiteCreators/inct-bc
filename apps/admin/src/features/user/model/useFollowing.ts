import { useState } from 'react'

import { useSortUsers } from '@/common/lib/hooks/useSortUsers'
import { useQuery } from '@apollo/client'
import { TableHeader } from '@packages/shared/ui'
import { useRouter } from 'next/router'

import { GET_FOLLOWING } from '../api/followingQuery'

export const useFollowing = () => {
  const { query } = useRouter()

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

  const { data, error, loading } = useQuery(GET_FOLLOWING, {
    fetchPolicy: 'no-cache',
    variables: { pageNumber, pageSize, sortBy, sortDirection, userId: query.id ? +query.id : 1 },
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
      name: 'Subscription Date',
      onClickSortButton: sortDate,
      sort: sortDirectionBtnDate,
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
