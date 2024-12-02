import React from 'react'

import { DefaultLayout } from '@/application/layouts/DefautlLayout'
import { Post } from '@/entities/posts'
import { PublicPostCard } from '@/features/posts'
import { RegisteredUsers } from '@/widgets/registered-users/RegisteredUsers'
import { cn } from '@packages/shared/utils'
import { InferGetServerSidePropsType } from 'next'

import { NextPageWithLayout } from './_app'

type PublicPostsResponse = {
  items: Post[]
  pageSize: number
  totalCount: number
}

export const getStaticProps = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!apiUrl) {
    console.error('NEXT_PUBLIC_API_URL is not defined')

    return { props: { postsData: { items: [], pageSize: 0, totalCount: 0 } } }
  }

  try {
    const res = await fetch(`${apiUrl}/v1/public-posts/all/?sortDirection=desc&pageSize=4`)

    if (!res.ok) {
      console.error('Failed to fetch posts data')

      return { props: { postsData: { items: [], pageSize: 0, totalCount: 0 } } }
    }

    const postsData: PublicPostsResponse = await res.json()

    return {
      props: { postsData },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching posts:', error)

    return { props: { postsData: { items: [], pageSize: 0, totalCount: 0 } } }
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
