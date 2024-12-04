import dynamic from 'next/dynamic'

const UsersPage = dynamic(() => import('admin/users-page').then(mod => mod.UsersPage))

export default function Page() {
  return <UsersPage />
}
