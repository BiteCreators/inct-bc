import { useEffect, useRef, useState } from 'react'

export const usePlatformer = (fieldWidth: number, fieldHeight: number) => {
  const [dinoPosition, setDinoPosition] = useState({ x: 50, y: fieldHeight - 50 })
  const [jumping, setJumping] = useState(false)
  const [jumpHeight, setJumpHeight] = useState(0)
  const [gravity, setGravity] = useState(2)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  const [obstacles, setObstacles] = useState([
    { height: 30, width: 30, x: 500, y: fieldHeight - 50 },
  ])

  const jumpMaxHeight = 100
  const jumpSpeed = 10

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctx = canvasRef.current?.getContext('2d')

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
    }, 20)

    return () => clearInterval(interval)
  }, [dinoPosition, jumping, jumpHeight])

  return {
    canvasRef,
    ctx,
    dinoPosition,
    fieldHeight,
    fieldWidth,
    gravity,
    jumpHeight,
    jumping,
    obstacles,
    setDinoPosition,
    setGravity,
    setJumpHeight,
    setJumping,
    setObstacles,
  }
}
