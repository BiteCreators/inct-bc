import React from 'react'

import { AuthLayout } from '@/application/layouts/AuthLayout'
import { Post } from '@/entities/posts'
import { PublicPostCard } from '@/features/posts'
import { RegisteredUsers } from '@/widgets/registered-users/RegisteredUsers'
import { Button } from '@packages/shared/ui/'
import { InferGetServerSidePropsType } from 'next'
import dynamic from 'next/dynamic'

import { NextPageWithLayout } from './_app'

// const ExposedComponent = dynamic(() => import('admin/exposed'), { ssr: false })

type PublicPostsResponse = {
  items: Post[]
  pageSize: number
  totalCount: number
}

export const getStaticProps = async () => {
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/v1/public-posts/all/?sortDirection=desc&pageSize=4`
  //     )
  //
  //     if (!res.ok) {
  //       console.error('Failed to fetch posts data')
  //     }
  //     const postsData: PublicPostsResponse = await res.json()
  //
  //     return {
  //       props: { postsData },
  //       revalidate: 60,
  //     }
  //   } catch (error) {
  //     console.error('Error fetching posts:', error)
  //
  //     return
  //   }
  // }

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
    <>
      <RegisteredUsers usersCount={postsData.totalCount} />
      <div className={'max-w-[972px] pt-6 mx-auto'}>
        <div className={'grid grid-cols-4 gap-3'}>
          {posts.map(post => (
            <PublicPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      {/*<ExposedComponent />*/}
      <Button>shared button</Button>
    </>
  )
}

Main.getLayout = AuthLayout

export default Main
