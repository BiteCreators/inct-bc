import { cn } from '../../utils/cn'
import { Header } from './TableWithPagination'

type Props = {
  className?: string
  headers: Header[]
}
export const TableHeaders = ({ className, headers }: Props) => {
  const headersItemStyle = cn(
    'pl-6 pr-16 table-cell align-middle sm:pr-0 sm:pl-3 lg:pl-6',
    className
  )

  return headers.map((header, ind) => {
    let sortArrow

    if (header.sort !== undefined) {
      if (header.sort === 'asc') {
        sortArrow = <div className={'w-1 h-1 border-4 border-transparent border-b-light-100'}></div>
      } else if (header.sort === 'desc') {
        sortArrow = <div className={'w-1 h-1 border-4 border-transparent border-t-light-100'}></div>
      } else {
        sortArrow = (
          <>
            <div className={'w-1 h-1 border-4 border-transparent border-b-dark-100 mb-[3px]'}></div>
            <div
              className={'w-1 h-1 border-4 border-transparent border-t-dark-100 justify-items-end'}
            ></div>
          </>
        )
      }
    }

    return (
      <li className={cn(headersItemStyle)} key={ind}>
        <p className={'flex items-center'}>
          <span className={'mr-[6px]'}>{header.name}</span>
          <button
            className={header.sort === undefined ? 'hidden' : 'flex flex-col h-6 justify-center '}
            onClick={() => header.onClickSortButton && header.onClickSortButton()}
          >
            {sortArrow}
          </button>
        </p>
      </li>
    )
  })
}
