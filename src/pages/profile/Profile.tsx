import React from 'react'

export const getStaticProps = async () => {
  console.log('qqqqq')
  const userId = 12

  return {
    props: {
      userId,
    },
  }
}

type Props = {
  userId: number | string
}
export default function Profile(props: Props) {
  return <>Profile{props.userId}</>
}
