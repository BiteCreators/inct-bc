import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './Pagination'

const meta = {
  component: Pagination,
  // decorators: [
  //   Pagination => (
  //     <div style={{ margin: '3em' }}>
  //       <Pagination />
  //     </div>
  //   ),
  // ],
} satisfies Meta<typeof Pagination>

type Story = StoryObj<typeof Pagination>

const range = (start: number, end: number) => {
  const length = end - start + 1

  return Array.from({ length: length }, (_, idx) => idx + start)
}

export const Default: Story = {
  args: {
    currentPage: 1,
  },
  render: args => {
    const [currentPage, setCurrentPage] = useState(args.currentPage)
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
    const count = 55

    const leftSiblingIndex = Math.max(currentPage - siblings, 1) //левая граница диапазона
    const rightSiblingIndex = Math.min(currentPage + siblings, count) // правая граница диапазона
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < count - 2
    let paginationRange: (number | string)[] = range(1, count)
    const isLastPage = currentPage === paginationRange.length - 1
    const isFirstPage = currentPage === 1

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblings
      const leftRange = range(1, leftItemCount)

      paginationRange = [...leftRange, ellipsis, count]
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)

      paginationRange = [1, ellipsis, ...middleRange, ellipsis, count]
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblings
      const rightRange = range(count - rightItemCount + 1, count)

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
        paginationRange={paginationRange}
      />
    )
  },
}

export default meta
