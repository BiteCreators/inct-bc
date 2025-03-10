import React from 'react'

import Link from 'next/link'

export default function Games() {
  return (
    <div className={'flex gap-4 flex-col m-6'}>
      <h1>Dragon Games</h1>
      <Link href={'/games/snake'}>Catch the egg</Link>
      <Link href={'/games/platformer'}>Platformer</Link>
    </div>
  )
}
