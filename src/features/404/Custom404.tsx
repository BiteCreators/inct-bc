import { PlatformerGame } from '@/features/games/ui/PlatformerGame'
import { Typography } from '@byte-creators/ui-kit'

import s from './styles.module.css'

type Props = {}
export const Custom404 = ({}: Props) => {
  return (
    <div className={'m-0 p-[35px] flex flex-col justify-center items-center'}>
      <Typography className={'text-[92px]'} variant={'h1'}>
        404 NOT FOUND
      </Typography>
      <div className={s.box}>
        <div className={'relative z-[3] box-border p-5 text-black bg-transparent'}>
          <PlatformerGame />
        </div>
      </div>
      <Typography className={'italic pt-1'} variant={'large'}>
        Here be dragons
      </Typography>
    </div>
  )
}
