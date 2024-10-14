import { useState } from 'react'
import { SingleValue } from 'react-select'

import { locationApi } from '@/common/api/location.api'
import { useRouter } from 'next/router'

export type SelectData = {
  label: string
  value: string
}

export const useCountryCity = () => {
  const { locale } = useRouter()
  const [cityOptions, setCityOptions] = useState<SelectData[]>([])

  const { data: countryData, error: countryError } = locationApi.useGetCountryQuery({
    lng: locale ?? 'ru',
  })

  const countryOptions = countryData?.map(item => ({
    label: item.name,
    value: item.countryCode,
  }))

  const [triggerGetCity] = locationApi.useLazyGetCityQuery()

  const handlerCountry = async (newValue: SingleValue<SelectData>) => {
    if (newValue) {
      try {
        const res = await triggerGetCity({ countryCode: newValue.value, lng: locale ?? '' })
        const cityOptions = res
          .data!.edges.map(item => {
            return { label: item.node.name, value: item.node.id }
          })
          .sort((a, b) => a.label.localeCompare(b.label, locale))

        console.log('handlerCountry', newValue.label)
        setCityOptions(cityOptions)
      } catch (error) {
        console.log('triggerGetCity', error)
      }
    }
  }

  const handlerCity = (newValue: SingleValue<SelectData>) => {
    console.log('handlerCity', newValue!.label)
  }

  return {
    cityOptions,
    countryOptions,
    handlerCity,
    handlerCountry,
  }
}
