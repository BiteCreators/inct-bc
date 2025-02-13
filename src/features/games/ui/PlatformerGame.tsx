import { useEffect, useRef, useState } from 'react'

type Props = {}
export const PlatformerGame = ({}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [jumping, setJumping] = useState(false)
  const [jumpHeight, setJumpHeight] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d') //контекст рисования,
    // содержит методы и свойства, которые дают возможность
    // рисовать, например, прямоугольники. 2d контекст для методов для
    // рисования двухмерных объектов

    if (!canvas || !ctx) {
      return
    }

    // Устанавливаем размеры канваса
    canvas.width = 800
    canvas.height = 400

    const dinoWidth = 50
    const dinoHeight = 50
    const dinoX = 50 //начальная позиция динозаврика,
    // начинать с 50 пикселей по горизонтали (от левого края),
    // а по вертикали — на дне канваса, т.е. на высоте
    // canvas.height - dinoHeight (то есть, если высота канваса 400,
    // то динозаврик начнёт с 350)
    const dinoY = canvas.height - dinoHeight
    const gravity = 2

    const jumpMaxHeight = 100
    const jumpSpeed = 10

    // Рисуем динозаврика
    const drawDino = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height) // Очистка канваса
      ctx.fillStyle = 'green'
      ctx.fillRect(dinoX, dinoY, dinoWidth, dinoHeight) // Рисуем динозаврика
    }

    // Обработка прыжка
    const jump = () => {
      if (jumping) {
        //Пока динозаврик прыгает, его высота
        // увеличивается на jumpSpeed (пока не достигнет jumpMaxHeight).
        setJumpHeight(prev => prev + jumpSpeed)
        if (jumpHeight >= jumpMaxHeight) {
          setJumping(false)
        }
      } else {
        //Если динозаврик не прыгает, то при достижении максимальной
        // высоты, он начинает падать, то есть его высота уменьшается
        // на величину gravity, пока он не вернется на землю
        // (позиция y достигает основания канваса).
        if (dinoY < canvas.height - dinoHeight) {
          setJumpHeight(prev => prev - gravity) // Опускаем динозаврика при падении
        } else {
          //Если динозаврик на земле, его высота сбрасывается в 0
          setJumpHeight(0)
        }
      }
    }

    const gameLoop = () => {
      jump() // Вызываем прыжок (или падение)
      drawDino() // Перерисовываем динозаврика
      requestAnimationFrame(gameLoop) // автоматически вызывает переданную
      // функцию (gameLoop), и это происходит снова и снова, в цикле,
      // каждый раз, когда браузер готов обновить экран. Это позволяет
      // не делать ручное управление таймерами и синхронизировать анимацию
      // с частотой обновления экрана.
    }

    gameLoop() // Запускаем игровой цикл

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) {
        return
      }

      if (e.key === ' ' && !jumping) {
        // Если нажат пробел, и мы не в процессе прыжка
        setJumping(true) // Начинаем прыгать
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [jumpHeight, jumping])

  return (
    <div className={'p-5'}>
      <canvas className={'w-full h-80 bg-dark-100'} />
    </div>
  )
}
