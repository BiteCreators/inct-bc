import React from 'react'

import styles from './loader.module.css'

type Props = {
  fullScreen?: boolean
}
export const Loader = ({ fullScreen }: Props) => {
  return (
    <div className={fullScreen ? styles.wrapper : ''}>
      <span className={styles.loader}></span>
    </div>
  )
}
