import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './Pagination'

const meta = {
  component: Pagination,
} satisfies Meta<typeof Pagination>

type Story = StoryObj<typeof Pagination>

const range = (start: number, end: number) => {
  const length = end - start + 1

  return Array.from({ length: length }, (_, idx) => idx + start)
}

export const Default: Story = {
  args: {},
  render: args => {
    const [currentPage, setCurrentPage] = useState(1)
    const onClickMainPaginationButton = (page: number) => {
      return () => {
        setCurrentPage(page)
      }
    }
    const onClickPreviousPageButton = () => {
      setCurrentPage(currentPage - 1)
    }
    const onClickNextPageButton = () => {
      setCurrentPage(currentPage + 1)
    }

    const ellipsis = '...'
    const siblings = 1
    const pagesCount = 55

    const leftBorderIndex = Math.max(currentPage - siblings, 1) //номер левой границы (страницы) числового диапазона pagination
    const rightBorderIndex = Math.min(currentPage + siblings, pagesCount) // номер правой границы (страницы) числового диапазона pagination
    const shouldShowLeftEllipsis = leftBorderIndex > 2 // с какого номера левой границы (страницы) числового диапазона показывать многоточие слева
    const shouldShowRightEllipsis = rightBorderIndex < pagesCount - 2 // с какого номера правой границы (страницы) числового диапазона показывать многоточие справа
    let paginationRange: (number | string)[] = range(1, pagesCount)
    const isLastPage = currentPage === paginationRange.length - 1
    const isFirstPage = currentPage === 1

    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const leftItemCount = 3 + 2 * siblings
      const leftRange = range(1, leftItemCount)

      paginationRange = [...leftRange, ellipsis, pagesCount]
    }
    if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const middleRange = range(leftBorderIndex, rightBorderIndex)

      paginationRange = [1, ellipsis, ...middleRange, ellipsis, pagesCount]
    }
    if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
      const rightItemCount = 3 + 2 * siblings
      const rightRange = range(pagesCount - rightItemCount + 1, pagesCount)

      paginationRange = [1, ellipsis, ...rightRange]
    }

    return (
      <Pagination
        currentPage={currentPage}
        handleMainPageClicked={onClickMainPaginationButton}
        handleNextPageClicked={onClickNextPageButton}
        handlePreviousPageClicked={onClickPreviousPageButton}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        onChangePagesPortion={() => {}}
        paginationRange={paginationRange}
      />
    )
  },
}

export default meta
