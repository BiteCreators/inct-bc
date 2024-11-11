import { useEffect, useState } from 'react'

import { Profile, ProfileResponse } from '@/common/api/profile.api'
import { Cities, CitiesLng, CountriesLng, SelectOptions } from '@/pages/profile/[id]/settings'
import { useRouter } from 'next/router'

export const useLocation = (
  cities: CitiesLng | null,
  countries: CountriesLng | null,
  profile: (Profile & ProfileResponse) | undefined
) => {
  const { locale } = useRouter()
  const [cityOptions, setCityOptions] = useState<{ name: string; value: string }[]>([])

  useEffect(() => {
    if (profile && countries && cities) {
      handlerCountry(profile.country)
    }
  }, [locale, profile])

  const checkCountryData = (countries: CountriesLng | null) => {
    if (countries) {
      if (locale === 'en') {
        return countries.countriesEn
      }
      if (locale === 'ru') {
        return countries.countriesRu
      }
    }

    return []
  }

  const countryOptions: SelectOptions[] = checkCountryData(countries)

  const checkError = (options: SelectOptions[]) => {
    if (options.length === 0 && locale === 'en') {
      return 'The list is temporarily unavailable'
    }
    if (options.length === 0 && locale === 'ru') {
      return 'Список временно недоступен'
    } else {
      return ''
    }
  }

  const getSortedCities = (cities: Cities[], countryCode: string | undefined) => {
    // TODO delete on production!
    if (countryCode === 'UA' || countryCode === 'RU' || countryCode === 'BY') {
      const cityOptions = cities
        .filter(city => city[countryCode])[0]
        [countryCode]?.sort((a, b) => a.name.localeCompare(b.name, locale))

      setCityOptions(cityOptions)
    }
  }

  const handlerCountry = (countyValue: string | undefined) => {
    setCityOptions([])
    if (cities && countries && countyValue !== '') {
      if (locale === 'en') {
        getSortedCities(cities.citiesEn, countyValue)
      }
      if (locale === 'ru') {
        getSortedCities(cities.citiesRu, countyValue)
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
