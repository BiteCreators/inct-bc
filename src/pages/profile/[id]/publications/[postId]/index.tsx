import React from 'react'

import { wrapper } from '@/application/store'
import { provideAuthState } from '@/entities/auth'
import { postsApi } from '@/entities/posts'
import { profileApi } from '@/entities/profile'
import { PostDetails } from '@/widgets/post-details'

export default function Page() {
  return <PostDetails />
}

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const { id, postId } = context.params as { id: string; postId: string }
  const accessToken = context.req.cookies.accessToken

  provideAuthState({ accessToken, dispatch: store.dispatch })

  store.dispatch(profileApi.endpoints.getPublicProfile.initiate({ id: Number(id) }))
  store.dispatch(postsApi.endpoints.getPublicPostById.initiate({ postId: Number(postId) }))

  await Promise.all(store.dispatch(profileApi.util.getRunningQueriesThunk()))
  await Promise.all(store.dispatch(postsApi.util.getRunningQueriesThunk()))

  return {
    props: {},
  }
})
