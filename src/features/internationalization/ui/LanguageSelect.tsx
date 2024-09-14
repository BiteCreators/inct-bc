import { useState } from 'react'

import { Icon } from '@/common/components/icon/Icon'
import { Select } from '@/common/components/select/Select'
import { useTranslation } from '@/common/utils/hooks/useTranslation'
import { useRouter } from 'next/router'

export const LanguageSelect = () => {
  const { asPath, defaultLocale, locale, locales, pathname, push, query } = useRouter()

  const {
    t: { Internationalization },
  } = useTranslation()

  const handleChange = (value: string) => {
    push({ pathname, query }, asPath, { locale: value })
  }

  return (
    <Select
      className={'min-w-[163px]'}
      defaultValue={defaultLocale}
      icon={
        <Icon
          height={'20px'}
          iconId={locale === 'en' ? 'british-flag' : 'russian-flag'}
          viewBox={'-3 -1.5 40 30'}
          width={'30px'}
        />
      }
      onValueChange={handleChange}
      value={locale}
    >
      <Select.Item value={'ru'}>{Internationalization.ru}</Select.Item>
      <Select.Item value={'en'}>{Internationalization.en}</Select.Item>
    </Select>
  )
}
