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

export type Mode = 'desktop' | 'mobile' | 'tablet'

export const usePlatformer = (mode: Mode = 'desktop') => {
  const boardRef = useRef<HTMLCanvasElement | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [score, setScore] = useState(0)

  let scale: number

  if (mode === 'desktop') {
    scale = 1
  } else {
    scale = mode === 'tablet' ? 0.5 : 0.4
  }

  const baseBoardWidth = 750
  const baseBoardHeight = 250
  const baseHeroWidth = 88
  const baseHeroHeight = 94
  const baseHeroX = 50
  const baseObstacleHeight = 70
  const baseObstacleWidth = 34

  const boardWidth = baseBoardWidth * scale
  const boardHeight = baseBoardHeight * scale
  const heroWidth = baseHeroWidth * scale
  const heroHeight = baseHeroHeight * scale
  const heroX = baseHeroX * scale
  const heroY = boardHeight - heroHeight

  const heroRef = useRef<Hero>({
    height: heroHeight,
    img: null,
    width: heroWidth,
    x: heroX,
    y: heroY,
  })

  const obstacleArrayRef = useRef<Obstacle[]>([])
  const velocityX = -7 * scale
  const gravity = 0.4 * scale
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

  const moveHero = () => {
    if (isPaused || gameOver) {
      return
    }

    if (heroRef.current.y === heroY) {
      velocityYRef.current = -10 * scale
    }
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

    obstacle1Img.src = '/images/platformer/stone.png'

    const obstacle2Img = new Image()

    obstacle2Img.src = '/images/platformer/tree.png'

    const obstacle3Img = new Image()

    obstacle3Img.src = '/images/platformer/castle.png'

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

      obstacleArrayRef.current.forEach((obstacle, index) => {
        obstacle.x += velocityX
        if (obstacle.img) {
          context.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height)
        }

        if (detectCollision(heroRef.current, obstacle)) {
          setGameOver(true)
          setIsPaused(true)
        }

        if (obstacle.x + obstacle.width < 0) {
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
        height: baseObstacleHeight * scale,
        img: null,
        width: baseObstacleWidth * scale,
        x: boardWidth,
        y: boardHeight - baseObstacleHeight * scale,
      }

      const placeObstacleChance = Math.random()

      if (placeObstacleChance > 0.9) {
        obstacle.img = obstacle3Img
        obstacle.width = 102 * scale
      } else if (placeObstacleChance > 0.7) {
        obstacle.img = obstacle2Img
        obstacle.width = 60 * scale
      } else if (placeObstacleChance > 0.5) {
        obstacle.img = obstacle1Img
        obstacle.width = 40 * scale
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
  }, [isPaused, gameOver, scale])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (mode === 'desktop') {
      if (e.code === 'Enter') {
        if (isPaused || gameOver) {
          startGame()
        }
      } else if (e.code === 'Space' || e.code === 'ArrowUp') {
        moveHero()
      }
    }
  }

  useEffect(() => {
    if (mode === 'desktop') {
      window.addEventListener('keydown', handleKeyDown)

      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isPaused, gameOver, mode])

  const detectCollision = (a: Hero, b: Obstacle): boolean => {
    return (
      a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
    )
  }

  return { boardHeight, boardRef, boardWidth, gameOver, isPaused, moveHero, score, startGame }
}
