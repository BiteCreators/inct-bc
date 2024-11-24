import { FlagRussia, FlagUnitedKingdom } from '@packages/shared/assets/icons/components'
import { useScopedTranslation } from '@packages/shared/hooks/useTranslation'
import { Select, SelectItem } from '@packages/shared/ui'
import { useRouter } from 'next/router'

export const LanguageSelect = () => {
  const { asPath, defaultLocale, locale, pathname, push, query } = useRouter()

  const t = useScopedTranslation('Internationalization')

  const handleChange = (value: string) => {
    push({ pathname, query }, asPath, { locale: value })
  }

  return (
    <Select
      defaultValue={defaultLocale}
      icon={locale === 'en' ? <FlagUnitedKingdom /> : <FlagRussia />}
      onValueChange={handleChange}
      responsive
      value={locale}
    >
      <SelectItem value={'ru'}>{t.ru}</SelectItem>
      <SelectItem value={'en'}>{t.en}</SelectItem>
    </Select>
  )
}
