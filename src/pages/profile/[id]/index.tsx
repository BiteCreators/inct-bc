import { cn } from '@/common/lib/utils/cn'
import { authApi } from '@/entities/auth'
import { PostDetailsModal } from '@/features/posts/ui/PostDetailsModal'
import { ProfileHeader } from '@/widgets/profile-header'
import { useRouter } from 'next/router'

import exampleAvatar from '../../../../public/examples/0a9f264bc73447e3ce0157c47fae210a (1).jpg'

export type Post = {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: Image[]
  isLiked: boolean
  likesCount: number
  location?: string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}
type Owner = {
  firstName: string
  lastName: string
}
type Image = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export default function CurrentProfile() {
  const router = useRouter()
  const { id } = router.query
  const { data } = authApi.useMeQuery()

  const slides = [
    {
      createdAt: '',
      fileSize: 1,
      height: 1,
      uploadId: '1',
      url: 'https://i1.sndcdn.com/artworks-nO3R0izz9UnXtHhQ-z1R29Q-t500x500.jpg',
      width: 1,
    },
    {
      createdAt: '',
      fileSize: 1,
      height: 1,
      uploadId: '2',
      url: 'https://i1.sndcdn.com/artworks-000066235753-ysrir2-t500x500.jpg',
      width: 1,
    },
    {
      createdAt: '',
      fileSize: 1,
      height: 1,
      uploadId: '3',
      url: 'https://i1.sndcdn.com/artworks-000022548343-t02iuc-t500x500.jpg',
      width: 1,
    },
  ] as Image[]

  const postForModal = {
    avatarOwner: exampleAvatar.src,
    createdAt: 'July 3, 2021',
    description: '',
    id: 1,
    images: slides,
    isLiked: false,
    likesCount: 0,
    location: '',
    owner: { firstName: '', lastName: '' } as Owner,
    ownerId: 1,
    updatedAt: '',
    userName: 'UserName',
  } as Post

  return (
    <div className={cn('px-[15px] md:pl-6 md:pr-16')}>
      <ProfileHeader />
      Profile ID : {id}
      <PostDetailsModal post={postForModal} />
    </div>
  )
}
