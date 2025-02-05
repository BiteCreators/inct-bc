import React from 'react'

import Link from 'next/link'

export default function Games() {
  return (
    <div className={'flex gap-4 flex-col'}>
      <h1>Games</h1>
      <Link href={'/games/snake'}>Snake (Zmeika)</Link>
    </div>
  )
}
