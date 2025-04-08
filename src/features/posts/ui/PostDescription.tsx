import React, { useState } from 'react'

import { Post } from '@/entities/posts'
import { Avatar, Typography } from '@byte-creators/ui-kit'
import { useGetRelativeTime, wordWrapping } from '@byte-creators/utils'
import { useRouter } from 'next/router'

type Props = {
  post: Post
  withTime?: boolean
}

export const PostDescription = ({ post, withTime = true }: Props) => {
  const [translatedText, setTranslatedText] = useState(post.description)
  const [isTranslated, setIsTranslated] = useState(false)
  const router = useRouter()
  const locale = router.locale === 'en' ? 'en' : 'ru'

  const ruRegex = /^[^a-zA-Z]*[\u0400-\u04FF]+[^a-zA-Z]*$/
  const enRegex = /^[a-zA-Z]+$/

  const isPostInRussian = ruRegex.test(post.description)
  const isPostInEnglish = enRegex.test(post.description)

  const shouldShowTranslateButton =
    (locale === 'ru' && isPostInEnglish) || (locale === 'en' && isPostInRussian)

  const translateText = async () => {
    const sourceLang = locale === 'ru' && isPostInEnglish ? 'en' : 'ru'
    const targetLang = locale === 'ru' && isPostInEnglish ? 'ru' : 'en'

    const response = await fetch(
      `/api/translate?source=${sourceLang}&target=${targetLang}&text=${post.description}`
    )
    const data = await response.json()

    setTranslatedText(data.translatedText)
    setIsTranslated(true)
  }

  const { getRelativeTime } = useGetRelativeTime()
  const relativeTime = getRelativeTime(new Date(post.createdAt).getTime())

  return (
    <div className={'flex mb-4 gap-3 items-start'}>
      <div className={'flex-shrink-0 pt-1'}>
        <Avatar avatarURL={post.avatarOwner} imgStyles={'w-9 h-9 object-cover'} />
      </div>
      <div className={'flex-1'}>
        <Typography variant={'regular-text'}>
          <span className={'text-base font-weight600 leading-5'}>{post.userName} </span>
          {wordWrapping(translatedText ? translatedText : post.description)}
        </Typography>

        {shouldShowTranslateButton && (
          <button onClick={translateText}>
            {isTranslated
              ? locale === 'ru'
                ? 'Показать оригинал'
                : 'Show original'
              : locale === 'ru'
              ? 'Перевести'
              : 'Translate'}
          </button>
        )}

        {withTime && (
          <div className={'mt-1 flex gap-3'}>
            <Typography className={'text-light-900'} variant={'small-text'}>
              {relativeTime}
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
}
