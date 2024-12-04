import dynamic from 'next/dynamic'

const SingleUserPage = dynamic(() =>
  import('admin/single-user-page').then(mod => mod.SingleUserPage)
)

export default function Page() {
  return <SingleUserPage />
}
