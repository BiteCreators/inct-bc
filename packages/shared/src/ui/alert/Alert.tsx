import React, { ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { motion } from 'framer-motion'

import { Close } from '../../assets/icons/components'
import { cn } from '../../utils'
import { Typography } from '../typography/Typography'

type Props = {
  alertContent?: ReactNode
  canClose?: boolean
  className?: string
  duration?: number
  message?: string
  onClose?: () => void
  open?: boolean
  portal?: boolean
  purpose?: 'alert' | 'toast'
  type: 'error' | 'info' | 'modal' | 'success'
}

export const Alert = ({
  alertContent,
  canClose = true,
  className,
  duration = 5000,
  message,
  onClose,
  open = true,
  portal = false,
  purpose = 'alert',
  type = 'error',
}: Props) => {
  const [isVisible, setIsVisible] = useState(open)

  useEffect(() => {
    setIsVisible(open)
  }, [open])

  const alertStyles = {
    error: 'bg-danger-900 border-danger-500',
    info: 'bg-primary-900 border-primary-500',
    modal: 'bg-dark-300 border-dark-100',
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
    if (!canClose || !open) {
      return
    }
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, canClose, onClose, open])

  const onCloseHandler = () => {
    setIsVisible(false)
    if (onClose) {
      onClose()
    }
  }

  if (!isVisible) {
    return null
  }
  const content = (
    <motion.div
      animate={'visible'}
      className={cn(
        'transform -translate-x-1/2 px-4 py-2 border rounded-sm text-white',
        purpose === 'alert' && 'mb-3',
        purpose === 'toast' &&
          `fixed md:bottom-4 bottom-[61px] md:left-[173px] left-5 right-5 min-w-72 md:max-w-[420px] max-w-[350px] ${className}`,
        className,
        alertStyles[type]
      )}
      exit={'exit'}
      initial={'hidden'}
      variants={variants}
    >
      <div className={cn(['flex justify-between items-center z-250'])}>
        {alertContent}
        <Typography className={'whitespace-normal'} variant={'medium-text'}>
          {message}
        </Typography>

        {!canClose && (
          <button className={'text-xl focus:outline-none ml-2'} onClick={onCloseHandler}>
            <Close viewBox={'0 -1 24 24'} />
          </button>
        )}
      </div>
    </motion.div>
  )

  return portal ? ReactDOM.createPortal(content, document.body) : content
}
