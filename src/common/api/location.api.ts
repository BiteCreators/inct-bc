import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type CountryResponse = {
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

type RegionsResponse = {
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
    getCity: builder.query<RegionsResponse, { countryCode: string; lng: string }>({
      query: ({ countryCode, lng }) => ({
        method: 'GET',
        url: `/regions?countryCode=${countryCode}&type=city&lng=${lng}`,
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
