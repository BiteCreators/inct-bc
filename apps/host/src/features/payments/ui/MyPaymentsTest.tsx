import { Pagination } from '@packages/shared/ui'
import { cn } from '@packages/shared/utils/cn'

import { useMyPaymentsTest } from '../model/useMyPaymentsTest'

export const MyPaymentsTest = () => {
  const paymentsTotalCount = 300 //для тестр-ия
  const {
    currentPage,
    handleCurrentPageChange,
    handlePaymentsPortionChange,
    isShowPagination,
    pagesCount,
    payments,
    paymentsPortion,
  } = useMyPaymentsTest(paymentsTotalCount)

  const paymentsItemStyle =
    'flex justify-between sm:table-cell sm:pr-[20px] sm:pl-0 sm:border-b sm:border-dark-500 sm:align-middle'
  const headersItemStyle = 'pl-0 pr-16 table-cell align-middle sm:pr-5'

  return (
    <div className={'relative mb-12 sm:flex sm:flex-col'}>
      <section
        className={
          'w-full h-full block text-sm text-light-100 sm:table sm:table-auto sm:border-l sm:border-r sm:border-dark-500'
        }
      >
        <header className={'hidden sm:table-header-group sm:w-full'}>
          <ul className={'table-row bg-dark-500 text-left font-semibold h-12'}>
            <li className={cn(headersItemStyle, 'pl-6')}>Date of Payment</li>
            <li className={cn(headersItemStyle)}>End date of subscription</li>
            <li className={cn(headersItemStyle, 'sm:pr-[40px]')}>Price</li>
            <li className={cn(headersItemStyle)}>Subscription Type</li>
            <li className={cn(headersItemStyle)}>Payment Type</li>
          </ul>
        </header>
        <div className={'flex flex-col gap-y-3 sm:table-row-group sm:w-full'}>
          {payments?.map(payment => (
            <ul
              className={
                'min-h-[200px] font-normal flex flex-col py-5 px-[10px] gap-y-3 bg-dark-500 border border-dark-300 rounded-sm font-bold sm:table-row sm:h-12 sm:bg-inherit'
              }
              key={payment.subscriptionId}
            >
              <li className={cn(paymentsItemStyle, 'sm:pl-6')}>
                <p className={'inline-block sm:hidden'}>Date of Payment:</p>
                <span className={'font-bold sm:font-normal'}>
                  {new Date(payment.endDateOfSubscription).toLocaleDateString()}
                </span>
              </li>
              <li className={paymentsItemStyle}>
                <p className={'inline-block sm:hidden'}>End date of subscription:</p>
                <span className={'font-bold sm:font-normal'}>
                  {new Date(payment.endDateOfSubscription).toLocaleDateString()}
                </span>
              </li>
              <li className={paymentsItemStyle}>
                <p className={'inline-block sm:hidden'}>Price:</p>
                <span className={'font-bold sm:font-normal'}> {`$${payment.price}`}</span>
              </li>
              <li className={paymentsItemStyle}>
                <p className={'inline-block sm:hidden'}>Subscription Type:</p>
                <span className={'font-bold sm:font-normal'}>{payment.subscriptionType}</span>
              </li>
              <li className={paymentsItemStyle}>
                <p className={'inline-block sm:hidden'}>Payment Type:</p>
                <span className={'font-bold sm:font-normal'}>{payment.paymentType}</span>
              </li>
            </ul>
          ))}
        </div>
      </section>
      {isShowPagination && (
        <Pagination
          className={'hidden sm:inline-flex sm:self-start sm:w-auto sm:mt-9 sm:mb-16'}
          currentPage={currentPage}
          onChangePagesPortion={handlePaymentsPortionChange}
          onClickPaginationButton={handleCurrentPageChange}
          pagesCount={pagesCount}
          pagesPortion={paymentsPortion.toString()}
        />
      )}
    </div>
  )
}
