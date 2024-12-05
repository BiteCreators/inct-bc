import React from 'react'

import { Block } from '@packages/shared/assets'
import { Alert, Pagination, Table } from '@packages/shared/ui'
import { LoaderBlock } from '@packages/shared/ui/loader/LoaderBlock'

import s from './styles.module.scss'

import { useUsers } from '../../model/useUsers'
import { Options } from '../options/Options'

export const UsersTable = () => {
  const {
    data,
    error,
    handlerPageNumber,
    handlerPageSize,
    loading,
    pageNumber,
    pageSize,
    tableHeaderData,
  } = useUsers()
  const tableData = data?.getUsers.users?.map(el => {
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
      {loading && <LoaderBlock />}
      <Table
        classNameHeadersItem={s.table__headers}
        headers={tableHeaderData}
        tableData={tableData || []}
      />
      {data
        ? data?.getUsers.pagination.totalCount > 10 && (
            <Pagination
              className={'justify-start'}
              currentPage={pageNumber}
              onChangePagesPortion={handlerPageSize}
              onClickPaginationButton={handlerPageNumber}
              pagesCount={data?.getUsers.pagination.pagesCount}
              pagesPortion={String(pageSize)}
            />
          )
        : null}
      {error?.message && <Alert message={error?.message} purpose={'alert'} type={'error'}></Alert>}
    </div>
  )
}
