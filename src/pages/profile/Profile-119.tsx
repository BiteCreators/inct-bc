import React from 'react'
import Select from 'react-select'

import { useCountryCity } from '@/features/profile/model/useSelectCountryCity'
import { SelectDropdownIndicator } from '@/features/profile/ui/select-country-city/SelectDropdownIndicator'
import { selectStyle } from '@/features/profile/ui/select-country-city/selectStyles'

export default function Profile() {
  const { cityOptions, countryOptions, handlerCity, handlerCountry } = useCountryCity()

  return (
    <>
      <h1>Profile</h1>
      <div className={'w-full flex gap-6'}>
        <div className={'w-full'}>
          <label className={'text-sm text-light-900'} htmlFor={'country-select'}>
            Select your country
          </label>
          <Select
            components={{ DropdownIndicator: SelectDropdownIndicator }}
            id={'country-select'}
            isSearchable
            onChange={handlerCountry}
            options={countryOptions}
            placeholder={'Country'}
            styles={selectStyle}
          />
        </div>
        <div className={'w-full'}>
          <label className={'text-sm text-light-900 block'} htmlFor={'city-select'}>
            Select your city
          </label>
          <Select
            id={'city-select'}
            isDisabled={cityOptions.length === 0}
            isSearchable
            onChange={handlerCity}
            options={cityOptions}
            placeholder={'City'}
            styles={selectStyle}
          />
        </div>
      </div>
    </>
  )
}
