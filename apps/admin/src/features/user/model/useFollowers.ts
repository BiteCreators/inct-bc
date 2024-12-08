import { useState } from 'react'

import { useSortUsers } from '@/common/lib/hooks/useSortUsers'
import { GET_FOLLOWERS } from '@/features/user/api/followersQueries'
import { useQuery } from '@apollo/client'
import { useScopedTranslation } from '@packages/shared/hooks'
import { useRouter } from 'next/router'

export const useFollowers = () => {
  const { query } = useRouter()
  const t = useScopedTranslation('FollowersAdmin')

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

  const { data, error, loading } = useQuery(GET_FOLLOWERS, {
    fetchPolicy: 'no-cache',
    variables: { pageNumber, pageSize, sortBy, sortDirection, userId: query.id ? +query.id : 737 },
  })

  const tableHeaderData = [
    {
      name: t.userId,
    },
    {
      name: t.userName,
      onClickSortButton: sortName,
      sort: sortDirectionBtnUserName,
    },
    { name: t.profileLink },
    {
      name: t.subscriptionDate,
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
