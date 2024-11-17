import { ChildResponse, LocationResponse } from '@/common/api/location.api'
import { ProfileSettingsTabs } from '@/widgets/profile-settings-tabs'
import { GetStaticProps } from 'next'

const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
}

const getCountries = async () => {
  try {
    const [resCountriesEn, resCountriesRu] = await Promise.all([
      fetch('https://data-api.oxilor.com/rest/countries?lng=en', { headers }),
      fetch('https://data-api.oxilor.com/rest/countries?lng=ru', { headers }),
    ])

    if (!resCountriesEn.ok || !resCountriesRu.ok) {
      throw new Error('fetch failed')
    }

    const countriesResponseEn: LocationResponse[] = await resCountriesEn.json()
    const countriesEn: SelectOptions[] = countriesResponseEn.map(country => {
      return { name: country.name, value: country.countryCode }
    })

    const countriesResponseRu: LocationResponse[] = await resCountriesRu.json()
    const countriesRu: SelectOptions[] = countriesResponseRu.map(country => {
      return { name: country.name, value: country.countryCode }
    })

    return { countriesEn, countriesRu }
  } catch (e) {
    console.log('fetch countries error: ', e)

    return null
  }
}

const getCities = async (countries: {
  countriesEn: SelectOptions[]
  countriesRu: SelectOptions[]
}) => {
  try {
    const [citiesEn, citiesRu] = await Promise.all([
      Promise.all(
        // TODO delete on production!
        // countries.countriesEn.map(async country => {
        [{ countryCode: 'RU' }, { countryCode: 'BY' }, { countryCode: 'UA' }].map(async country => {
          const resCityEn = await fetch(
            `https://data-api.oxilor.com/rest/regions?countryCode=${country.countryCode}&type=city&lng=en`,
            { headers }
          )

          if (!resCityEn.ok) {
            throw new Error(country.countryCode)
          }

          const cityResponseEn: ChildResponse = await resCityEn.json()
          const cityEn: SelectOptions[] = cityResponseEn.edges.map(city => {
            return { name: city.node.name, value: city.node.id }
          })

          return { [country.countryCode]: cityEn }
        })
      ),
      Promise.all(
        // TODO delete on production!
        // countries.countriesRu.map(async country => {
        [{ countryCode: 'RU' }, { countryCode: 'BY' }, { countryCode: 'UA' }].map(async country => {
          const resCityRu = await fetch(
            `https://data-api.oxilor.com/rest/regions?countryCode=${country.countryCode}&type=city&lng=ru`,
            { headers }
          )

          if (!resCityRu.ok) {
            throw new Error(country.countryCode)
          }

          const cityResponseRu: ChildResponse = await resCityRu.json()
          const cityRu: SelectOptions[] = cityResponseRu.edges.map(city => {
            return { name: city.node.name, value: city.node.id }
          })

          return { [country.countryCode]: cityRu }
        })
      ),
    ])

    return { citiesEn, citiesRu }
  } catch (e) {
    console.log('fetch cities error', e)

    return null
  }
}

export const getStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const countries = await getCountries()

  if (countries) {
    const cities = await getCities(countries)

    if (cities) {
      return {
        props: {
          cities,
          countries,
        },
      }
    }
  }

  return {
    props: {
      cities: null,
      countries: null,
    },
  }
}

export default function ProfileSettings({ cities, countries }: LocationsProps) {
  return (
    <div className={'px-4 lg:pl-6 lg:pr-16 w-screen md:w-full'}>
      <ProfileSettingsTabs cities={cities} countries={countries} />
    </div>
  )
}

export type LocationsProps = {
  cities: CitiesLng | null
  countries: CountriesLng | null
}

export type CountriesLng = {
  countriesEn: SelectOptions[]
  countriesRu: SelectOptions[]
}

export type CitiesLng = {
  citiesEn: Cities[]
  citiesRu: Cities[]
}

export type Cities = {
  [countryCode: string]: SelectOptions[]
}

export type SelectOptions = {
  name: string
  value: string
}
