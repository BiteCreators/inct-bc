import React from 'react'

import { Post } from '@/entities/posts'
import { Profile } from '@/entities/profile'
import { Posts } from '@/features/posts'
import { PostDetails } from '@/widgets/post-details'
import { ProfileHeader } from '@/widgets/profile-header'
import { useMediaQuery } from '@packages/shared/hooks/useMediaQuery'
import { GetServerSideProps } from 'next'

type Props = {
  post: Post
  profile: Profile
}

export default function SinglePostPage({ post, profile }: Props) {
  const isLargeScreen = useMediaQuery('(min-width: 768px)')

  return (
    <div className={'px-[15px] md:pl-6 md:pr-16'}>
      {isLargeScreen && (
        <>
          <ProfileHeader profile={profile} />
          <Posts userId={profile.id} />
        </>
      )}
      <PostDetails post={post} profile={profile} />
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
