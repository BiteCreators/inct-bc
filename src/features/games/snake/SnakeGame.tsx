import { useSnake } from '@/features/games/snake/useSnake'
import { Typography } from '@byte-creators/ui-kit'
import { DragonEgg, DragonHead } from '@byte-creators/ui-kit/icons'

type Props = {
  cellsClassName?: string
  fieldHeight?: number
  fieldWidth?: number
  title?: string
}
export const SnakeGame = ({
  cellsClassName = 'h-16 w-16',
  fieldHeight = 10,
  fieldWidth = 20,
  title,
}: Props) => {
  const {
    currentHeadPosition,
    currentTailEndPosition,
    direction,
    field,
    gameRunning,
    snakePosition,
  } = useSnake(fieldWidth, fieldHeight)

  const generateFieldCells = (field: number[][], snakePosition: { x: number; y: number }[]) => {
    return field.map((segment, rowIndex) =>
      segment.map((el, colIndex) => {
        // стиль для каждого квадрата
        const isSnake = snakePosition.some(
          segment => segment.x === colIndex && segment.y === rowIndex
        )
        let className = cellsClassName

        if (isSnake) {
          className += ' bg-white rounded-[30%]'

          // Проверяем, является ли текущая клетка головой змейки
          if (currentHeadPosition.x === colIndex && currentHeadPosition.y === rowIndex) {
            let rotationStyle = ''

            if (direction === 'left') {
              rotationStyle = 'scaleX(-1)'
            } else if (direction === 'up') {
              rotationStyle = 'rotate(270deg) scaleY(-1)'
            } else if (direction === 'down') {
              rotationStyle = 'rotate(90deg)'
            }

            return (
              <DragonHead
                className={className + ' !bg-transparent'}
                key={`${rowIndex}-${colIndex}`}
                style={{ transform: rotationStyle }}
              />
            )
          }

          // Проверяем, является ли текущая клетка хвостом змейки
          if (currentTailEndPosition.x === colIndex && currentTailEndPosition.y === rowIndex) {
            //className += ' !rounded-full' // Хвост змейки

            return <span className={className} key={`${rowIndex}-${colIndex}`} />
          }
        } else if (el === 2) {
          // Стиль для еды
          return (
            <DragonEgg
              className={className}
              fill={'text-danger-500'}
              key={`${rowIndex}-${colIndex}`}
            />
          )
        } else {
          // Стиль для пустого пространства
          className += ' bg-transparent border border-dark-500'
        }

        return <span className={className} key={`${rowIndex}-${colIndex}`} />
      })
    )
  }

  return (
    <div className={'m-6 w-fit'}>
      <Typography className={'my-2 flex justify-center'} variant={'h1'}>
        {title ? title : '"There is no snake. Now there is a dragon!" game'}
      </Typography>
      <div>{gameRunning ? 'Game is running' : 'Game is paused'}</div>
      <div
        className={'grid bg-dark-300'}
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
