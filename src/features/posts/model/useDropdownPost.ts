import { postsApi } from '@/common/api/posts.api'
import { useConfirmation } from '@/common/ui/action-confirmation/useConfirmation'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

export const useDropdownPost = () => {
  const { confirmOpen, handleConfirm, handleReject, requestConfirmation, setConfirmOpen } =
    useConfirmation()
  const router = useRouter()
  const copyLinkHandler = async () => {
    await navigator.clipboard.writeText(window.location.href)
  }
  const [deletePost] = postsApi.useDeletePostMutation()
  const params = useParams()
  const postId = Number(params?.postId) ?? null

  const deletePostHandler = async () => {
    const isConfirmed = await requestConfirmation()

    if (isConfirmed) {
      await deletePost({ postId })
      await router.push('/')
    }
  }

  return {
    confirmOpen,
    copyLinkHandler,
    deletePostHandler,
    handleConfirm,
    handleReject,
    setConfirmOpen,
  }
}
