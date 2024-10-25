import React from 'react'

import { Typography } from '@/common/ui'

type Props = {
  usersCount: number
}
export const RegisteredUsers = ({ usersCount }: Props) => {
  const x = usersCount.toString().padStart(6, '0').split('')
  const Palka = <div className={'w-[1px] h-1/2 bg-light-900'}></div>
  const count = x.map((value, index) => {
    if (index < x.length - 1) {
      return (
        <React.Fragment key={index}>
          <Typography variant={'text-'}>{value}</Typography>
          {Palka}
        </React.Fragment>
      )
    } else {
      return <Typography key={index}>{value}</Typography>
    }
  })

  return (
    <div className={'max-w-[972px] w-full h-16 bg-dark-500 px-7 flex justify-between items-center'}>
      <Typography variant={'medium-text'}>Registered users:</Typography>
      <div className={' border h-2/3 w-auto px-5 bg-dark-700 flex items-center gap-2'}>{count}</div>
    </div>
  )
}
