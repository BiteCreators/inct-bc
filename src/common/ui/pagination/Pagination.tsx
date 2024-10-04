import React from 'react'

import { ArrowIosBack, ArrowIosForward } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'

import { MainPaginationButtons, Select, SelectItem } from './PaginationContent'

type Props = {
  className?: string
  currentPage: number
  handleMainPageClicked: (page: number) => () => void
  handleNextPageClicked: () => void
  handlePreviousPageClicked: () => void
  isFirstPage?: boolean
  isLastPage?: boolean
  onChangePagesPortion: (pagesPortion: string) => void
  pagesPortion?: string
  paginationRange: (number | string)[]
}

export const Pagination = ({
  className,
  currentPage,
  handleMainPageClicked,
  handleNextPageClicked,
  handlePreviousPageClicked,
  isFirstPage,
  isLastPage,
  onChangePagesPortion,
  pagesPortion = '10',
  paginationRange,
}: Props) => {
  return (
    <div
      className={cn(
        'mx-auto inline-flex min-h-[35px] w-full justify-center text-sm font-normal text-light-100 items-center',
        className
      )}
    >
      <div className={cn('flex flex-row items-center')}>
        <button
          className={
            'focus-visible:border-2 focus-visible:outline-none focus-visible:border-primary-700'
          }
          disabled={isFirstPage}
          onClick={handlePreviousPageClicked}
        >
          <ArrowIosBack
            className={cn(isFirstPage && 'text-dark-100')}
            height={'16'}
            viewBox={'0 0 24 24'}
            width={'16'}
          />
        </button>
        <MainPaginationButtons
          currentPage={currentPage}
          onClick={handleMainPageClicked}
          paginationRange={paginationRange}
        />
        <button
          className={
            'ml-3 focus-visible:border-2 focus-visible:outline-none focus-visible:border-primary-700'
          }
          disabled={isLastPage}
          onClick={handleNextPageClicked}
        >
          <ArrowIosForward
            className={cn(isLastPage && 'text-dark-100')}
            height={'16'}
            viewBox={'0 0 24 24'}
            width={'16'}
          />
        </button>
      </div>
      <div className={'inline-flex items-center'}>
        <span className={'mr-1 ml-6 '}>Show</span>
        <Select defaultValue={pagesPortion} onValueChange={onChangePagesPortion}>
          <SelectItem value={'10'}>10</SelectItem>
          <SelectItem value={'20'}>20</SelectItem>
          <SelectItem value={'30'}>30</SelectItem>
          <SelectItem value={'50'}>50</SelectItem>
          <SelectItem value={'100'}>100</SelectItem>
        </Select>
        <span className={'ml-1'}>on page</span>
      </div>
    </div>
  )
}
