import React from 'react'

import { useUsers } from '@/features/users/users-list/model/useUsers'
import { Block } from '@packages/shared/assets'
import { Alert, Pagination, Table } from '@packages/shared/ui'
import { LoaderBlock } from '@packages/shared/ui/loader/LoaderBlock'
import Link from 'next/link'

import s from './styles.module.scss'

import { Options } from '../options/Options'

export const UsersTable = () => {
  const {
    handlerPageNumber,
    handlerPageSize,
    tableHeaderData,
    usersListData,
    usersListError,
    usersListLoading,
  } = useUsers()

  const exampleUsersData = usersListData?.getUsers.users.map(user => {
    return {
      1: (
        <div className={s.users}>
          <div className={s.bun}>{!!user.userBan?.reason && <Block />}</div>
          {user.id}
        </div>
      ),
      2: <span>{user.userName}</span>,
      3: <Link href={`users/${user.id}`}>{user.userName}</Link>,
      4: new Date(user.createdAt).toLocaleDateString(),
      5: <Options userName={user.userName} />,
    }
  })

  return (
    <div className={s.table}>
      {usersListLoading && <LoaderBlock />}
      <Table
        classNameHeadersItem={s.headers}
        headers={tableHeaderData}
        tableData={exampleUsersData || []}
      />
      {usersListData
        ? usersListData?.getUsers.pagination.totalCount > 10 && (
            <Pagination
              className={s.pagination}
              currentPage={usersListData?.getUsers.pagination.page || 1}
              onChangePagesPortion={handlerPageSize}
              onClickPaginationButton={handlerPageNumber}
              pagesCount={usersListData?.getUsers.pagination.pagesCount || 1}
              pagesPortion={String(usersListData?.getUsers.pagination.pageSize || 10)}
            />
          )
        : null}

      {usersListError?.message && (
        <Alert message={usersListError?.message} purpose={'alert'} type={'error'}></Alert>
      )}
    </div>
  )
}
