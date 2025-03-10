import { useEffect, useRef, useState } from 'react'

type Hero = {
  height: number
  img: HTMLImageElement | null
  width: number
  x: number
  y: number
}

type Obstacle = {
  height: number
  img: HTMLImageElement | null
  width: number
  x: number
  y: number
}

export const usePlatformer = () => {
  const boardRef = useRef<HTMLCanvasElement | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [score, setScore] = useState(0)

  const boardWidth = 750
  const boardHeight = 250
  const heroWidth = 88
  const heroHeight = 94
  const heroX = 50
  const heroY = boardHeight - heroHeight

  const heroRef = useRef<Hero>({
    height: heroHeight,
    img: null,
    width: heroWidth,
    x: heroX,
    y: heroY,
  })

  const obstacleArrayRef = useRef<Obstacle[]>([])
  const velocityX = -8
  const gravity = 0.4
  const velocityYRef = useRef(0)

  const resetGame = () => {
    setGameOver(false)
    setScore(0)
    heroRef.current = {
      height: heroHeight,
      img: heroRef.current.img,
      width: heroWidth,
      x: heroX,
      y: heroY,
    }
    obstacleArrayRef.current = []
    velocityYRef.current = 0
  }

  const startGame = () => {
    setIsPaused(false)
    setGameOver(false)
    resetGame()
  }

  useEffect(() => {
    const board = boardRef.current

    if (!board) {
      return
    }

    const context = board.getContext('2d')

    if (!context) {
      return
    }

    const heroImg = new Image()

    heroImg.src = '/images/platformer/dragon-red.png'

    const obstacle1Img = new Image()

    obstacle1Img.src = '/images/platformer/cactus1.png'

    const obstacle2Img = new Image()

    obstacle2Img.src = '/images/platformer/cactus2.png'

    const obstacle3Img = new Image()

    obstacle3Img.src = '/images/platformer/cactus3.png'

    heroRef.current.img = heroImg

    let animationFrameId: number

    const update = () => {
      if (isPaused || gameOver) {
        return
      }

      context.clearRect(0, 0, board.width, board.height)

      velocityYRef.current += gravity
      heroRef.current.y = Math.min(heroRef.current.y + velocityYRef.current, heroY)

      if (heroRef.current.img) {
        context.drawImage(
          heroRef.current.img,
          heroRef.current.x,
          heroRef.current.y,
          heroRef.current.width,
          heroRef.current.height
        )
      }

      obstacleArrayRef.current.forEach((cactus, index) => {
        cactus.x += velocityX
        if (cactus.img) {
          context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height)
        }

        if (detectCollision(heroRef.current, cactus)) {
          setGameOver(true)
          setIsPaused(true)
        }

        if (cactus.x + cactus.width < 0) {
          obstacleArrayRef.current.splice(index, 1)
        }
      })

      setScore(prevScore => prevScore + 1)

      animationFrameId = requestAnimationFrame(update)
    }

    const placeObstacle = () => {
      if (isPaused || gameOver) {
        return
      }

      const obstacle: Obstacle = {
        height: 70,
        img: null,
        width: 34,
        x: boardWidth,
        y: boardHeight - 70,
      }

      const placeObstacleChance = Math.random()

      if (placeObstacleChance > 0.9) {
        obstacle.img = obstacle3Img
        obstacle.width = 102
      } else if (placeObstacleChance > 0.7) {
        obstacle.img = obstacle2Img
        obstacle.width = 69
      } else if (placeObstacleChance > 0.5) {
        obstacle.img = obstacle1Img
        obstacle.width = 34
      }

      if (obstacle.img) {
        obstacleArrayRef.current.push(obstacle)
      }
    }

    const gameInterval = setInterval(placeObstacle, 1000)

    animationFrameId = requestAnimationFrame(update)

    return () => {
      clearInterval(gameInterval)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isPaused, gameOver])

  const moveHero = (e: KeyboardEvent) => {
    if (isPaused || gameOver) {
      return
    }

    if ((e.code === 'Space' || e.code === 'ArrowUp') && heroRef.current.y === heroY) {
      velocityYRef.current = -10
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      if (isPaused || gameOver) {
        startGame()
      }
    } else {
      moveHero(e)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPaused, gameOver])

  const detectCollision = (a: Hero, b: Obstacle): boolean => {
    return (
      a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
    )
  }

  return { boardHeight, boardRef, boardWidth, gameOver, isPaused, score }
}
