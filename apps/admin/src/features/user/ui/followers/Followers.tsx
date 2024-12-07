import React from 'react'

import { useFollowers } from '@/features/user/model/useFollowers'
import { Alert, Pagination, Table } from '@packages/shared/ui'
import Link from 'next/link'

import { LoaderBlock } from '../../../../../../../packages/shared/src/ui/loader/LoaderBlock'

export const Followers = () => {
  const {
    data,
    error,
    handlerPageNumber,
    handlerPageSize,
    loading,
    pageNumber,
    pageSize,
    tableHeaderData,
  } = useFollowers()

  const tableData = data?.getFollowers.items.map(follower => ({
    1: follower.userId,
    2: follower.userName,
    3: <Link href={`profile/${follower.userId}`}>{follower.userName}</Link>,
    4: new Date(follower.createdAt).toLocaleDateString(),
  }))

  if (data?.getFollowers.totalCount === 0) {
    return <p>No Followers</p>
  }

  return (
    <>
      {loading && <LoaderBlock />}
      <Table headers={tableHeaderData} tableData={tableData || []} />
      {data
        ? data?.getFollowers.totalCount > 10 && (
            <Pagination
              className={'justify-start'}
              currentPage={pageNumber}
              onChangePagesPortion={handlerPageSize}
              onClickPaginationButton={handlerPageNumber}
              pagesCount={data?.getFollowers.pagesCount}
              pagesPortion={String(pageSize)}
            />
          )
        : null}
      {error?.message && <Alert message={error?.message} purpose={'alert'} type={'error'}></Alert>}
    </>
  )
}
