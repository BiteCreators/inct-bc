import { useMemoryGame } from '@/features/games/model/useMemoryGame'
import { ValidNumbers } from '@/features/games/types/memoryGame.types'
import { Button, Typography } from '@byte-creators/ui-kit'
import { cn } from '@byte-creators/utils'

type Props = {
  cardSize?: number
  columns: ValidNumbers
  rows: ValidNumbers
}

export const MemoryGameComponent = ({ cardSize = 64, columns, rows }: Props) => {
  const { cards, handleCardClick, matchedPairs, restartGame } = useMemoryGame(columns, rows)

  return (
    <div>
      {matchedPairs === cards.length / 2 ? (
        <div className={'mt-4 p-4 text-center'}>
          <Typography variant={'large'}>🎉 You win!</Typography>
          <Button className={'my-2'} onClick={restartGame}>
            Restart
          </Button>
        </div>
      ) : (
        <div
          className={`grid gap-2 p-4`}
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {cards.map((card, index) => (
            <div
              className={cn([
                'border border-light-900 flex items-center',
                'justify-center text-white font-bold cursor-pointer transition',
                card.isFlipped || card.isMatched ? 'bg-primary-700' : 'bg-dark-300',
              ])}
              key={card.id}
              onClick={() => handleCardClick(index)}
              style={{ height: `${cardSize}px`, width: `${cardSize}px` }}
            >
              {card.isFlipped ? (
                <img alt={'card'} className={cn(['w-full h-full'])} src={card.image} />
              ) : (
                '?'
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
