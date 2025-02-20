import React, { ReactNode, createContext, useContext } from 'react'

import { MeResponse } from '@/entities/auth/api/auth.api'

import {
  Follower,
  FollowersResponse,
  UserProfile,
} from '@/entities/followers/types/followers.types'

import { useProfileFollow } from '@/features/profile/model/useProfileFollow'

type FollowContextValue = {
  confirmOpen: boolean
  currentFollowerName: string
  error: null | string
  followLoading: boolean

  followers?: null | number
  followersList: FollowersResponse | undefined
  following?: null | number
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

type FollowProviderProps = {
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

export const FollowProvider = ({ children, currentUserProfile }: FollowProviderProps) => {
  const followData = useProfileFollow(currentUserProfile)

  return <FollowContext.Provider value={followData}>{children}</FollowContext.Provider>
}
