import React from 'react'

import { TableWithPagination } from '@packages/shared/ui'
import { Header } from '@packages/shared/ui/table-with-pagination/TableWithPagination'

import s from './styles.module.scss'

import { Follow } from '../../types'
import { exampleFollowPaginationModel } from '../testData'
export const UserFollowing = () => {
  const headers: Header[] = [
    {
      name: 'User ID',
    },
    {
      name: 'Username',
      sort: null,
    },
    {
      name: 'Profile link',
    },
    {
      name: 'Subscription Date',
      sort: null,
    },
  ]
  const exampleUsersData = exampleFollowPaginationModel.items?.map((el: Follow) => {
    return {
      1: el.userId,
      2: 'Ivan Ivanov', //Todo: get user first and last name
      3: el.userName,
      4: new Date(el.createdAt).toLocaleDateString(),
    }
  })

  return (
    <div className={s.table}>
      <TableWithPagination headers={headers} tableData={exampleUsersData} />
    </div>
  )
}
