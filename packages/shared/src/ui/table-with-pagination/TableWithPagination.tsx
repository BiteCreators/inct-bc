import React from 'react'

import { Pagination } from '../'
import { TableHeaders } from './TableHeaders'
import { TableRows } from './TableRows'
import { useTableWithPagination } from './useTableWithPagination'

export type Header = {
  name: string
  onClickSortButton?: () => void
  sort?: 'asc' | 'desc' | null
}
export type TableData = {
  [key: number]: React.ReactNode | number | string
}
type Props = {
  classNameHeadersItem?: string
  classNameTableCell?: string
  headers: Header[]
  tableData: TableData[]
}
export const TableWithPagination = (props: Props) => {
  const {
    currentPage,
    dataPortion,
    dataforDisplay,
    handleCurrentPageChange,
    handlePaymentsPortionChange,
    isShowPagination,
    pagesCount,
  } = useTableWithPagination(props.tableData)

  return (
    <div className={'relative mb-12 sm:flex sm:flex-col'}>
      <section
        className={
          'w-full h-full block text-sm text-light-100 sm:table sm:table-auto sm:border-l sm:border-r sm:border-dark-500'
        }
      >
        <header className={'hidden sm:table-header-group sm:w-full'}>
          <ul className={'table-row bg-dark-500 text-left font-semibold h-12'}>
            <TableHeaders className={props.classNameHeadersItem} headers={props.headers} />
          </ul>
        </header>
        <div className={'flex flex-col gap-y-3 sm:table-row-group sm:w-full'}>
          <TableRows className={props.classNameTableCell} tableData={dataforDisplay} />
        </div>
      </section>
      {isShowPagination && (
        <Pagination
          className={'hidden sm:inline-flex sm:self-start sm:w-auto sm:mt-9 sm:mb-16'}
          currentPage={currentPage}
          onChangePagesPortion={handlePaymentsPortionChange}
          onClickPaginationButton={handleCurrentPageChange}
          pagesCount={pagesCount}
          pagesPortion={dataPortion.toString()}
        />
      )}
    </div>
  )
}
