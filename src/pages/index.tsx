import React from 'react'

import { AuthLayout } from '@/app/layouts/AuthLayout'
import { Post } from '@/entities/posts'
import { PublicPostCard } from '@/features/posts'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { NextPageWithLayout } from './_app'

type PublicPostsResponse = {
  items: Post[]
  pageSize: number
  totalCount: number
}

export const getServerSideProps = (async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/public-posts/all/,?sortDirection=desc&pageSize=4`
  )
  const postsData: PublicPostsResponse = await res.json()

  return { props: { postsData } }
}) satisfies GetServerSideProps<{ postsData: PublicPostsResponse }>

const Main: NextPageWithLayout<{ postsData: PublicPostsResponse }> = ({
  postsData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { items: posts } = postsData

  return (
    <div className={'max-w-[972px] pt-6 mx-auto'}>
      <div className={'grid grid-cols-4 gap-3'}>
        {posts.map(post => (
          <PublicPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

Main.getLayout = AuthLayout

export default Main
