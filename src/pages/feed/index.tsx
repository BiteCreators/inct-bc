import { wrapper } from '@/application/store'
import { provideAuthState } from '@/entities/auth'
import { postsApi } from '@/entities/posts'

import Feed from './Feed'

export default function Page() {
  return <Feed />
}

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const accessToken = context.req.cookies.accessToken

  provideAuthState({ accessToken, dispatch: store.dispatch })

  const endCursorPostId = context.params?.endCursorPostId
    ? Number(context.params.endCursorPostId)
    : undefined

  await store
    .dispatch(
      postsApi.endpoints.getAllPublicPosts.initiate(
        endCursorPostId ? { endCursorPostId } : { pageSize: 4 }
      )
    )
    .unwrap()

  return {
    props: {},
  }
})
