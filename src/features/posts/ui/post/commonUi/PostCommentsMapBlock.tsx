import { ScrollArea } from '@/common/ui'
import { PostComment } from '@/features/posts/ui/post/commonUi/PostComment'

type Props = {
  comments: { id: string; text: string }[]
}

export const PostCommentsMapBlock = ({ comments }: Props) => {
  return (
    <ScrollArea className={'flex-1 px-6 pt-5 pb-2 w-full'}>
      <div className={'flex flex-col gap-4 h-[336px]'}>
        {comments.map(el => (
          <PostComment key={el.id} text={el.text} />
        ))}
      </div>
    </ScrollArea>
  )
}
