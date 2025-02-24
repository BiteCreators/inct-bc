import { type Post } from '@/entities/posts'
import { useRouter } from 'next/router'

export const useHandleNavigateToImage = (post: Post) => {
  const router = useRouter()

  const handleNavigateToImage = (imageUrl: string) => {
    const proxyUrl = `/api/proxy?path=${encodeURIComponent(imageUrl)}`

    router.push({
      pathname: `/profile/${post?.ownerId}/publications/${post?.id}/view`,
      query: { image: proxyUrl },
    })
  }

  return handleNavigateToImage
}
