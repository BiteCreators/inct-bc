import React, { useState } from 'react'

import { postsApi } from '@/common/api/posts.api'
import { Post } from '@/entities/posts'
import { SinglePostPage } from '@/pages/profile/[id]/publications/[postId]/SinglePostPage'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

type Props = {
  post: Post
}

export const getServerSideProps: GetServerSideProps<{ post: Post }> = async context => {
  const { postId } = context.params as { postId: string }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/public-posts/${postId}`)

    if (!res.ok) {
      return { notFound: true }
    }
    const post: Post = await res.json()

    return {
      props: { post },
    }
  } catch (error) {
    return { notFound: true }
  }
}

export default function Page({ post }: Props) {
  return <SinglePostPage post={post} />
}
