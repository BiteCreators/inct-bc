import dynamic from 'next/dynamic'

// eslint-disable-next-line import/no-unresolved
export const RemoteMessenger = dynamic(() => import('messenger/Messenger'), {
  ssr: false,
})

const Index = () => {
  return <RemoteMessenger />
}

export default Index
