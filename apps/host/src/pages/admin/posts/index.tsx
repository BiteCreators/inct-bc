import dynamic from 'next/dynamic'

const PostsPage = dynamic(() => import('admin/posts-page').then(mod => mod.PostsPage))

export default function Page() {
  return <PostsPage />
}
