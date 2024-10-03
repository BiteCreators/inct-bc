import React, { FC } from 'react'

import { ArrowIosBack, ArrowIosForward } from '@/common/assets/icons/components'
import { cn } from '@/common/utils/cn'

import { Select, SelectItem } from '../select/Select'

type Props = {
  className?: string
  currentPage: number
  handleMainPageClicked: (page: number) => () => void
  handleNextPageClicked: () => void
  handlePreviousPageClicked: () => void
  isFirstPage?: boolean
  isLastPage?: boolean
  onPerPageChange?: (itemPerPage: number) => void
  paginationRange: (number | string)[]
  perPage?: number
  perPageOptions?: number[]
}

export const Pagination = ({
  className,
  currentPage,
  handleMainPageClicked,
  handleNextPageClicked,
  handlePreviousPageClicked,
  isFirstPage,
  isLastPage,
  paginationRange,
}: Props) => {
  return (
    <div className={cn('mx-auto flex w-full justify-center', className)}>
      <div className={cn('flex flex-row items-center')}>
        <button disabled={isFirstPage} onClick={handlePreviousPageClicked}>
          <ArrowIosBack className={cn(isFirstPage && 'text-dark-100')} />
        </button>
        <MainPaginationButtons
          currentPage={currentPage}
          onClick={handleMainPageClicked}
          paginationRange={paginationRange}
        />
        <button disabled={isLastPage} onClick={handleNextPageClicked}>
          <ArrowIosForward className={cn(isLastPage && 'text-dark-100')} />
        </button>
      </div>
      <div className={'inline-block'}>
        <span className={'mr-1'}>Show</span>
        <Select className={'inline-block rounded'} defaultValue={'10'}>
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
type MainPaginationButtonsProps = {
  currentPage: number
  onClick: (pageNumber: number) => () => void
  paginationRange: (number | string)[]
}
export const MainPaginationButtons: FC<MainPaginationButtonsProps> = ({
  currentPage,
  onClick,
  paginationRange,
}) => {
  return (
    <>
      {paginationRange.map((page: number | string, index: number) => {
        if (typeof page !== 'number') {
          return <PaginationEllipsis key={index} />
        }

        return (
          <PaginationButton
            isSelected={page === currentPage}
            key={index}
            onClick={onClick(page)}
            page={page}
          />
        )
      })}
    </>
  )
}
type PaginationButtonProps = {
  isSelected?: boolean
  onClick: () => void
  page: number
} & React.ComponentProps<'button'>
export const PaginationButton = ({
  className,
  isSelected,
  onClick,
  page,
}: PaginationButtonProps) => {
  return (
    <button
      className={cn(
        'w-6 h-6 rounded-sm ml-3 text-sm font-normal box-content leading-6 text-light-100 text-center active:bg-light-100 active:text-dark-900',
        isSelected && 'bg-light-100 text-dark-900',
        !isSelected && 'hover:bg-dark-500 focus:border-primary-700 focus:border-2',
        className
      )}
      onClick={onClick}
    >
      {page}
    </button>
  )
}

export const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span className={cn('h-6 w-6 ml-3 text-center', className)} {...props}>
    ...
  </span>
)
