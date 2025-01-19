import React from 'react'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { authSlice } from '@/entities/auth'
import { Post } from '@/entities/posts'
import { Profile } from '@/entities/profile'
import { PostDetails } from '@/widgets/post-details'
import { useMediaQuery } from '@byte-creators/utils'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'

const ProfileHeader = dynamic(
  () => import('@/widgets/profile-header').then(mod => mod.ProfileHeader),
  { ssr: true }
)
const Posts = dynamic(() => import('@/features/posts').then(mod => mod.Posts), { ssr: true })

type Props = {
  post: Post
  profile: Profile
}

export default function SinglePostPage({ post, profile }: Props) {
  const accessToken = useAppSelector(authSlice.selectors.selectAccessToken)

  console.log(accessToken)

  const isLargeScreen = useMediaQuery('(min-width: 768px)')

  return (
    <div className={'px-[15px] md:pl-6 md:pr-16'}>
      {isLargeScreen && (
        <>
          <ProfileHeader profile={profile} />
          <Posts userId={profile.id} />
        </>
      )}
      <PostDetails post={post} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id, postId } = context.params as { id: string; postId: string }

  try {
    const profileRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/public-user/profile/${id}`
    )

    if (!profileRes.ok) {
      return { notFound: true }
    }
    const profile: Profile = await profileRes.json()

    const postRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/posts/${postId}`)

    if (!postRes.ok) {
      return { notFound: true }
    }
    const post: Post = await postRes.json()

    return {
      props: {
        post,
        profile,
      },
    }
  } catch (error) {
    return { notFound: true }
  }
}
