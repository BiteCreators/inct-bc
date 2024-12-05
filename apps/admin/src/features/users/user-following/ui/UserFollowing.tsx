import React from 'react'

import { Alert, Pagination, Table } from '@packages/shared/ui'
import { LoaderBlock } from '@packages/shared/ui/loader/LoaderBlock'
import Link from 'next/link'

import s from './styles.module.scss'

import { useFollowing } from '../model/useFollowing'

export const UserFollowing = () => {
  const {
    data,
    error,
    handlerPageNumber,
    handlerPageSize,
    loading,
    pageNumber,
    pageSize,
    tableHeaderData,
  } = useFollowing()

  const tableData = data?.getFollowing.items.map(el => {
    return {
      1: el.userId,
      2: el.userName,
      3: <Link href={`profile/${el.userId}`}>{el.userName}</Link>,
      4: new Date(el.createdAt).toLocaleDateString(),
    }
  })

  return (
    <div className={s.table}>
      {loading && <LoaderBlock />}
      <Table headers={tableHeaderData} tableData={tableData || []} />
      {data
        ? data?.getFollowing.totalCount > 10 && (
            <Pagination
              className={'justify-start'}
              currentPage={pageNumber}
              onChangePagesPortion={handlerPageSize}
              onClickPaginationButton={handlerPageNumber}
              pagesCount={data?.getFollowing.pagesCount}
              pagesPortion={String(pageSize)}
            />
          )
        : null}
      {error?.message && <Alert message={error?.message} purpose={'alert'} type={'error'}></Alert>}
    </div>
  )
}
