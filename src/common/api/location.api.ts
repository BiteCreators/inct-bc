import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type CountryResponse = {
  continentCode: string
  countryCode: string
  division1Code: string
  division2Code: null
  division3Code: null
  division4Code: null
  id: string
  latitude: number
  longitude: number
  name: string
  parentRegions: ParentRegions[]
  population: string
  timezone: string
  type: string
}

type ParentRegions = {
  id: string
  name: string
}

type ChildRegionsResponse = {
  edges: {
    cursor: string
    node: CountryResponse
  }[]
}

export const locationApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://data-api.oxilor.com/rest',
    prepareHeaders: headers => {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY

      headers.set('Authorization', `Bearer ${apiKey}`)

      return headers
    },
  }),
  endpoints: builder => ({
    getChildRegion: builder.query<ChildRegionsResponse, { id: string; lng: string }>({
      query: ({ id, lng }) => ({
        method: 'GET',
        url: `/child-regions?parentId=${id}&lng=${lng}`,
      }),
    }),
    getCountry: builder.query<CountryResponse[], { lng: string }>({
      query: ({ lng }) => ({
        method: 'GET',
        url: `/countries?lng=${lng}`,
      }),
    }),
    getStatus: builder.query<{ ok: boolean }, void>({
      query: body => ({
        body,
        method: 'GET',
        url: '/status',
      }),
    }),
  }),
  reducerPath: 'locationApi',
})
