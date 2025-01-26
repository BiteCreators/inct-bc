import { ImageWithSkeleton } from '@/features/posts/ui/ImageWithSkeleton'
import { Button } from '@byte-creators/ui-kit'
import { EyeOutline } from '@byte-creators/ui-kit/icons'
import { cn } from '@byte-creators/utils'

type Props = {
  handleNavigateToImage: (imageUrl: string) => void
  image: any
}
export const PostDetailsSlide = ({ handleNavigateToImage, image }: Props) => {
  return (
    <div className={'w-full h-full relative'}>
      <ImageWithSkeleton
        alt={'postImg'}
        className={'h-full object-cover object-center'}
        src={image.url}
      />
      <Button
        className={cn(
          'text-2xl absolute inset-0 m-auto opacity-0',
          'transition-opacity duration-300 hover:opacity-100',
          'px-36 focus:outline-none active:outline-none !outline-none'
        )}
        onClick={() => handleNavigateToImage(image.url)}
        variant={'text'}
      >
        <div className={'bg-dark-100 rounded-full inline-block p-2'}>
          <EyeOutline className={'text-light-100 transform scale-150'} />
        </div>
      </Button>
    </div>
  )
}
