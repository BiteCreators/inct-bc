import { useEffect } from 'react'

import { Close } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import { Typography } from '@/common/ui'
import { motion } from 'framer-motion'

type Props = {
  className?: string
  duration?: number
  message?: string
  onClose?: () => void
  purpose?: 'alert' | 'toast'
  type: 'error' | 'info' | 'success'
}

export const Alert = ({
  className,
  duration = 5000,
  message,
  onClose,
  purpose = 'toast',
  type = 'error',
}: Props) => {
  const alertStyles = {
    error: 'bg-danger-900 border-danger-500',
    info: 'bg-primary-900 border-primary-500',
    success: 'bg-success-900 border-success-500',
  }

  const variants = {
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
      y: 50,
    },
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
      y: 0,
    },
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <motion.div
      animate={'visible'}
      className={cn(
        'transform -translate-x-1/2 px-4 py-2 border rounded-sm text-white z-250',
        className,
        purpose === 'toast' && className && 'fixed bottom-4 left-1/4',
        alertStyles[type]
      )}
      exit={'exit'}
      initial={'hidden'}
      variants={variants}
    >
      <div className={'flex justify-between items-center'}>
        <Typography className={'min-w-64'} variant={'medium-text'}>
          {message}
        </Typography>
        {purpose === 'toast' && (
          <button className={'text-xl focus:outline-none ml-2'} onClick={onClose}>
            <Close viewBox={'0 -1 24 24'} />
          </button>
        )}
      </div>
    </motion.div>
  )
}
