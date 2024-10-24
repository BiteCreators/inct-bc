import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'
import { useRouter } from 'next/router'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

/**
 *
 * @param {number} time - time to show relative to
 * @returns relative time
 */
export const useGetRelativeTime = ({ time }: { time: number }) => {
  const router = useRouter()
  const locale = router.locale === 'en' ? 'en-US' : 'ru-RU'

  const timeAgo = new TimeAgo(locale)

  const relativeTime = timeAgo.format(time)

  return { relativeTime }
}
