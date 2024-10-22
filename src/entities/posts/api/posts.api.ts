import { inctagramApi } from '@/common/api/inct.api'

import {
  CreatePostBody,
  Image,
  Params,
  Post,
  PostLikes,
  Posts,
  Reaction,
  SearchParams,
} from '../types/posts.type'

export const postsApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<Post, CreatePostBody>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/posts',
      }),
    }),
    createPostImage: builder.mutation<{ images: Image[] }, { file: File }>({
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
      query: ({ postId }) => ({
        method: 'DELETE',
        url: `v1/posts/${postId}`,
      }),
    }),
    deletePostImage: builder.mutation<void, { uploadId: string }>({
      query: ({ uploadId }) => ({
        method: 'DELETE',
        url: `v1/posts/image/${uploadId}`,
      }),
    }),
    getPostLikes: builder.query<PostLikes, { postId: number } & SearchParams>({
      query: data => {
        const { postId, ...params } = data

        return {
          params,
          url: `v1/posts/${postId}/likes`,
        }
      },
    }),
    getPosts: builder.query<Posts, { userName: string } & Params>({
      query: data => {
        const { userName, ...params } = data

        return {
          params,
          url: `v1/posts/${userName}`,
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
      query: ({ description, postId }) => ({
        body: { description },
        method: 'PUT',
        url: `v1/posts/${postId}`,
      }),
    }),
  }),
})
