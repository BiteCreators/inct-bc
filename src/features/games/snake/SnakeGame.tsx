import { useEffect, useState } from 'react'

import { useSnake } from '@/features/games/snake/useSnake'
import { Typography } from '@byte-creators/ui-kit'

type Props = {}
export const SnakeGame = ({}: Props) => {
  const {
    currentHeadPosition,
    currentTailEndPosition,
    field,
    foodPosition,
    moveSnake,
    snakePosition,
    updateField,
  } = useSnake()

  const [gameRunning, setGameRunning] = useState<boolean>(true)
  // const [isSnakeHead, setIsSnakeHead] = useState<boolean>(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) {
        return
      }

      const snakeHead = snakePosition[0]

      switch (event.key) {
        case 'ArrowDown':
          if (gameRunning) {
            moveSnake({ x: snakeHead['x'], y: snakeHead['y'] + 1 })
          }
          break
        case 'ArrowUp':
          if (gameRunning) {
            moveSnake({ x: snakeHead['x'], y: snakeHead['y'] - 1 })
          }
          break
        case 'ArrowLeft':
          if (gameRunning) {
            moveSnake({ x: snakeHead['x'] - 1, y: snakeHead['y'] })
          }
          break
        case 'ArrowRight':
          if (gameRunning) {
            moveSnake({ x: snakeHead['x'] + 1, y: snakeHead['y'] })
          }
          break
        case ' ':
          setGameRunning(prev => !prev)
          break
        default:
          return
      }

      event.preventDefault()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [moveSnake])
  const generateFieldCells = (field: number[][], snakePosition: { x: number; y: number }[]) => {
    return field.map((segment, rowIndex) =>
      segment.map((el, colIndex) => {
        // Определяем стиль для каждого квадрата
        const isSnake = snakePosition.some(
          segment => segment.x === colIndex && segment.y === rowIndex
        )
        let className = 'h-9 w-9' // Устанавливаем фиксированную ширину и высоту для клеток

        if (isSnake) {
          // Стиль для части змейки
          className += ' bg-emerald-700 rounded-full' // Для змейки всегда полный радиус

          // Проверяем, является ли текущая клетка головой змейки
          if (currentHeadPosition.x === colIndex && currentHeadPosition.y === rowIndex) {
            className += ' bg-emerald-950' // Голова змейки красная
          }

          // Проверяем, является ли текущая клетка хвостом змейки
          if (currentTailEndPosition.x === colIndex && currentTailEndPosition.y === rowIndex) {
            className += ' bg-emerald-700' // Хвост змейки (круглый и со скругленным правым углом)
          }
        } else if (el === 2) {
          // Стиль для еды
          className += ' bg-red-800 rounded-full'
        } else {
          // Стиль для пустого пространства
          className += ' bg-transparent border border-gray-500' // Добавляем границу для пустых клеток
        }

        return <span className={className} key={`${rowIndex}-${colIndex}`} />
      })
    )
  }

  // Стиль и визуализация поля
  return (
    <div className={'m-6 w-fit'}>
      <Typography className={'my-2'} variant={'h1'}>
        Snake game
      </Typography>
      <div>{gameRunning ? 'Game is running' : 'Game is paused'}</div>
      <div
        className={'grid bg-dark-100'}
        style={{
          gridTemplateColumns: `repeat(${field[0].length}, 1fr)`,
          gridTemplateRows: `repeat(${field.length}, 1fr)`,
        }}
      >
        {generateFieldCells(field, snakePosition)}
      </div>
    </div>
  )
}
