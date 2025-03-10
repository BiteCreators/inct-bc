import { useEffect, useRef, useState } from 'react'

import { Typography } from '@byte-creators/ui-kit'

type Dino = {
  height: number
  img: HTMLImageElement | null
  width: number
  x: number
  y: number
}

type Cactus = {
  height: number
  img: HTMLImageElement | null
  width: number
  x: number
  y: number
}

export const PlatformerGame = () => {
  const boardRef = useRef<HTMLCanvasElement | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [score, setScore] = useState(0)

  const boardWidth = 750
  const boardHeight = 250
  const dinoWidth = 88
  const dinoHeight = 94
  const dinoX = 50
  const dinoY = boardHeight - dinoHeight

  const dinoRef = useRef<Dino>({
    height: dinoHeight,
    img: null,
    width: dinoWidth,
    x: dinoX,
    y: dinoY,
  })

  const cactusArrayRef = useRef<Cactus[]>([])
  const velocityX = -8
  const gravity = 0.4
  const velocityYRef = useRef(0)

  const resetGame = () => {
    setGameOver(false)
    setScore(0)
    dinoRef.current = {
      height: dinoHeight,
      img: dinoRef.current.img,
      width: dinoWidth,
      x: dinoX,
      y: dinoY,
    }
    cactusArrayRef.current = []
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

    const dinoImg = new Image()

    dinoImg.src = '/images/platformer/dragon-red.png'

    const cactus1Img = new Image()

    cactus1Img.src = '/images/platformer/cactus1.png'

    const cactus2Img = new Image()

    cactus2Img.src = '/images/platformer/cactus2.png'

    const cactus3Img = new Image()

    cactus3Img.src = '/images/platformer/cactus3.png'

    dinoRef.current.img = dinoImg

    let animationFrameId: number

    const update = () => {
      if (isPaused || gameOver) {
        return
      }

      context.clearRect(0, 0, board.width, board.height)

      velocityYRef.current += gravity
      dinoRef.current.y = Math.min(dinoRef.current.y + velocityYRef.current, dinoY)

      if (dinoRef.current.img) {
        context.drawImage(
          dinoRef.current.img,
          dinoRef.current.x,
          dinoRef.current.y,
          dinoRef.current.width,
          dinoRef.current.height
        )
      }

      cactusArrayRef.current.forEach((cactus, index) => {
        cactus.x += velocityX
        if (cactus.img) {
          context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height)
        }

        if (detectCollision(dinoRef.current, cactus)) {
          setGameOver(true)
          setIsPaused(true)
        }

        if (cactus.x + cactus.width < 0) {
          cactusArrayRef.current.splice(index, 1)
        }
      })

      setScore(prevScore => prevScore + 1)

      animationFrameId = requestAnimationFrame(update)
    }

    const placeCactus = () => {
      if (isPaused || gameOver) {
        return
      }

      const cactus: Cactus = {
        height: 70,
        img: null,
        width: 34,
        x: boardWidth,
        y: boardHeight - 70,
      }

      const placeCactusChance = Math.random()

      if (placeCactusChance > 0.9) {
        cactus.img = cactus3Img
        cactus.width = 102
      } else if (placeCactusChance > 0.7) {
        cactus.img = cactus2Img
        cactus.width = 69
      } else if (placeCactusChance > 0.5) {
        cactus.img = cactus1Img
        cactus.width = 34
      }

      if (cactus.img) {
        cactusArrayRef.current.push(cactus)
      }
    }

    const gameInterval = setInterval(placeCactus, 1000)

    animationFrameId = requestAnimationFrame(update)

    return () => {
      clearInterval(gameInterval)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isPaused, gameOver])

  const moveDino = (e: KeyboardEvent) => {
    if (isPaused || gameOver) {
      return
    }

    if ((e.code === 'Space' || e.code === 'ArrowUp') && dinoRef.current.y === dinoY) {
      velocityYRef.current = -10 // Прыжок
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      if (isPaused || gameOver) {
        startGame()
      }
    } else {
      moveDino(e)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPaused, gameOver])

  const detectCollision = (a: Dino, b: Cactus): boolean => {
    return (
      a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
    )
  }

  return (
    <div className={'w-[800px] bg-light-300'}>
      <canvas height={boardHeight} id={'board'} ref={boardRef} width={boardWidth} />
      <div className={'p-3 text-light-100 bg-dark-700'}>
        <Typography className={'pb-1'} variant={'small-text'}>
          Score: {score}
        </Typography>
        <Typography
          className={isPaused ? 'text-light-100' : 'text-transparent'}
          variant={'regular-text'}
        >
          {gameOver ? 'Game Over! Press Enter to restart.' : 'Press Enter to start the game.'}
        </Typography>
      </div>
    </div>
  )
}
