import { Mode } from '@/features/games/model/usePlatformer'
import { PlatformerGame } from '@/features/games/ui/PlatformerGame'
import { Typography } from '@byte-creators/ui-kit'
import { cn, useMediaQuery } from '@byte-creators/utils'

import s from '../styles.module.css'

type Props = {}
export const Custom404 = ({}: Props) => {
  const isDesktopScreen = useMediaQuery('(min-width: 1035px)')
  const isMobileScreen = useMediaQuery('(max-width: 450px)')
  let mode: Mode

  if (isDesktopScreen) {
    mode = 'desktop'
  } else if (isMobileScreen) {
    mode = 'mobile'
  } else {
    mode = 'tablet'
  }

  return (
    <div
      className={cn([
        'm-0 flex flex-col justify-center items-center',
        isDesktopScreen ? 'p-[35px]' : 'p-0',
      ])}
    >
      <Typography
        className={isDesktopScreen ? 'text-[92px]' : 'py-3 text-5xl text-center'}
        variant={'h1'}
      >
        404 NOT FOUND
      </Typography>
      <div className={s.box}>
        <div className={'relative z-[3] box-border p-5 text-black bg-transparent'}>
          <PlatformerGame mode={mode} />
        </div>
      </div>
      <Typography className={'italic pt-1'} variant={'large'}>
        Here be dragons
      </Typography>
    </div>
  )
}
