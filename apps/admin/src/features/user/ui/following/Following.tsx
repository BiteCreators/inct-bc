import React from 'react'

import { Table, TableHeader } from '@packages/shared/ui'

import s from './following.module.scss'

import { Follow } from '../../../users/types'
import { exampleFollowPaginationModel } from '../../model/testFollowingData'

export const Following = () => {
  const headers: TableHeader[] = [
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
      <Table headers={headers} tableData={exampleUsersData} />
    </div>
  )
}
