import { useState } from 'react'

export const useCreatePost = () => {
  const [isOpenCreatePost, setIsOpenCreatePost] = useState(false)

  return { isOpenCreatePost, setIsOpenCreatePost }
}
