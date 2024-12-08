import { useState } from 'react'

import { SortDirection } from '@/common/__generated-types__/graphql'

export const useSortUsers = () => {
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)
  const [sortDirectionBtnUserName, setSortDirectionBtnUserName] = useState<'asc' | 'desc' | null>(
    null
  )
  const [sortDirectionBtnDate, setSortDirectionBtnDate] = useState<'asc' | 'desc' | null>('desc')

  const sortDate = () => {
    setSortBy('createdAt')
    setSortDirection(sortDirection === SortDirection.Desc ? SortDirection.Asc : SortDirection.Desc)
    setSortDirectionBtnDate(sortDirection === SortDirection.Desc ? 'asc' : 'desc')
    setSortDirectionBtnUserName(null)
  }
  const sortName = () => {
    setSortBy('userName')
    setSortDirection(sortDirection === SortDirection.Desc ? SortDirection.Asc : SortDirection.Desc)
    setSortDirectionBtnUserName(sortDirection === SortDirection.Desc ? 'desc' : 'asc')
    setSortDirectionBtnDate(null)
  }

  return {
    sortBy,
    sortDate,
    sortDirection,
    sortDirectionBtnDate,
    sortDirectionBtnUserName,
    sortName,
  }
}
