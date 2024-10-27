import { useState } from 'react'

import { LocationResponse, locationApi } from '@/common/api/location.api'
import { useRouter } from 'next/router'

export type Options = {
  countryCode: string
  value: string
}

export const useCountryCity = () => {
  const { locale } = useRouter()
  const [cityOptions, setCityOptions] = useState<Options[]>([])
  const { data: countryData, isLoading: isLoadingCountryData } = locationApi.useGetCountryQuery({
    lng: locale ?? 'ru',
  })
  const [triggerGetCity] = locationApi.useLazyGetCityQuery()

  const checkCountryData = (countryData: LocationResponse[] | undefined) => {
    if (countryData) {
      return countryData.map(country => ({ countryCode: country.countryCode, value: country.name }))
    } else {
      return []
    }
  }

  const countryOptions: Options[] = checkCountryData(countryData)

  const checkError = (options: Options[]) => {
    if (options.length === 0 && locale === 'en') {
      return 'The list is temporarily unavailable'
    }
    if (options.length === 0 && locale === 'ru') {
      return 'Список временно недоступен'
    } else {
      return ''
    }
  }

  const handlerCountry = async (optionValue: string) => {
    if (countryOptions) {
      const countryCode = countryOptions.find(country => country.value === optionValue)?.countryCode

      try {
        const res = await triggerGetCity({ countryCode: countryCode || '', lng: locale ?? '' })
        const sortedCityOptions: Options[] = res
          .data!.edges.map(city => ({ countryCode: city.node.countryCode, value: city.node.name }))
          .sort((a, b) => a.value.localeCompare(b.value, locale))

        setCityOptions(sortedCityOptions)
      } catch (error) {
        setCityOptions([])
      }
    }
  }

  return {
    checkError,
    cityOptions,
    countryData,
    countryOptions,
    handlerCountry,
    isLoadingCountryData,
  }
}
