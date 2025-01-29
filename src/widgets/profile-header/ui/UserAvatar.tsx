import exampleImage from '../../../../public/examples/exampleAvatar.png'

export const UserAvatar = ({ src }: { src: string }) => {
  return (
    <div className={'self-start'}>
      <div className={'w-20 sm:w-36 lg:!w-52'}>
        <img
          alt={'Avatar'}
          className={'rounded-full object-cover w-full h-full'}
          src={src || exampleImage.src}
        />
      </div>
    </div>
  )
}
