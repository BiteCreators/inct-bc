import { useState } from 'react'

import { Icon } from '@/common/components/icon/Icon'
import { Select } from '@/common/components/select/Select'

export const LanguageSelect = () => {
  const [lang, setLang] = useState<'en' | 'ru'>('ru')

  return (
    <Select
      icon={
        <Icon
          height={'20px'}
          iconId={lang === 'en' ? 'british-flag' : 'russian-flag'}
          viewBox={'-3 -1.5 40 30'}
          width={'30px'}
        />
      }
      onValueChange={(value: 'en' | 'ru') => setLang(value)}
      value={lang}
      width={'163px'}
    >
      <Select.Item value={'ru'}>Russian</Select.Item>
      <Select.Item value={'en'}>English</Select.Item>
    </Select>
  )
}
