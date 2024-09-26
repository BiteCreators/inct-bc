import React from 'react'

import { ArrowBackOutline } from '@/common/assets/icons/components'
import { PageLayout } from '@/common/components/page-layout/PageLayout'
import Typography from '@/common/components/typography/Typography'
import { useScopedTranslation } from '@/common/utils/hooks/useTranslation'
import { NextPageWithLayout } from '@/pages/_app'
import { Header } from '@/widgets/header'
import Link from 'next/link'

const PrivacyPolicy: NextPageWithLayout = () => {
  const t = useScopedTranslation('PrivacyPolicy')

  return (
    <div className={'flex md:block'}>
      <div className={'max-w-12 md:max-w-40 '}>
        <Link className={'flex ml-6 gap-3'} href={'/auth/sign-up'}>
          <ArrowBackOutline />
          <span className={'hidden md:inline text-sm font-normal leading-6'}>Back to Sign Up</span>
        </Link>
      </div>
      <div className={'md:mx-40 text-center mx-[15px]'}>
        {/* <div className={'flex flex-col items-center'}> */}
        <Typography className={'text-lg md:text-xl mb-5'} variant={'h1'}>
          {t.title}
        </Typography>
        <Typography className={'text-sm leading-6 '} variant={'regular-text'}>
          {t.text}
        </Typography>
      </div>
    </div>
  )
}

PrivacyPolicy.getLayout = (page: React.ReactElement) => {
  return (
    <PageLayout header={<Header />} mainClassName={''}>
      {page}
    </PageLayout>
  )
}
export default PrivacyPolicy
