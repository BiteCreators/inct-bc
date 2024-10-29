import localFont from 'next/font/local'
export const inter = localFont({
  src: [
    {
      path: '../../public/fonts/Inter-Regular.woff2',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../../public/fonts/Inter-Medium.woff2',
      style: 'normal',
      weight: '500',
    },
    {
      path: '../../public/fonts/Inter-SemiBold.woff2',
      style: 'normal',
      weight: '600',
    },
    {
      path: '../../public/fonts/Inter-Bold.woff2',
      style: 'normal',
      weight: '700',
    },
  ],
  variable: '--font-inter',
})
