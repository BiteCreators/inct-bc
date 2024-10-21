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
  firstName?: string
  lastName?: string
}
export type Image = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
