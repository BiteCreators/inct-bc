import { useEffect, useRef, useState } from 'react'

type Dino = {
  height: number
  imgSrc: string
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
  const [score, setScore] = useState(0)

  const boardWidth = 750
  const boardHeight = 250
  const dinoWidth = 88
  const dinoHeight = 94
  const dinoX = 50
  const dinoY = boardHeight - dinoHeight

  const [dino, setDino] = useState<Dino>({
    height: dinoHeight,
    imgSrc: '/images/dino/dino.png',
    width: dinoWidth,
    x: dinoX,
    y: dinoY,
  })

  const cactusArray: Cactus[] = []

  const cactusHeight = 70
  const cactusX = 700
  const cactusY = boardHeight - cactusHeight

  const [velocityX, setVelocityX] = useState(-8)
  const [velocityY, setVelocityY] = useState(0)
  const gravity = 0.4

  let cactus1Img: HTMLImageElement
  let cactus2Img: HTMLImageElement
  let cactus3Img: HTMLImageElement

  let gameInterval: NodeJS.Timeout

  const [dinoImg, setDinoImg] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    const img = new Image()

    img.src = dino.imgSrc
    img.onload = () => setDinoImg(img)
  }, [dino.imgSrc])

  useEffect(() => {
    if (!boardRef.current || !dinoImg) {
      return
    }

    const board = boardRef.current
    const context = board.getContext('2d')

    if (!context) {
      return
    }

    cactus1Img = new Image()
    cactus1Img.src = '/images/dino/cactus1.png'
    cactus2Img = new Image()
    cactus2Img.src = '/images/dino/cactus2.png'
    cactus3Img = new Image()
    cactus3Img.src = '/images/dino/cactus3.png'

    const update = () => {
      if (gameOver) {
        return
      }

      context.clearRect(0, 0, board.width, board.height)
      setVelocityY(prevVelocityY => prevVelocityY + gravity)

      // Обновляем положение динозавра
      setVelocityY(prevVelocityY => {
        const newVelocityY = prevVelocityY + gravity

        setDino(prevDino => ({
          ...prevDino,
          y: Math.min(prevDino.y + newVelocityY, dinoY),
        }))

        return newVelocityY
      })

      context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height)

      // Обновляем положение кактусов
      cactusArray.forEach((cactus, index) => {
        cactus.x += velocityX
        if (cactus.img) {
          context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height)
        }

        // Проверяем столкновения
        if (detectCollision(dino, cactus)) {
          setGameOver(true)
          setDino(prevDino => ({
            ...prevDino,
            imgSrc: '/images/dino/dino-dead.png', // Изображение динозавра после смерти
          }))
        }

        // Удаляем кактусы, которые вышли за пределы экрана
        if (cactus.x + cactus.width < 0) {
          cactusArray.splice(index, 1)
        }
      })

      setScore(prevScore => prevScore + 1)

      if (!gameOver) {
        requestAnimationFrame(update)
      }
    }

    gameInterval = setInterval(placeCactus, 1000)
    requestAnimationFrame(update)

    return () => {
      clearInterval(gameInterval)
    }
  }, [gameOver, velocityY, velocityX, dinoImg])

  const moveDino = (e: KeyboardEvent) => {
    if (gameOver) {
      return
    }

    // Прыжок
    if ((e.code === 'Space' || e.code === 'ArrowUp') && dino.y === dinoY) {
      setVelocityY(-10) // Прыжок вверх
    }
  }

  const placeCactus = () => {
    if (gameOver) {
      return
    }

    const cactus: Cactus = {
      height: cactusHeight,
      img: null,
      width: 34,
      x: cactusX,
      y: cactusY,
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
      cactusArray.push(cactus)
    }
  }

  const detectCollision = (a: Dino, b: Cactus): boolean => {
    return (
      a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
    )
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => moveDino(e)

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [gameOver])

  return (
    <div className={'p-5'}>
      <canvas height={boardHeight} id={'board'} ref={boardRef} width={boardWidth} />
      <div>
        <p>Score: {score}</p>
        {gameOver && <p>Game Over!</p>}
      </div>
    </div>
  )
}
