import { inctagramApi } from '@/common/api/inct.api'
import { Avatar, WithSearchPaginationParams } from '@/common/types/api.types'

import { PostLikesResponse, Reaction } from '../types/likes.types'
import {
  AllPublicPostsRequest,
  CreatePostRequest,
  FollowerPublicationsRequest,
  FollowerPublicationsResponse,
  Post,
  PublicPostsResponse,
  UserPublicPostsRequest,
} from '../types/posts.types'

type CreatePostImageResponse = { uploadId: string } & Avatar

export const postsApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<Post, CreatePostRequest>({
      invalidatesTags: [{ id: 'LIST', type: 'Posts' }],
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/posts',
      }),
    }),
    createPostImage: builder.mutation<{ images: CreatePostImageResponse[] }, { file: File[] }>({
      query: ({ file }) => {
        const formData = new FormData()

        file.forEach(el => formData.append('file', el))

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
      query: ({ uploadId }) => ({
        method: 'DELETE',
        url: `v1/posts/image/${uploadId}`,
      }),
    }),
    getAllPublicPosts: builder.query<PublicPostsResponse, AllPublicPostsRequest>({
      providesTags: res =>
        res
          ? [
              ...res.items.map(post => ({ id: post.id, type: 'Posts' as const })),
              { id: 'LIST', type: 'Posts' },
            ]
          : [{ id: 'LIST', type: 'Posts' }],
      query: data => {
        const { endCursorPostId, ...params } = data

        return {
          params,
          url: endCursorPostId ? `v1/public-posts/all/${endCursorPostId}` : `v1/public-posts/all`,
        }
      },
    }),
    getFollowerPublications: builder.query<
      FollowerPublicationsResponse,
      FollowerPublicationsRequest
    >({
      providesTags: ['Posts'],
      query: data => {
        const { endCursorPostId, pageNumber, pageSize } = data

        return {
          params: {
            endCursorPostId,
            pageNumber,
            pageSize,
          },
          url: `v1/home/publications-followers`,
        }
      },
    }),
    getPostById: builder.query<Post, { postId: number }>({
      providesTags: ['Post'],
      query: ({ postId }) => ({
        url: `v1/posts/id/${postId}`,
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
    getPublicPostById: builder.query<Post, { postId: number }>({
      providesTags: ['Post'],
      query: ({ postId }) => ({
        url: `v1/public-posts/${postId}`,
      }),
    }),
    getPublicPostsByUserId: builder.query<PublicPostsResponse, UserPublicPostsRequest>({
      providesTags: res =>
        res
          ? [
              ...res.items.map(post => ({ id: post.id, type: 'Posts' as const })),
              { id: 'LIST', type: 'Posts' },
            ]
          : [{ id: 'LIST', type: 'Posts' }],
      query: data => {
        const { userId, ...params } = data

        return {
          params,
          url: `v1/public-posts/user/${userId}`,
        }
      },
    }),
    updateLikeStatusPost: builder.mutation<void, { likeStatus: Reaction; postId: number }>({
      invalidatesTags: ['Post'],
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
