import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={'flex gap-4 flex-col'}>
      <h1>StartPage</h1>
      <Link href={'/auth'}>Auth</Link>
      <Link href={'/profile'}>Profile</Link>
    </div>
  )
}
