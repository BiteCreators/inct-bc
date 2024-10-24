import { useState } from 'react'

import { CountryResponse, locationApi } from '@/common/api/location.api'
import { useRouter } from 'next/router'

export const useCountryCity = () => {
  const { locale } = useRouter()
  const [cityOptions, setCityOptions] = useState<string[]>([])

  const { data: countryData } = locationApi.useGetCountryQuery({
    lng: locale ?? 'ru',
  })

  const checkCountryData = (countryData: CountryResponse[] | undefined) => {
    if (countryData) {
      return countryData.map(item => item.name)
    } else {
      return []
    }
  }

  const countryOptions = checkCountryData(countryData)

  const checkError = (options: string[]) => {
    if (options.length === 0 && locale === 'en') {
      return 'The list is temporarily unavailable'
    }
    if (options.length === 0 && locale === 'ru') {
      return 'Список временно недоступен'
    } else {
      return ''
    }
  }

  const [triggerGetCity] = locationApi.useLazyGetCityQuery()

  const handlerCountry = async (optionValue: string) => {
    if (optionValue) {
      const countryCode = countryData?.find(item => item.name === optionValue)?.countryCode

      try {
        const res = await triggerGetCity({ countryCode: countryCode || '', lng: locale ?? '' })
        const cityOptions = res
          .data!.edges.map(item => item.node.name)
          .sort((a, b) => a.localeCompare(b, locale))

        setCityOptions(cityOptions)
      } catch (error) {
        return []
      }
    }
  }

  return {
    checkError,
    cityOptions,
    countryOptions,
    handlerCountry,
  }
}
