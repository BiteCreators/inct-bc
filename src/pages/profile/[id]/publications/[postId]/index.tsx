import React from 'react'

import { wrapper } from '@/application/store'
import { provideAuthState } from '@/entities/auth'
import { Post } from '@/entities/posts'
import { Profile } from '@/entities/profile'
import SinglePostPage from '@/pages/profile/[id]/publications/[postId]/SinglePostPage'
import { GetServerSideProps } from 'next'

type Props = {
  post: Post
  profile: Profile
}

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const { id, postId } = context.params as { id: string; postId: string }
  const accessToken = context.req.cookies.accessToken

  provideAuthState({ accessToken, dispatch: store.dispatch })

  try {
    const profileRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/public-user/profile/${id}`
    )

    if (!profileRes.ok) {
      return { notFound: true }
    }
    const profile: Profile = await profileRes.json()
    const postRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/public-posts/${postId}`)

    if (!postRes.ok) {
      return { notFound: true }
    }
    const post: Post = await postRes.json()

    return {
      props: { post, profile },
    }
  } catch (error) {
    return { notFound: true }
  }
})

export default function Page({ post, profile }: Props) {
  return <SinglePostPage post={post} profile={profile} />
}
