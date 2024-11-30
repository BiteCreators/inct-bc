import React from 'react'

import { useRouter } from 'next/router'

import { ArrowIosBack, ArrowIosForward } from '../../assets/icons/components'
import { cn } from '../../utils'
import { MainPaginationButtons, SelectPagesPortion, SelectPortion } from './PaginationContent'
import { usePagination } from './usePagination'

type Props = {
  className?: string
  currentPage: number
  onChangePagesPortion: (pagesPortion: string) => void
  onClickPaginationButton: (page: number) => void
  pagesCount: number
  pagesPortion?: string
  siblings?: number
}

export const Pagination = ({
  className,
  currentPage,
  onChangePagesPortion,
  onClickPaginationButton,
  pagesCount,
  pagesPortion = '10',
  siblings = 1,
}: Props) => {
  const { locale } = useRouter()
  const {
    isFirstPage,
    isLastPage,
    onClickMainPaginationButton,
    onClickNextPageButton,
    onClickPreviousPageButton,
    paginationRange,
  } = usePagination({ currentPage, onClick: onClickPaginationButton, pagesCount, siblings })

  return (
    <div
      className={cn(
        'inline-flex min-h-[35px] w-full justify-center text-sm font-normal text-light-100 items-center',
        className
      )}
    >
      <div className={cn('flex flex-row items-center')}>
        <button
          className={
            'focus-visible:border-2 focus-visible:outline-none focus-visible:border-primary-700'
          }
          disabled={isFirstPage}
          onClick={onClickPreviousPageButton}
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
          onClick={onClickMainPaginationButton}
          paginationRange={paginationRange}
        />
        <button
          className={
            'ml-3 focus-visible:border-2 focus-visible:outline-none focus-visible:border-primary-700'
          }
          disabled={isLastPage}
          onClick={onClickNextPageButton}
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
        <span className={'mr-1 ml-6 '}>{locale === 'en' ? 'Show' : 'Показать'}</span>
        <SelectPagesPortion defaultValue={pagesPortion} onValueChange={onChangePagesPortion}>
          <SelectPortion value={'10'}>10</SelectPortion>
          <SelectPortion value={'20'}>20</SelectPortion>
          <SelectPortion value={'30'}>30</SelectPortion>
          <SelectPortion value={'50'}>50</SelectPortion>
          <SelectPortion value={'100'}>100</SelectPortion>
        </SelectPagesPortion>
        <span className={'ml-1'}>{locale === 'en' ? 'on page' : 'на странице'}</span>
      </div>
    </div>
  )
}
