import { useEffect, useRef, useState } from 'react'

export const usePlatformer = (fieldWidth: number, fieldHeight: number) => {
  const [dinoPosition, setDinoPosition] = useState({ x: 50, y: fieldHeight - 50 })
  const [jumping, setJumping] = useState(false)
  const [jumpHeight, setJumpHeight] = useState(0)
  const [gravity, setGravity] = useState(2)
  const dinoSpeed = 5 // скорость движения динозавра
  const obstacleSpeed = 5 // скорость движения препятствий
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  const [obstacles, setObstacles] = useState([
    { height: 30, width: 30, x: 500, y: fieldHeight - 50 },
  ])

  const jumpMaxHeight = 50 // Уменьшаем максимальную высоту прыжка
  const jumpSpeed = 10

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctx = canvasRef.current?.getContext('2d')

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d') //контекст рисования

    if (!canvas || !ctx) {
      return
    }

    // Устанавливаем размеры канваса
    canvas.width = fieldWidth
    canvas.height = fieldHeight

    const dinoWidth = 50
    const dinoHeight = 50
    const dinoX = dinoPosition.x
    const dinoY = dinoPosition.y

    // Рисуем динозаврика
    const drawDino = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height) // Очистка канваса
      ctx.fillStyle = 'green'
      ctx.fillRect(dinoX, dinoY - jumpHeight, dinoWidth, dinoHeight) // Рисуем динозаврика с учётом прыжка
    }

    // Двигаем динозавра
    const moveDino = () => {
      setDinoPosition(prev => ({ ...prev, x: prev.x + dinoSpeed })) // Двигаем динозавра вправо
    }

    // Двигаем препятствия
    const moveObstacles = () => {
      setObstacles(
        prevObstacles =>
          prevObstacles
            .map(obstacle => ({ ...obstacle, x: obstacle.x - obstacleSpeed })) // Двигаем препятствия влево
            .filter(obstacle => obstacle.x > 0) // Удаляем препятствия, которые вышли за экран
      )
    }

    // Рисуем препятствия
    const drawObstacles = () => {
      if (ctx) {
        ctx.fillStyle = 'red' // Цвет препятствий
        obstacles.forEach(obstacle => {
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height) // Рисуем препятствия
        })
      }
    }

    // Обработка прыжка
    const jump = () => {
      if (jumping) {
        setJumpHeight(prev => prev + jumpSpeed)
        if (jumpHeight >= jumpMaxHeight) {
          setJumping(false) // Прекращаем прыжок
        }
      } else {
        // Падение
        if (dinoPosition.y < fieldHeight - 50) {
          setJumpHeight(prev => prev - gravity) // Опускаем динозаврика при падении
        } else {
          setJumpHeight(0) // Когда на земле, высота прыжка сбрасывается в 0
        }
      }
    }

    // Основной игровой цикл
    const gameLoop = () => {
      jump() // Прыжок или падение
      moveDino() // Двигаем динозавра
      moveObstacles() // Двигаем препятствия
      drawDino() // Отрисовываем динозавра
      drawObstacles() // Отрисовываем препятствия
      requestAnimationFrame(gameLoop) // Повторяем игровой цикл
    }

    gameLoop() // Запускаем игровой цикл

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) {
        return
      }

      if (e.key === ' ' && !jumping) {
        setJumping(true) // Начинаем прыжок
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [jumpHeight, jumping, dinoPosition, obstacles])

  useEffect(() => {
    const interval = setInterval(() => {
      if (jumping) {
        setJumpHeight(prev => prev + jumpSpeed)
        if (jumpHeight >= jumpMaxHeight) {
          setJumping(false)
        }
      } else {
        if (dinoPosition.y < fieldHeight - 50) {
          setJumpHeight(prev => prev - gravity)
        } else {
          setJumpHeight(0)
        }
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [dinoPosition, jumping, jumpHeight])

  useEffect(() => {
    const interval = setInterval(() => {
      // Перемещаем препятствия
      setObstacles(prevObstacles => {
        return prevObstacles
          .map(obstacle => ({
            ...obstacle,
            x: obstacle.x - obstacleSpeed, // Двигаем препятствия влево
          }))
          .filter(obstacle => obstacle.x > 0) // Удаляем препятствия, которые вышли за экран
      })

      // Добавляем новые препятствия
      if (Math.random() < 0.02) {
        setObstacles(prev => [
          ...prev,
          { height: 30, width: 30, x: fieldWidth, y: fieldHeight - 50 }, // Новое препятствие
        ])
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [fieldWidth, fieldHeight])

  return {
    canvasRef,
    dinoPosition,
    gravity,
    jumpHeight,
    jumping,
    obstacles,
  }
}
