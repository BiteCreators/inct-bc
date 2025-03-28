import React from 'react'

import { MemoryGameComponent } from '@/features/games/ui/MemoryGameComponent'
import { SnakeGame } from '@/features/games/ui/SnakeGame'
import { LoaderBlock, Typography } from '@byte-creators/ui-kit'
import { cn, useMediaQuery } from '@byte-creators/utils'

type Props = {
  loaderType: string
}

export const LoaderSwitcher = ({ loaderType }: Props) => {
  const isLargeScreen = useMediaQuery('(min-width: 768px)')

  switch (loaderType) {
    case 'Memory card game':
      return (
        <div
          className={cn([
            'flex text-center items-center justify-around p-2',
            !isLargeScreen && 'flex-col gap-4',
          ])}
        >
          <div className={'text-center items-center justify-center'}>
            <Typography variant={'h2'}>Fancy a game while you wait?🤔</Typography>
            <Typography variant={'h3'}>We&#39;re on a mission to find the cutest emojis</Typography>
          </div>
          <div className={cn(['border-2 border-light-900', isLargeScreen ? 'w-[456px]' : 'w-fit'])}>
            <MemoryGameComponent columns={isLargeScreen ? 6 : 4} rows={isLargeScreen ? 6 : 4} />
          </div>
        </div>
      )

    case 'Snake game':
      return isLargeScreen ? (
        <SnakeGame
          cellsClassName={'h-10 w-10'}
          fieldWidth={23}
          title={'Help the dragon catch the egg while the post is loading!'}
        />
      ) : (
        <SnakeGame
          cellsClassName={'h-8 w-8'}
          className={'m-1'}
          fieldHeight={10}
          fieldWidth={10}
          mobileMod
          title={'Help the dragon catch the egg while the post is loading!'}
        />
      )

    default:
      return <LoaderBlock portal />
  }
}
