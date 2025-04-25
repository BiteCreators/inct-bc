import { useSnake } from '@/features/games/model/useSnake'
import { Typography } from '@byte-creators/ui-kit'
import {
  DragonEgg,
  DragonHead,
  PauseCircleOutline,
  PlayCircleOutline,
} from '@byte-creators/ui-kit/icons'
import { cn } from '@byte-creators/utils'

type Props = {
  cellsClassName?: string
  className?: string
  fieldHeight?: number
  fieldWidth?: number
  mobileMod?: boolean
  title?: string
}

export const SnakeGame = ({
  cellsClassName = 'h-16 w-16',
  className,
  fieldHeight = 10,
  fieldWidth = 20,
  mobileMod = false,
  title,
}: Props) => {
  const {
    currentHeadPosition,
    currentTailEndPosition,
    direction,
    field,
    gameRunning,
    handleKeyDown,
    moveSnake,
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

  // Мобильный режим: кнопки для управления
  const renderMobileControls = (
    <div className={'flex justify-center items-center bg-dark-300'}>
      <div className={'flex flex-col items-center'}>
        <button
          className={'border border-light-900 py-2 px-3 rounded mb-2'}
          onClick={() => handleKeyDown({ key: 'ArrowUp' })}
        >
          ↑
        </button>
        <div className={'flex items-center'}>
          <button
            className={'border border-light-900 p-2 rounded mr-2'}
            onClick={() => handleKeyDown({ key: 'ArrowLeft' })}
          >
            ←
          </button>
          <button
            className={'border border-light-900 p-2 rounded'}
            onClick={() => handleKeyDown({ key: ' ' })}
          >
            {gameRunning ? <PauseCircleOutline /> : <PlayCircleOutline />}
          </button>
          <button
            className={'border border-light-900 p-2 rounded ml-2'}
            onClick={() => handleKeyDown({ key: 'ArrowRight' })}
          >
            →
          </button>
        </div>
        <button
          className={'border border-light-900 py-2 px-3 rounded mt-2'}
          onClick={() => handleKeyDown({ key: 'ArrowDown' })}
        >
          ↓
        </button>
      </div>
    </div>
  )

  return (
    <div className={cn([className, 'w-fit relative', !mobileMod && 'm-6'])}>
      {!mobileMod && (
        <>
          <Typography className={'my-2 flex justify-center'} variant={mobileMod ? 'h3' : 'h1'}>
            {title ? title : '"There is no snake. Now there is a dragon!" game'}
          </Typography>
          <div>{gameRunning ? 'Game is running' : 'Game is paused'}</div>
        </>
      )}

      <div
        className={'grid bg-dark-300'}
        style={{
          gridTemplateColumns: `repeat(${field[0].length}, 1fr)`,
          gridTemplateRows: `repeat(${field.length}, 1fr)`,
        }}
      >
        {generateFieldCells(field, snakePosition)}
      </div>
      {mobileMod && (
        <div className={'bg-dark-300 flex p-1'}>
          <Typography className={'my-2 flex justify-center pr-2'} variant={mobileMod ? 'h3' : 'h1'}>
            {title ? title : '"There is no snake. Now there is a dragon!" game'}
          </Typography>
          {mobileMod && renderMobileControls}
        </div>
      )}
    </div>
  )
}
