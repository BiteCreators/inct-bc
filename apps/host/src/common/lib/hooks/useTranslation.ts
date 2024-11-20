import { en } from '@/locales/en'
import { ru } from '@/locales/ru'
import { useRouter } from 'next/router'

export const useTranslation = () => {
  const router = useRouter()

  const locale = router.locale === 'en' ? en : ru

  return locale
}

export const useScopedTranslation = <T extends keyof typeof en>(namespace: T) => {
  const locale = useTranslation()

  return locale[namespace]
}
