import React, { ReactNode, createContext, useContext } from 'react'

import { MeResponse } from '@/entities/auth/api/auth.api'
import { Follower, FollowersResponse } from '@/entities/followers/types/followers.types'
import { useProfileFollow } from '@/features/profile/model/useProfileFollow'

type FollowContextValue = {
  apiError: string
  confirmOpen: boolean
  currentFollowerName: string
  followLoading: boolean

  followersList: FollowersResponse | undefined
  followingList: FollowersResponse | undefined
  handleConfirm: () => void
  handleConfirmDeleting: (user: Follower) => void
  handleDeleteFollower: (userId: number) => Promise<void>
  handleFollow: (userId: number) => Promise<void>
  handleReject: () => void

  isFollowersLoading: boolean
  isFollowingLoading: boolean
  me: MeResponse | undefined
  removeLoading: boolean

  setConfirmOpen: (open: boolean) => void
}

const FollowContext = createContext<FollowContextValue | null>(null)

type FollowProvider = {
  children: ReactNode
  currentUserProfile: { userName: string }
}

export const useFollowContext = () => {
  const context = useContext(FollowContext)

  if (!context) {
    throw new Error('useFollowContext must be used within FollowProvider')
  }

  return context
}

// eslint-disable-next-line no-redeclare
export const FollowProvider = ({ children, currentUserProfile }: FollowProvider) => {
  const followData = useProfileFollow(currentUserProfile)

  return <FollowContext.Provider value={followData}>{children}</FollowContext.Provider>
}
