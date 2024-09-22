// Need to use the React-specific entry point to import createApi

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const inctagramApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://inctagram.work/api/v1' }),
  endpoints: () => ({}),
  reducerPath: 'inctagramApi',
})
