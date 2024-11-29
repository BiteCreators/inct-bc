type usePaginationParams = {
  currentPage: number
  onClick: (page: number) => void
  pagesCount: number
  siblings?: number // расстояние между currentPagе и грaницaми числового диапазона pagination
}

export const usePagination = ({
  currentPage,
  onClick,
  pagesCount,
  siblings = 1,
}: usePaginationParams) => {
  const range = (start: number, end: number) => {
    const length = end - start + 1

    return Array.from({ length: length }, (_, ind) => ind + start)
  }
  const ellipsis = '...'
  const onClickMainPaginationButton = (page: number) => {
    return () => {
      onClick(page)
    }
  }
  const onClickPreviousPageButton = () => {
    onClick(currentPage - 1)
  }
  const onClickNextPageButton = () => {
    onClick(currentPage + 1)
  }
  const leftBorderIndex = Math.max(currentPage - siblings, 1) //номер левой границы (страницы) числового диапазона pagination
  const rightBorderIndex = Math.min(currentPage + siblings, pagesCount) // номер правой границы (страницы) числового диапазона pagination
  const shouldShowLeftEllipsis = leftBorderIndex > 2 // с какого номера левой границы (страницы) числового диапазона начинать показывать многоточие слева
  const shouldShowRightEllipsis = rightBorderIndex < pagesCount - 2 // с какого номера правой границы (страницы) числового диапазона начинать показывать многоточие справа
  let paginationRange: (number | string)[] = range(1, pagesCount)
  const isLastPage = currentPage === paginationRange.length
  const isFirstPage = currentPage === 1

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblings
    const leftRange = range(1, leftItemCount)

    paginationRange =
      leftItemCount >= pagesCount ? [...leftRange] : [...leftRange, ellipsis, pagesCount]
  }
  if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const middleRange = range(leftBorderIndex, rightBorderIndex)

    paginationRange = [1, ellipsis, ...middleRange, ellipsis, pagesCount]
  }
  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblings
    const rightRange = range(
      rightItemCount > pagesCount ? 1 : pagesCount - rightItemCount + 1,
      pagesCount
    )

    paginationRange = rightItemCount >= pagesCount ? [...rightRange] : [1, ellipsis, ...rightRange]
  }

  return {
    isFirstPage,
    isLastPage,
    onClickMainPaginationButton,
    onClickNextPageButton,
    onClickPreviousPageButton,
    paginationRange,
  }
}
