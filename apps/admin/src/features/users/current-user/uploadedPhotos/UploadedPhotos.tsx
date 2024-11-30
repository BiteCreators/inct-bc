import { useQuery } from '@apollo/client'
import { Alert, Loader, Typography } from '@packages/shared/ui'

import style from './uploadedPhotos.module.scss'

import { GET_POSTS_BY_USER } from './postsQuery'

export const UploadedPhotos = () => {
  // const router = useRouter()
  // const { id } = router.query
  const userId = 1565
  const { data, error, loading } = useQuery(GET_POSTS_BY_USER, {
    variables: { userId },
  })

  return (
    <div>
      {loading && <Loader />}
      {!loading && !data?.getPostsByUser.items ? (
        <Typography> User has no publications yet </Typography>
      ) : (
        <ul className={style.uploadedPhotosList}>
          {data?.getPostsByUser.items?.map((post, ind) => {
            return (
              <li key={ind}>
                <img height={260} src={post.url ?? undefined} width={260} />
              </li>
            )
          })}
        </ul>
      )}
      {error && <Alert message={error.message} type={'error'} />}
    </div>
  )
}
