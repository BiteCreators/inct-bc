import { useEffect, useState } from 'react'

import { Button, Typography } from '@byte-creators/ui-kit'
import { cn } from '@byte-creators/utils'

type Card = {
  id: number
  image: string
  isFlipped: boolean
  isMatched: boolean
  name: string
}

type ValidNumbers = 2 | 3 | 4 | 5 | 6 | 7 | 8

type Props = {
  cardSize?: number
  columns: ValidNumbers
  rows: ValidNumbers
}

const images = [
  '/images/memory-game/art.png',
  '/images/memory-game/fox_face.png',
  '/images/memory-game/grapes.png',
  '/images/memory-game/heart_eyes.png',
  '/images/memory-game/sunglasses.png',
  '/images/memory-game/heart.png',
  '/images/memory-game/female_elf.png',
  '/images/memory-game/dragon.png',
  '/images/memory-game/cat2.png',
]

export const MemoryGameComponent = ({ cardSize = 64, columns, rows }: Props) => {
  const [cards, setCards] = useState<Card[]>([])
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)

  const restartGame = () => {
    const totalCards = columns * rows
    const shuffledCards = [...images, ...images]
      .slice(0, totalCards / 2)
      .map((img, i) => ({ id: i, image: img, isFlipped: false, isMatched: false, name: img }))
      .concat(
        [...images, ...images].slice(0, totalCards / 2).map((img, i) => ({
          id: i + 100,
          image: img,
          isFlipped: false,
          isMatched: false,
          name: img,
        }))
      )
      .sort(() => Math.random() - 0.5)

    setCards(shuffledCards)
    setMatchedPairs(0)
    setSelectedCards([])
  }

  const handleCardClick = (index: number) => {
    if (selectedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return
    }

    const newCards = [...cards]

    newCards[index].isFlipped = true
    setCards(newCards)
    setSelectedCards([...selectedCards, index])

    if (selectedCards.length === 1) {
      checkMatch(selectedCards[0], index)
    }
  }

  const checkMatch = (firstIndex: number, secondIndex: number) => {
    const newCards = [...cards]

    if (cards[firstIndex].image === cards[secondIndex].image) {
      newCards[firstIndex].isMatched = true
      newCards[secondIndex].isMatched = true
      setMatchedPairs(matchedPairs + 1)
    } else {
      setTimeout(() => {
        newCards[firstIndex].isFlipped = false
        newCards[secondIndex].isFlipped = false
        setCards([...newCards])
      }, 1000)
    }

    setSelectedCards([])
    setCards(newCards)
  }

  useEffect(() => {
    restartGame()
  }, [columns, rows])

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
