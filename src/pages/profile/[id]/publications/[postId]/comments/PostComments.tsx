// import React from 'react'
//
// import { ArrowBackOutline } from '@/common/assets/icons/components'
// import { Typography } from '@/common/ui'
// import Link from 'next/link'
// import { useParams } from 'next/navigation'
//
// import exampleAvatar from '../../../../../../../public/examples/0a9f264bc73447e3ce0157c47fae210a (1).jpg'
//
// export const PostComments = () => {
//   // MOCK (remove later)------------//
//   const slides = [
//     {
//       createdAt: '',
//       fileSize: 1,
//       height: 1,
//       uploadId: '1',
//       url: 'https://i1.sndcdn.com/artworks-nO3R0izz9UnXtHhQ-z1R29Q-t500x500.jpg',
//       width: 1,
//     },
//     {
//       createdAt: '',
//       fileSize: 1,
//       height: 1,
//       uploadId: '2',
//       url: 'https://i1.sndcdn.com/artworks-000066235753-ysrir2-t500x500.jpg',
//       width: 1,
//     },
//     {
//       createdAt: '',
//       fileSize: 1,
//       height: 1,
//       uploadId: '3',
//       url: 'https://i1.sndcdn.com/artworks-000022548343-t02iuc-t500x500.jpg',
//       width: 1,
//     },
//   ] as Image[]
//
//   const postForModal = {
//     avatarOwner: exampleAvatar.src,
//     createdAt: 'July 3, 2021',
//     description: 'This is post descriptionThis is post descriptionThis is post description',
//     id: 1,
//     images: slides,
//     isLiked: false,
//     likesCount: 0,
//     location: '',
//     owner: { firstName: '', lastName: '' } as Owner,
//     ownerId: 1,
//     updatedAt: '',
//     userName: 'UserName',
//   } as Post
//   const comments = [
//     {
//       id: '1',
//       text: 'eiusmodcididunt ut laboreagna aliquaeiusmod tempor incididunt ut labore et dolore magna aliquaeiusmod tempor incididunt ut labore et dolore magna aliquaeiusmod tempor incididunt ut labore et dolore magna aliqua',
//     },
//     { id: '2', text: 'eiusmod' },
//     { id: '3', text: 'eiusmod tempor labore et dolore magna aliqua' },
//     {
//       id: '4',
//       text: 'eiusmod tempor incididunt ut labore et dolore magna aliquadolore magna aliqua',
//     },
//   ]
//   //-------------------------------------------------------
//
//   const params = useParams<{ id: string; postId: string }>()
//   const id = params?.id
//   const postId = params?.postId
//
//   return (
//     <div className={'-my-6 md:hidden'}>
//       {/*Header*/}
//       <div className={'flex items-center justify-center'}>
//         <button className={'absolute left-4'}>
//           <Link href={`/profile/${id}/publications/${postId}/`}>
//             <ArrowBackOutline viewBox={'0 -2 24 24'} />
//           </Link>
//         </button>
//         <Typography className={'font-weight700'} variant={'h2'}>
//           Comments
//         </Typography>
//       </div>
//       {/*Comments*/}
//     </div>
//   )
// }
