import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './Pagination'

const meta = {
  component: Pagination,
} satisfies Meta<typeof Pagination>

type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {},
  render: args => {
    const [currentPage, setCurrentPage] = useState(1)
    const onClickPaginationButton = (page: number) => {
      setCurrentPage(page)
    }

    return (
      <Pagination
        currentPage={currentPage}
        onChangePagesPortion={() => {}}
        onClickPaginationButton={onClickPaginationButton}
        pagesCount={55}
      />
    )
  },
}

export default meta
