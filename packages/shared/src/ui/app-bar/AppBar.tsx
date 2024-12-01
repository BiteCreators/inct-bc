import React from 'react'

import { cn } from '../../utils'

export const AppBar = ({
  authContent,
  content,
  isAuth,
  isAuthPage,
  logo,
  mobileMenu,
  unAuthContent,
}: {
  authContent?: React.ReactNode
  content?: React.ReactNode
  isAuth?: boolean
  isAuthPage?: boolean
  logo?: React.ReactNode
  mobileMenu?: React.ReactNode
  unAuthContent?: React.ReactNode
}) => {
  return (
    <header
      className={cn(
        'flex justify-between align-middle',
        'md:px-16 px-[15px] py-3 h-[60px]',
        'border-b border-dark-300 bg-dark-700'
      )}
    >
      <div>{logo}</div>
      <div className={cn(['flex', !isAuthPage && 'gap-6', 'md:gap-12'])}>
        {isAuth && <div className={'hidden md:flex items-center'}>{authContent}</div>}
        {content}
        <div className={'block md:hidden'}>{mobileMenu}</div>
        {!isAuth && (
          <div className={'hidden global-hover:md:flex items-center'}>{unAuthContent}</div>
        )}
      </div>
    </header>
  )
}
