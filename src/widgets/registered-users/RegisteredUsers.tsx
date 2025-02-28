import React from 'react'

import { Typography } from '@byte-creators/ui-kit'

type Props = {
  usersCount: number
}
export const RegisteredUsers = ({ usersCount }: Props) => {
  const usersCountArray = usersCount.toString().padStart(6, '0').split('')
  const verticalBar = <div className={'w-[1px] h-1/2 bg-dark-100'}></div>
  const usersForDisplay = usersCountArray.map((value, index) => {
    if (index < usersCountArray.length - 1) {
      return (
        <React.Fragment key={index}>
          <Typography className={'text-lg font-bold'}>{value}</Typography>
          {verticalBar}
        </React.Fragment>
      )
    } else {
      return (
        <Typography className={'text-lg font-bold'} key={index}>
          {value}
        </Typography>
      )
    }
  })

  return (
    <div
      className={
        'max-w-[972px] w-full h-[80px] py-1 bg-dark-500 justify-between items-center flex flex-col gap-2.5 sm:flex-row sm:px-7 sm:h-[72px]'
      }
    >
      <Typography className={'text-lg font-bold'}>Registered users:</Typography>
      <div
        className={' border-dark-100 border h-2/3 w-auto px-5 bg-dark-700 flex items-center gap-2'}
      >
        {usersForDisplay}
      </div>
    </div>
  )
}
