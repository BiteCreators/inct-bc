import React from 'react'

import { Block } from '@packages/shared/assets'
import { TableWithPagination } from '@packages/shared/ui'
import { Header } from '@packages/shared/ui/table-with-pagination/TableWithPagination'

import s from './styles.module.scss'

import { User } from '../../types'
import { exampleUsersPaginationModel } from '../testData'
import { Options } from './Options'

export const UsersTable = () => {
  const headers: Header[] = [
    {
      name: 'User ID',
    },
    {
      name: 'Username',
      sort: 'desc',
    },
    {
      name: 'Profile link',
    },
    {
      name: 'Date added',
      sort: null,
    },
    {
      name: '',
    },
  ]
  const exampleUsersData = exampleUsersPaginationModel.users?.map((el: User) => {
    return {
      1: (
        <div className={s.table__users}>
          <div className={s.table__bun}>{!!el.userBan?.reason && <Block />}</div>
          {el.id}
        </div>
      ),
      2: <span>{`${el.profile.firstName} ${el.profile.lastName}`}</span>,
      3: el.userName,
      4: new Date(el.createdAt).toLocaleDateString(),
      5: <Options firstName={el.profile.firstName} lastName={el.profile.lastName} />,
    }
  })

  return (
    <div className={s.table}>
      <TableWithPagination
        classNameHeadersItem={s.table__headers}
        headers={headers}
        tableData={exampleUsersData}
      />
    </div>
  )
}
