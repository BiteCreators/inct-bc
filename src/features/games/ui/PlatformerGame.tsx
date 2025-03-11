import { usePlatformer } from '@/features/games/model/usePlatformer'
import { Typography } from '@byte-creators/ui-kit'

export const PlatformerGame = () => {
  const { boardHeight, boardRef, boardWidth, gameOver, isPaused, score } = usePlatformer()

  return (
    <div
      className={'w-[800px]'}
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
        <Typography
          className={isPaused ? 'text-light-100' : 'text-transparent'}
          variant={'regular-text'}
        >
          {gameOver ? 'Game Over! Press Enter to restart.' : 'Press Enter to start the game.'}
        </Typography>
      </div>
    </div>
  )
}
