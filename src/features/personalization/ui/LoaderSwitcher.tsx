import React from 'react'

import { MemoryGameComponent } from '@/features/games/ui/MemoryGameComponent'
import { SnakeGame } from '@/features/games/ui/SnakeGame'
import { LoaderBlock, Typography } from '@byte-creators/ui-kit'
import { cn, useMediaQuery, useScopedTranslation } from '@byte-creators/utils'

type Props = {
  loaderType: string
}

export const LoaderSwitcher = ({ loaderType }: Props) => {
  const isLargeScreen = useMediaQuery('(min-width: 768px)')
  const t = useScopedTranslation('Personalization')

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
            <Typography variant={'h2'}>{t.cardGame.title1}</Typography>
            <Typography variant={'h3'}>{t.cardGame.title2}</Typography>
          </div>
          <div className={cn(['border-2 border-light-900', isLargeScreen ? 'w-[456px]' : 'w-fit'])}>
            <MemoryGameComponent columns={isLargeScreen ? 6 : 4} rows={isLargeScreen ? 6 : 4} />
          </div>
        </div>
      )

    case 'Snake game':
      return isLargeScreen ? (
        <SnakeGame cellsClassName={'h-10 w-10'} fieldWidth={23} title={t.snakeGame.title} />
      ) : (
        <SnakeGame
          cellsClassName={'h-8 w-8'}
          className={'m-1'}
          fieldHeight={10}
          fieldWidth={10}
          mobileMod
          title={t.snakeGame.title}
        />
      )

    default:
      return <LoaderBlock portal />
  }
}
