import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { authSlice } from '@/entities/auth'
import { createPostSlice } from '@/entities/posts/model/createPostSlice'
import { useScopedTranslation } from '@byte-creators/utils'
import { useRouter } from 'next/router'

export const useStepControl = ({
  handleApplyFilters,
  uploadAllImages,
}: {
  handleApplyFilters: () => Promise<{ newFiles: File[] }>
  handlePublish: () => Promise<void>
  uploadAllImages: (files: File[]) => Promise<void>
}) => {
  const createPostState = useAppSelector(state => state.createPost)
  const { images, isOpenCreatePost, step } = createPostState
  const dispatch = useAppDispatch()
  const t = useScopedTranslation('Posts')

  const router = useRouter()
  const userId = useAppSelector(authSlice.selectors.selectUserId)

  let title
  let nextButtonTitle

  if (step === 1) {
    title = t.addPhoto
  } else if (step === 2) {
    title = t.cropping
    nextButtonTitle = t.next
  } else if (step === 3) {
    title = t.filters
    nextButtonTitle = t.next
  } else {
    title = t.publication
    nextButtonTitle = t.publish
  }

  const handleNext = async () => {
    switch (step) {
      case 1:
      case 2:
        dispatch(createPostSlice.actions.setStep(step + 1))
        break
      case 3:
        dispatch(createPostSlice.actions.setStep(step + 1))
        break
      case 4:
        try {
          const res = await handleApplyFilters()

          await uploadAllImages(res.newFiles)
        } catch (error) {
          console.log(error)
        }
        break
      default:
        break
    }
  }

  const handleBack = () => {
    dispatch(createPostSlice.actions.setStep(step - 1))
  }

  useEffect(() => {
    if (!isOpenCreatePost) {
      router.push(`/profile/${userId}`)
    }
    if (images.length === 0) {
      dispatch(createPostSlice.actions.setStep(1))
    }
  }, [images, dispatch, isOpenCreatePost, router, userId])

  return {
    handleBack,
    handleNext,
    nextButtonTitle,
    title,
  }
}
