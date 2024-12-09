import { useCallback, useEffect, useState } from 'react'

import { SortDirection } from '@/common/__generated-types__/graphql'
import { GET_USERS_FOR_LIST } from '@/features/users/users-list/model/usersQueries'
import { useQuery } from '@apollo/client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

export const useUsers = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const [sortBy, setSortBy] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection | null>(null)

  const [sortDirectionBtnUsername, setSortDirectionBtnUsername] = useState<SortDirection | null>(
    null
  )
  const [sortDirectionBtnDate, setSortDirectionBtnDate] = useState<SortDirection | null>(null)

  const {
    data: usersListData,
    error: usersListError,
    loading: usersListLoading,
  } = useQuery(GET_USERS_FOR_LIST, {
    fetchPolicy: 'no-cache',
    variables: { pageNumber, pageSize, sortBy, sortDirection },
  })

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback((sortBy: string, sortDirection: string) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set(sortBy, sortDirection)

    return params.toString()
  }, [])

  const sortDirectionValue =
    sortDirection === SortDirection.Desc ? SortDirection.Asc : SortDirection.Desc

  const handlerPageNumber = (pageNumber: number) => {
    setPageNumber(pageNumber)
  }

  const handlerPageSize = (pageSize: string) => {
    setPageSize(+pageSize)
  }

  const handlerSortByCreatedAt = () => {
    setSortBy('createdAt')
    setSortDirection(sortDirectionValue)
    setSortDirectionBtnDate(sortDirectionValue)
    setSortDirectionBtnUsername(null)
    router.replace(pathname)
    router.push(pathname + '?' + createQueryString('createdAt', sortDirectionValue))
  }

  const handlerSortByName = () => {
    setSortBy('userName')
    setSortDirection(sortDirectionValue)
    setSortDirectionBtnUsername(sortDirectionValue)
    setSortDirectionBtnDate(null)
    router.replace(pathname)
    router.push(pathname + '?' + createQueryString('userName', sortDirectionValue))
  }

  useEffect(() => {
    router.replace(pathname)
  }, [])

  return {
    handlerPageNumber,
    handlerPageSize,
    handlerSortByCreatedAt,
    handlerSortByName,
    sortDirection,
    sortDirectionBtnDate,
    sortDirectionBtnUsername,
    usersListData,
    usersListError,
    usersListLoading,
  }
}
