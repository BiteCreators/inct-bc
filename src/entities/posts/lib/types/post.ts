export type Post = {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: Image[]
  isLiked: boolean
  likesCount: number
  location: null | string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}

type Image = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

type Owner = {
  firstName: string
  lastName: string
}
