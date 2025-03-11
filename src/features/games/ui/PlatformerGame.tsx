import { Mode, usePlatformer } from '@/features/games/model/usePlatformer'
import { Button, Typography } from '@byte-creators/ui-kit'

type Props = {
  mode?: Mode
}

export const PlatformerGame = ({ mode = 'desktop' }: Props) => {
  const { boardHeight, boardRef, boardWidth, gameOver, isPaused, moveHero, score, startGame } =
    usePlatformer(mode)
  let bgWidth = 'w-[335px]'

  if (mode === 'desktop') {
    bgWidth = 'w-[800px]'
  } else if (mode === 'tablet') {
    bgWidth = 'w-96'
  }

  return (
    <div
      className={bgWidth}
      style={{
        backgroundImage: `url(/images/platformer/bg.gif)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <canvas height={boardHeight} id={'board'} ref={boardRef} width={boardWidth} />
      <div className={'p-3 text-light-100 bg-dark-700'}>
        <Typography className={'pb-1'} variant={'small-text'}>
          Score: {score}
        </Typography>
        {mode === 'desktop' ? (
          <Typography
            className={isPaused ? 'text-light-100' : 'text-transparent'}
            variant={'regular-text'}
          >
            {gameOver ? 'Game Over! Press Enter to restart.' : 'Press Enter to start the game.'}
          </Typography>
        ) : (
          <div className={'flex justify-end gap-5'}>
            {isPaused ? (
              <Button onClick={startGame}>{gameOver ? 'Restart' : 'Start'}</Button>
            ) : (
              <Button onClick={moveHero}>Jump</Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
