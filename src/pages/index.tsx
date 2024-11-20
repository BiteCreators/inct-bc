import React from 'react'

import { DefaultLayout } from '@/app/layouts/DefautlLayout'
import { cn } from '@/common/lib/utils/cn'
import { Post } from '@/entities/posts'
import { PublicPostCard } from '@/features/posts'
import { RegisteredUsers } from '@/widgets/registered-users/RegisteredUsers'
import { InferGetServerSidePropsType } from 'next'

import { NextPageWithLayout } from './_app'

type PublicPostsResponse = {
  items: Post[]
  pageSize: number
  totalCount: number
}

export const getStaticProps = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/public-posts/all/?sortDirection=desc&pageSize=4`
    )

    if (!res.ok) {
      console.error('Failed to fetch posts data')
    }
    const postsData: PublicPostsResponse = await res.json()

    return {
      props: { postsData },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching posts:', error)

    return
  }
}

const Main: NextPageWithLayout<{ postsData: PublicPostsResponse }> = ({
  postsData,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const { items: posts } = postsData

  return (
    <div className={cn('max-w-[972px] mr-[20%] ml-[10%]')}>
      <div>
        <RegisteredUsers usersCount={postsData.totalCount} />
      </div>
      <div className={'pt-6'}>
        <div className={'grid grid-cols-4 gap-3'}>
          {posts.map(post => (
            <PublicPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

Main.getLayout = DefaultLayout

export default Main
