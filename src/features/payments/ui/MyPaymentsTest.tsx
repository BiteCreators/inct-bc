import { Pagination } from '@/common/ui'

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

  return (
    <div className={'relative sm:flex sm:flex-col mb-12'}>
      <section
        className={
          'w-full h-full block text-sm text-light-100 sm:table sm:table-auto sm:border-l sm:border-r sm:border-dark-500'
        }
      >
        <header className={'hidden sm:table-header-group sm:w-full'}>
          <ul className={'table-row bg-dark-500 text-left font-semibold h-12'}>
            <li className={'pl-6 pr-16 sm:pr-[15px] table-cell align-middle'}>Date of Payment</li>
            <li className={'pr-16 sm:pr-0 sm:mr-auto table-cell align-middle'}>
              End date of subscription
            </li>
            <li className={'pr-16 sm:pr-[10px] table-cell align-middle'}>Price</li>
            <li className={'pr-16 sm:pr-[10px] sm:box-border table-cell align-middle'}>
              Subscription Type
            </li>
            <li className={'pr-16 sm:pr-[10px] sm:box-border table-cell align-middle'}>
              Payment Type
            </li>
          </ul>
        </header>
        <div className={'flex flex-col gap-y-3 sm:table-row-group sm:w-full'}>
          {payments?.map(payment => (
            <ul
              className={
                'sm:table-row sm:h-[48px] min-h-[200px] font-normal flex flex-col sm:bg-inherit bg-dark-500 border border-dark-300 rounded-sm'
              }
              key={payment.subscriptionId}
            >
              <li
                className={
                  'flex justify-between px-[10px] py-[20px] lg:pr-[50px] sm:table-cell sm:pl-6 sm:pr-16 sm:border-dark-500 sm:border-b sm:align-middle'
                }
              >
                <p className={'sm:hidden inline-block'}>Date of Payment:</p>
                <span>{new Date(payment.endDateOfSubscription).toLocaleDateString()}</span>
              </li>
              <li
                className={
                  'flex justify-between px-[10px] py-[20px] lg:pr-[50px] sm:table-cell sm:pr-16 sm:pl-0 sm:border-b sm:border-dark-500 sm:align-middle'
                }
              >
                <p className={'sm:hidden inline-block'}>End date of subscription:</p>
                <span>{new Date(payment.endDateOfSubscription).toLocaleDateString()}</span>
              </li>
              <li
                className={
                  'flex justify-between px-[10px] py-[20px] lg:pr-[50px] sm:table-cell sm:pr-16 sm:pl-0 sm:border-b sm:border-dark-500 sm:align-middle'
                }
              >
                <p className={'sm:hidden inline-block'}>Price:</p>
                <span> {`$${payment.price}`}</span>
              </li>
              <li
                className={
                  'flex justify-between px-[10px] py-[20px] lg:pr-[50px] sm:table-cell sm:pr-16 sm:pl-0 sm:border-b sm:border-dark-500 sm:align-middle'
                }
              >
                <p className={'sm:hidden inline-block'}>Subscription Type:</p>
                <span>{payment.subscriptionType}</span>
              </li>
              <li
                className={
                  'flex justify-between px-[10px] py-[20px] lg:pr-[50px] sm:table-cell sm:pr-16 sm:pl-0 sm:border-b sm:border-dark-500 sm:align-middle'
                }
              >
                <p className={'sm:hidden inline-block'}>Payment Type:</p>
                <span>{payment.paymentType}</span>
              </li>
            </ul>
          ))}
        </div>
      </section>
      {isShowPagination && (
        <Pagination
          className={'sm:mt-9 self-start sm:mb-16 sm:w-auto sm:inline-flex hidden'}
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
