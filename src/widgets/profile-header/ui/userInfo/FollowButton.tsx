import React from 'react'

import { Button } from '@byte-creators/ui-kit'

type Props = {
  handlerFollowBtn: () => void
  isFollow: boolean | undefined
}

export const FollowButton = ({ handlerFollowBtn, isFollow }: Props) => (
  <Button onClick={handlerFollowBtn}>{isFollow ? 'Unfollow' : 'Follow'}</Button>
)
