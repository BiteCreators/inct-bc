import { FlagRussia, FlagUnitedKingdom } from '@/common/assets/icons/components'
import { Select, SelectItem } from '@/common/components/select/Select'
import { useScopedTranslation } from '@/common/utils/hooks/useTranslation'
import { useRouter } from 'next/router'

export const LanguageSelect = () => {
  const { asPath, defaultLocale, locale, pathname, push, query } = useRouter()

  const t = useScopedTranslation('Internationalization')

  const handleChange = (value: string) => {
    push({ pathname, query }, asPath, { locale: value })
  }

  return (
    <Select
      className={'min-w-[163px]'}
      defaultValue={defaultLocale}
      icon={locale === 'en' ? <FlagUnitedKingdom /> : <FlagRussia />}
      onValueChange={handleChange}
      value={locale}
    >
      <SelectItem value={'ru'}>{t.ru}</SelectItem>
      <SelectItem value={'en'}>{t.en}</SelectItem>
    </Select>
  )
}
