import { useState } from 'react'

type SnakeType = FieldSegmentType[]
type FieldType = number[][]
type FieldSegmentType = { x: number; y: number }

export const useSnake = () => {
  // Инициализация змейки
  const startSnakePosition = [
    { x: 20, y: 2 },
    { x: 21, y: 2 },
    { x: 22, y: 2 },
  ]
  const startFoodPosition = { x: 5, y: 5 }
  const [snakePosition, setSnakePosition] = useState<SnakeType>(startSnakePosition)
  // Инициализация еды
  const [foodPosition, setFoodPosition] = useState<FieldSegmentType>(startFoodPosition)

  const fieldWidth = 40
  const fieldHeight = 20
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
    console.log('Рестарт игры!')
    setSnakePosition(startSnakePosition)
    setFoodPosition(startFoodPosition)
    setField(startField)
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
  const moveSnake = (newHeadPosition: { x: number; y: number }) => {
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
    // Создаем копию массива змейки и поля
    const nextSnakePosition = [newHeadPosition, ...snakePosition.slice(0, snakePosition.length - 1)] // Двигаем змейку

    // Копируем поле, чтобы не изменять напрямую старое состояние
    const newField = field.map(row => [...row])

    // Очищаем старые позиции змейки на поле (ставим 0)
    snakePosition.forEach(segment => {
      newField[segment.y][segment.x] = 0
    })

    // Размещение новой головы на поле
    newField[newHeadPosition.y][newHeadPosition.x] = 1
    setInterval(() => {
      newField[snakePosition[0].y][snakePosition[0].x - 1] = 1
    }, 1000)

    // Обновляем состояние змейки и поля
    setSnakePosition(nextSnakePosition)
    setField(newField)
    eatFood()
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
    field,
    foodPosition,
    moveSnake,
    snakePosition,
    updateField,
  }
}
