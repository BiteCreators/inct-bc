import React, { useState } from 'react'

import { postsApi } from '@/common/api/posts.api'
import { Post } from '@/entities/posts'
import { Profile } from '@/entities/profile'
import SinglePostPage from '@/pages/profile/[id]/publications/[postId]/SinglePostPage'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

type Props = {
  post: Post
  profile: Profile
}

export const getServerSideProps: GetServerSideProps<{
  post: Post
  profile: Profile
}> = async context => {
  const { id, postId } = context.params as { id: string; postId: string }

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
}

export default function Page({ post, profile }: Props) {
  return <SinglePostPage post={post} profile={profile} />
}
