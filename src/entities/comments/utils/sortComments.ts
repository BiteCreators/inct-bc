export const sortCommentsByUser = (comments: any[], currentUserId: null | string) => {
  if (!currentUserId) {
    return comments
  }

  const currentUserComments = comments.filter(comment => comment.from.id === currentUserId)
  const commentsWithoutCurrentUser = comments.filter(comment => comment.from.id !== currentUserId)

  return [...currentUserComments, ...commentsWithoutCurrentUser]
}
