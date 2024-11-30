import { cn } from '../../utils/cn'
import { TableData } from './Table'

type Props = {
  className?: string

  tableData: TableData[]
}

export const TableRows = ({ className, tableData }: Props) => {
  const tableCellStyle = cn(
    'flex justify-between sm:table-cell sm:pr-3 sm:pl-3 sm:border-b sm:border-dark-500 sm:align-middle',

    className
  )

  return tableData.map((element, ind: number) => {
    const rowCells = []

    for (const key in element) {
      rowCells.push(
        <li className={tableCellStyle}>
          <span className={'font-bold sm:font-normal'}>{element[key]}</span>
        </li>
      )
    }

    return (
      <ul
        className={
          'min-h-[200px] font-normal flex flex-col py-5 px-[10px] gap-y-3 bg-dark-500 border border-dark-300 rounded-sm font-bold sm:table-row sm:h-12 sm:bg-inherit'
        }
        key={ind}
      >
        {rowCells}
      </ul>
    )
  })
}
