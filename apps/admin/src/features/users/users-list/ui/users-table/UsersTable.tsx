import React from 'react'

import { Block } from '@packages/shared/assets'
import { Alert, Loader, Pagination, Table, TableData, TableHeader } from '@packages/shared/ui'
import Link from 'next/link'

import s from './styles.module.scss'

import { useUsersTable } from '../../model/useUsersTable'
import { Options } from '../options/Options'

type User = {
  createdAt: any
  id: number
  profile: {
    firstName?: null | string
    lastName?: null | string
  }
  userBan?: {
    reason: string
  } | null
  userName: string
}

export const UsersTable = () => {
  const {
    currentPage,
    data,
    error,
    handleAddedDateSortButtonClick,
    handleDataPortionChange,
    handlePaginationButtonClick,
    handleUserNameSortButtonClick,
    loading,
    pagesCount,
    sortByDateAdded,
    sortByName,
  } = useUsersTable()
  const headers: TableHeader[] = [
    {
      name: 'User ID',
    },
    {
      name: 'Username',
      onClickSortButton: handleUserNameSortButtonClick,
      sort: sortByName ?? null,
    },
    {
      name: 'Profile link',
    },
    {
      name: 'Date added',
      onClickSortButton: handleAddedDateSortButtonClick,
      sort: sortByDateAdded ?? null,
    },
    {
      name: '',
    },
  ]
  let usersData = [] as TableData[]

  if (data?.getUsers.users) {
    usersData = data.getUsers.users.map((el: User) => {
      return {
        1: (
          <div className={s.table__users}>
            <div className={s.table__bun}>{!!el.userBan?.reason && <Block />}</div>
            {el.id}
          </div>
        ),
        2: <span>{el.userName}</span>,
        3: <Link href={`/users/${el.id}`}>{el.userName}</Link>,
        4: new Date(el.createdAt).toLocaleDateString(),
        5: <Options userName={el.profile.firstName || el.userName} />,
      }
    })
  }

  return (
    <div className={s.table}>
      {loading && <Loader fullScreen />}
      <Table classNameHeadersItem={s.table__headers} headers={headers} tableData={usersData} />
      <Pagination
        currentPage={currentPage}
        onChangePagesPortion={handleDataPortionChange}
        onClickPaginationButton={handlePaginationButtonClick}
        pagesCount={pagesCount}
      />
      {error && <Alert message={error.message} type={'error'} />}
    </div>
  )
}
