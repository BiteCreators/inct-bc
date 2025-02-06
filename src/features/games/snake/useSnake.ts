import { useEffect, useState } from 'react'

type SnakeType = FieldSegmentType[]
type FieldType = number[][]
type FieldSegmentType = { x: number; y: number }

export const useSnake = (fieldWidth: number, fieldHeight: number) => {
  // Инициализация змейки
  const startSnakePosition = [
    { x: 5, y: 2 },
    { x: 4, y: 2 },
    { x: 3, y: 2 },
  ]
  const startFoodPosition = { x: 5, y: 5 }
  const [snakePosition, setSnakePosition] = useState<SnakeType>(startSnakePosition)
  // Инициализация еды
  const [foodPosition, setFoodPosition] = useState<FieldSegmentType>(startFoodPosition)

  // Инициализация направления
  const [direction, setDirection] = useState<string>('right')
  const [gameRunning, setGameRunning] = useState<boolean>(true)

  // Инициализация поля
  const startField: FieldType = Array(fieldHeight)
    .fill(null)
    .map(() => Array(fieldWidth).fill(0))
  const [field, setField] = useState<FieldType>(startField)

  // Размещение змейки на поле
  snakePosition.forEach(segment => {
    field[segment.y][segment.x] = 1 // 1 означает, что это часть змейки
  })

  // Размещение еды на поле
  field[foodPosition.y][foodPosition.x] = 2 // 2 означает, что это еда
  const restartGame = () => {
    setDirection('right')
    setSnakePosition(startSnakePosition)
    setFoodPosition(startFoodPosition)
    setField(startField)
    setGameRunning(true)
  }

  const updateField = () => {
    // Копируем поле
    const newField = startField.map(row => [...row])

    // Размещение змейки на поле (segment это одна строка)
    snakePosition.forEach(segment => {
      if (segment.y < fieldHeight && segment.x < fieldWidth) {
        newField[segment.y][segment.x] = 1
      }
    })

    // Размещение еды на поле
    if (foodPosition.y < fieldHeight && foodPosition.x < fieldWidth) {
      newField[foodPosition.y][foodPosition.x] = 2
    }
    // Обновляем состояние поля
    setField(newField)
  }
  const moveSnake = () => {
    const head = snakePosition[0]
    let newHeadPosition: FieldSegmentType

    // Определяем новую позицию головы в зависимости от направления
    switch (direction) {
      case 'up':
        newHeadPosition = { x: head.x, y: head.y - 1 }
        break
      case 'down':
        newHeadPosition = { x: head.x, y: head.y + 1 }
        break
      case 'left':
        newHeadPosition = { x: head.x - 1, y: head.y }
        break
      case 'right':
        newHeadPosition = { x: head.x + 1, y: head.y }
        break
      default:
        return
    }

    // Проверяем, что новая позиция головы в пределах поля
    if (
      newHeadPosition.x < 0 ||
      newHeadPosition.x >= fieldWidth ||
      newHeadPosition.y < 0 ||
      newHeadPosition.y >= fieldHeight
    ) {
      // Если змейка выходит за пределы поля, остановим игру или вернемся в исходную позицию
      restartGame()

      return
    }
    const nextSnakePosition = [newHeadPosition, ...snakePosition.slice(0, snakePosition.length - 1)]

    if (newHeadPosition.x === foodPosition.x && newHeadPosition.y === foodPosition.y) {
      const newSnakePositionWithFood = [newHeadPosition, ...snakePosition]

      setSnakePosition(newSnakePositionWithFood)
      eatFood()
    } else {
      setSnakePosition(nextSnakePosition)
    }

    updateField()
  }
  const eatFood = () => {
    // Проверяем, съедена ли еда
    if (snakePosition[0].x === foodPosition.x && snakePosition[0].y === foodPosition.y) {
      // Увеличиваем змейку (добавляем новый сегмент в начало)
      const newHeadPosition = { x: snakePosition[0].x, y: snakePosition[0].y }
      const newSnakePosition = [newHeadPosition, ...snakePosition] // Добавляем новый сегмент в начало

      // Генерируем новую еду
      let newFoodPosition: FieldSegmentType = { x: -1, y: -1 }

      do {
        const randomFoodX = Math.floor(Math.random() * fieldWidth)
        const randomFoodY = Math.floor(Math.random() * fieldHeight)

        newFoodPosition = { x: randomFoodX, y: randomFoodY }
      } while (
        snakePosition.some(
          segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y
        )
      )

      // Обновляем состояние змейки и еды
      setFoodPosition(newFoodPosition)
      setSnakePosition(newSnakePosition)
      updateField()
    }
  }

  if (snakePosition[0]['x'] === foodPosition['x'] && snakePosition[0]['y'] === foodPosition['y']) {
    eatFood()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameRunning) {
        moveSnake()
      }
    }, 300)

    return () => clearInterval(interval)
  }, [snakePosition, direction, gameRunning])

  // Обработчик нажатий клавиш
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) {
        return
      }

      switch (event.key) {
        case 'ArrowUp':
          if (gameRunning) {
            setDirection('up')
          }
          break
        case 'ArrowDown':
          if (gameRunning) {
            setDirection('down')
          }
          break
        case 'ArrowLeft':
          if (gameRunning) {
            setDirection('left')
          }
          break
        case 'ArrowRight':
          if (gameRunning) {
            setDirection('right')
          }
          break
        case ' ':
          setGameRunning(prev => !prev)
          break
        case 'Enter':
          restartGame()
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
  }, [])

  const currentHeadPosition: FieldSegmentType = {
    x: snakePosition[0]['x'],
    y: snakePosition[0]['y'],
  }
  const currentTailEndPosition: FieldSegmentType = {
    x: snakePosition[snakePosition.length - 1]['x'],
    y: snakePosition[snakePosition.length - 1]['y'],
  }

  return {
    currentHeadPosition,
    currentTailEndPosition,
    direction,
    field,
    foodPosition,
    gameRunning,
    moveSnake,
    snakePosition,
    updateField,
  }
}
