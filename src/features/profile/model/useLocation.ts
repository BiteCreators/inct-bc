import { useState } from 'react'

import { LocationResponse } from '@/common/api/location.api'
import { Cities, CitiesLng, CountriesLng } from '@/pages/profile/[id]/settings'
import { useRouter } from 'next/router'

export const useLocation = (
  cities: CitiesLng | null,
  countries: CountriesLng | null,
  profile: any
) => {
  const { locale } = useRouter()
  const [cityOptions, setCityOptions] = useState<LocationResponse[]>([])

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

  const countryOptions: LocationResponse[] = checkCountryData(countries)

  const checkError = (options: LocationResponse[]) => {
    if (options.length === 0 && locale === 'en') {
      return 'The list is temporarily unavailable'
    }
    if (options.length === 0 && locale === 'ru') {
      return 'Список временно недоступен'
    } else {
      return ''
    }
  }

  const handlerCountry = async (countyValue: string) => {
    setCityOptions([])
    const getSortedCities = (cities: Cities[], countryCode: string) => {
      // TODO delete on production!
      if (countryCode === 'UA' || countryCode === 'RU' || countryCode === 'BY') {
        const cityOptions = cities
          .filter(city => city[countryCode])[0]
          [countryCode].edges.map(city => city.node)
          .sort((a, b) => a.name.localeCompare(b.name, locale))

        setCityOptions(cityOptions)
      }
    }

    if (cities && countyValue !== '') {
      const countryCode = countryOptions.filter(country => country.name === countyValue)[0]
        .countryCode

      if (locale === 'en') {
        getSortedCities(cities.citiesEn, countryCode)
      }
      if (locale === 'ru') {
        getSortedCities(cities.citiesRu, countryCode)
      }
    }
  }

  // if (profile) {
  //   if (profile.country.length > 0 && cityOptions.length === 0) {
  //     handlerCountry(profile.country)
  //   }
  // }

  return {
    checkError,
    cityOptions,
    countryOptions,
    handlerCountry,
  }
}
