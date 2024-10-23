import { postsApi } from '@/common/api/posts.api'
import { useConfirmation } from '@/common/ui/action-confirmation/useConfirmation'
import { DropdownItem } from '@/common/ui/dropdown/Dropdown'
import { useParams } from 'next/navigation'

export const useDropdownPost = () => {
  const { confirmOpen, handleConfirm, handleReject, requestConfirmation, setConfirmOpen } =
    useConfirmation()
  const copyLinkHandler = async () => {
    await navigator.clipboard.writeText(window.location.href)
  }
  const [deletePost] = postsApi.useDeletePostMutation()
  const params = useParams()
  const postId = Number(params?.id) ?? null

  const deletePostHandler = async () => {
    const isConfirmed = await requestConfirmation()

    if (isConfirmed) {
      deletePost({ postId })
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
