import dynamic from 'next/dynamic'

const SignIn = dynamic(() => import('admin/sign-in-page').then(mod => mod.SignIn))

export default function Page() {
  return <SignIn />
}
