import React, { ReactNode, createContext, useContext } from 'react'

import { MeResponse } from '@/entities/auth/api/auth.api'
import {
  Follower,
  FollowersResponse,
  WithFollowersCountUserProfile,
} from '@/entities/followers/types/followers.types'
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
  handleFollow: (userId: number) => Promise<void>
  handleReject: () => void

  me: MeResponse | undefined
  removeLoading: boolean

  setConfirmOpen: (open: boolean) => void
}

const FollowContext = createContext<FollowContextValue | null>(null)

type FollowProvider = {
  children: ReactNode
  currentUserProfile: WithFollowersCountUserProfile
}

export const useFollowContext = () => {
  const context = useContext(FollowContext)

  if (!context) {
    throw new Error('useFollowContext must be used within FollowProvider')
  }

  return context
}

export const FollowProvider = ({ children, currentUserProfile }: FollowProvider) => {
  const {
    apiError,
    confirmOpen,
    currentFollowerName,
    followLoading,
    followersList,
    followingList,
    handleConfirm,
    handleConfirmDeleting,
    handleFollow,
    handleReject,
    me,
    removeLoading,
    setConfirmOpen,
  } = useProfileFollow(currentUserProfile)

  return (
    <FollowContext.Provider
      value={{
        apiError,
        confirmOpen,
        currentFollowerName,
        followLoading,
        followersList,
        followingList,
        handleConfirm,
        handleConfirmDeleting,
        handleFollow,
        handleReject,
        me,
        removeLoading,
        setConfirmOpen,
      }}
    >
      {children}
    </FollowContext.Provider>
  )
}
