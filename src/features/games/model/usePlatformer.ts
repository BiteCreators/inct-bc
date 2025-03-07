import { useEffect, useRef, useState } from 'react'

export const usePlatformer = (fieldWidth: number, fieldHeight: number) => {
  const [dinoPosition, setDinoPosition] = useState({ x: 50, y: fieldHeight - 50 })
  const [jumping, setJumping] = useState(false)
  const [jumpHeight, setJumpHeight] = useState(0)
  const [gravity, setGravity] = useState(2)
  const [gameStatus, setGameStatus] = useState<'gameOver' | 'playing'>('gameOver')

  const dinoSpeed = 5 // скорость движения динозавра
  const obstacleSpeed = 5 // скорость движения препятствий
  const jumpMaxHeight = 50 // Максимальная высота прыжка
  const jumpSpeed = 10 // Скорость прыжка

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctx = canvasRef.current?.getContext('2d')

  const [obstacles, setObstacles] = useState([
    { height: 30, width: 30, x: fieldWidth, y: fieldHeight - 50 },
  ])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx) {
      return
    }

    canvas.width = fieldWidth
    canvas.height = fieldHeight

    const dinoWidth = 50
    const dinoHeight = 50

    const drawDino = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'green'
      ctx.fillRect(dinoPosition.x, dinoPosition.y - jumpHeight, dinoWidth, dinoHeight)
    }

    const moveDino = () => {
      if (gameStatus === 'playing') {
        setDinoPosition(prev => ({ ...prev, x: prev.x + dinoSpeed }))
      }
    }

    const moveObstacles = () => {
      if (gameStatus === 'playing') {
        setObstacles(prevObstacles =>
          prevObstacles
            .map(obstacle => ({ ...obstacle, x: obstacle.x - obstacleSpeed }))
            .filter(obstacle => obstacle.x > 0)
        )
      }
    }

    const drawObstacles = () => {
      ctx.fillStyle = 'red'
      obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
      })
    }

    const checkCollision = () => {
      obstacles.forEach(obstacle => {
        if (
          dinoPosition.x < obstacle.x + obstacle.width &&
          dinoPosition.x + 50 > obstacle.x &&
          dinoPosition.y - jumpHeight < obstacle.y + obstacle.height &&
          dinoPosition.y > obstacle.y
        ) {
          setGameStatus('gameOver')
        }
      })
    }

    const jump = () => {
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
    }

    const gameLoop = () => {
      if (gameStatus === 'playing') {
        jump()
        moveDino()
        moveObstacles()
        checkCollision()
        drawDino()
        drawObstacles()
      }
      requestAnimationFrame(gameLoop)
    }

    // Запуск игрового цикла
    if (gameStatus === 'playing') {
      gameLoop()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) {
        return
      }

      if (e.key === ' ' && !jumping) {
        setJumping(true)
      }

      if (e.key === 'Enter' && gameStatus === 'gameOver') {
        // Сброс игры
        setGameStatus('playing')
        setDinoPosition({ x: 50, y: fieldHeight - 50 })
        setObstacles([{ height: 30, width: 30, x: fieldWidth, y: fieldHeight - 50 }])
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [jumpHeight, jumping, dinoPosition, obstacles, gameStatus])

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameStatus === 'playing') {
        setObstacles(prev => [
          ...prev,
          { height: 30, width: 30, x: fieldWidth, y: fieldHeight - 50 },
        ])
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [gameStatus])

  return {
    canvasRef,
    dinoPosition,
    gameStatus,
    gravity,
    jumpHeight,
    jumping,
    obstacles,
    setGameStatus,
  }
}
