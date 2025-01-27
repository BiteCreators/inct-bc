import Skeleton from 'react-loading-skeleton'

export const EditProfileFormSkeletons = () => {
  return (
    <div className={'flex flex-col gap-10 text-sm relative lg:flex-row'}>
      <div className={'flex flex-col gap-6 min-w-[275px]'}>
        <Skeleton className={'aspect-square !rounded-full'} />
      </div>
      <form className={'flex flex-col grow gap-6'}>
        <Skeleton className={'h-[40px] w-full'} />
        <Skeleton className={'h-[40px] w-full'} />
        <Skeleton className={'h-[40px] w-full'} />
        <Skeleton className={'h-[40px] w-full'} />
        <div className={'flex gap-6'}>
          <Skeleton className={'h-[40px] w-full'} />
          <Skeleton className={'h-[40px] w-full'} />
        </div>
        <Skeleton className={'h-[100px] w-full'} />
        <Skeleton className={'h-[40px] w-[150px] self-end'} />
      </form>
    </div>
  )
}
