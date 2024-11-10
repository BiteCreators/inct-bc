import { inctagramApi } from '@/common/api/inct.api'
import { Avatar, WithSearchPaginationParams } from '@/common/types/api.types'

import { PostLikesResponse, Reaction } from '../types/likes.types'
import {
  CreatePostRequest,
  Post,
  PublicPostsRequest,
  PublicPostsResponse,
} from '../types/posts.types'

type CreatePostImageResponse = { uploadId: string } & Avatar

export const postsApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<Post, CreatePostRequest>({
      invalidatesTags: ['Post'],
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/posts',
      }),
    }),
    createPostImage: builder.mutation<{ images: CreatePostImageResponse[] }, { file: File }>({
      invalidatesTags: ['Post'],
      query: ({ file }) => {
        const formData = new FormData()

        formData.append('file', file)

        return {
          body: formData,
          method: 'POST',
          url: 'v1/posts/image',
        }
      },
    }),
    deletePost: builder.mutation<void, { postId: number }>({
      invalidatesTags: ['Post'],
      query: ({ postId }) => ({
        method: 'DELETE',
        url: `v1/posts/${postId}`,
      }),
    }),
    deletePostImage: builder.mutation<void, { uploadId: string }>({
      invalidatesTags: ['Post'],
      query: ({ uploadId }) => ({
        method: 'DELETE',
        url: `v1/posts/image/${uploadId}`,
      }),
    }),
    getPostLikes: builder.query<PostLikesResponse, { postId: number } & WithSearchPaginationParams>(
      {
        query: data => {
          const { postId, ...params } = data

          return {
            params,
            url: `v1/posts/${postId}/likes`,
          }
        },
      }
    ),
    // getPosts: builder.query<Posts, { userName: string } & Params>({      //не приходит массив с загруженными картинками
    //   providesTags: ['Post'],
    //   query: data => {
    //     const { userName, ...params } = data

    //     return {
    //       params,
    //       url: `v1/posts/${userName}`,
    //     }
    //   },
    // }),
    getPublicPostsByUserId: builder.query<PublicPostsResponse, PublicPostsRequest>({
      providesTags: ['Post'],
      query: data => {
        const { userId, ...params } = data

        return {
          params,
          url: `v1/public-posts/user/${userId}`,
        }
      },
    }),
    updateLikeStatusPost: builder.mutation<void, { likeStatus: Reaction; postId: number }>({
      query: ({ likeStatus, postId }) => ({
        body: { likeStatus },
        method: 'PUT',
        url: `v1/posts/${postId}/like-status`,
      }),
    }),
    updatePost: builder.mutation<void, { description: string; postId: number }>({
      invalidatesTags: ['Post'],
      query: ({ description, postId }) => ({
        body: { description },
        method: 'PUT',
        url: `v1/posts/${postId}`,
      }),
    }),
  }),
})
