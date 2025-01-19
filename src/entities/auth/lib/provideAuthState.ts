import { AppDispatch } from '@/application/store'

import { authSlice } from '../model/auth.slice'
import { decodeAccessToken } from './decodeAccessToken'

export const provideAuthState = ({
  accessToken,
  dispatch,
}: {
  accessToken?: string
  dispatch: AppDispatch
}) => {
  if (accessToken) {
    const { userId } = decodeAccessToken(accessToken)

    if (!userId) {
      dispatch(authSlice.actions.logout())
      console.log('Invalid token')
    } else {
      dispatch(
        authSlice.actions.setCredentials({
          accessToken,
          userId,
        })
      )
    }
  } else {
    dispatch(authSlice.actions.logout())
  }
}
