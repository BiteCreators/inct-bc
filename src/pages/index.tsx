import { Header } from '@/widgets/header'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={'flex gap-4 flex-col'}>
      {/* TODO: make a page layout */}
      <Header />
      <h1>StartPage</h1>
      <Link className={'text-red-600 text-4xl'} href={'/auth'}>
        Auth
      </Link>
      <Link href={'/profile'}>Profile</Link>
    </div>
  )
}
