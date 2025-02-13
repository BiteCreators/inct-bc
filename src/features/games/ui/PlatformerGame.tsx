import { usePlatformer } from '@/features/games/model/usePlatformer'

type Props = {}
export const PlatformerGame = ({}: Props) => {
  const fieldWidth = 800
  const fieldHeight = 400

  const {
    canvasRef,
    ctx,
    dinoPosition,
    gravity,
    jumpHeight,
    jumping,
    obstacles,
    setDinoPosition,
    setGravity,
    setJumpHeight,
    setJumping,
    setObstacles,
  } = usePlatformer(fieldWidth, fieldHeight)

  return (
    <div className={'p-5'}>
      <canvas className={'w-full h-80 bg-dark-100'} ref={canvasRef} />
    </div>
  )
}
