import React, { useState } from 'react'
import Select, { ActionMeta, SelectOptionActionMeta, SingleValue } from 'react-select'

import { locationApi } from '@/common/api/location.api'
import { useRouter } from 'next/router'

type SelectData = {
  label: string
  value: string
}

export default function Profile() {
  const { locale } = useRouter()
  const [region, setRegion] = useState<SelectData[]>([])
  const [area, setArea] = useState<SelectData[]>([])
  const [city, setCity] = useState<SelectData[]>([])

  const { data: countryData, error: countryError } = locationApi.useGetCountryQuery({
    lng: locale ?? 'ru',
  })
  const [triggerGetChildRegion, { data: childRegionData, error: childRegionError }] =
    locationApi.useLazyGetChildRegionQuery()

  const countryOptions = countryData?.map(item => ({ label: item.name, value: item.id }))

  const handlerCountry = async (newValue: SingleValue<SelectData>) => {
    if (newValue) {
      const res = await triggerGetChildRegion({ id: newValue.value, lng: locale ?? '' })
      const childRegionOptions = res.data!.edges.map(item => {
        return { label: item.node.name, value: item.node.id }
      })

      setRegion(childRegionOptions.sort((a, b) => a.label.localeCompare(b.label, locale)))
      console.log('selectValueCountry', newValue.value)
      console.log('resChildRegion', res.data?.edges[0].node)
      console.log('childRegionOptions', childRegionOptions)
    }
  }

  const handlerRegion = async (newValue: SingleValue<SelectData>) => {
    if (newValue) {
      const res = await triggerGetChildRegion({ id: newValue.value, lng: locale ?? '' })
      const childRegionOptions = res.data!.edges.map(item => {
        return { label: item.node.name, value: item.node.id }
      })

      setArea(childRegionOptions.sort((a, b) => a.label.localeCompare(b.label, locale)))
      console.log('selectValue', newValue.value)
    }
  }

  const handlerAria = async (newValue: SingleValue<SelectData>) => {
    if (newValue) {
      const res = await triggerGetChildRegion({ id: newValue.value, lng: locale ?? '' })
      const childRegionOptions = res.data!.edges.map(item => {
        return { label: item.node.name, value: item.node.id }
      })

      setCity(childRegionOptions.sort((a, b) => a.label.localeCompare(b.label, locale)))
      console.log('selectValue', newValue.value)
    }
  }

  return (
    <>
      <h1>Profile</h1>
      <div className={'w-full flex justify-around'}>
        <div>
          <p>Country Select</p>
          <Select
            isSearchable
            onChange={handlerCountry}
            options={countryOptions}
            styles={{
              control: (provided, state) => ({
                ...provided,
                backgroundColor: 'black',
                color: 'white',
                width: '200px',
              }),
              input: (provided, state) => ({
                ...provided,
                color: 'white',
              }),
              menu: (provided, state) => ({
                ...provided,
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: 'black',
                color: state.isSelected ? 'red' : '',
              }),
              singleValue: (provided, state) => ({
                ...provided,
                color: 'white',
              }),
            }}
          />
        </div>
        <div>
          <p>Region Select</p>
          <Select
            isSearchable
            onChange={handlerRegion}
            options={region}
            styles={{
              control: (provided, state) => ({
                ...provided,
                backgroundColor: 'black',
                color: 'white',
                width: '200px',
              }),
              input: (provided, state) => ({
                ...provided,
                color: 'white',
              }),
              menu: (provided, state) => ({
                ...provided,
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: 'black',
                color: state.isSelected ? 'red' : '',
              }),
              singleValue: (provided, state) => ({
                ...provided,
                color: 'white',
              }),
            }}
          />
        </div>
        <div>
          <p>Aria Select</p>
          <Select
            isSearchable
            onChange={handlerAria}
            options={area}
            styles={{
              control: (provided, state) => ({
                ...provided,
                backgroundColor: 'black',
                color: 'white',
                width: '200px',
              }),
              input: (provided, state) => ({
                ...provided,
                color: 'white',
              }),
              menu: (provided, state) => ({
                ...provided,
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: 'black',
                color: state.isSelected ? 'red' : '',
              }),
              singleValue: (provided, state) => ({
                ...provided,
                color: 'white',
              }),
            }}
          />
        </div>
        <div>
          <p>City Select</p>
          <Select
            isSearchable
            onChange={e => console.log('selectCity', e)}
            options={city}
            styles={{
              control: (provided, state) => ({
                ...provided,
                backgroundColor: 'black',
                color: 'white',
                width: '200px',
              }),
              input: (provided, state) => ({
                ...provided,
                color: 'white',
              }),
              menu: (provided, state) => ({
                ...provided,
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: 'black',
                color: state.isSelected ? 'red' : '',
              }),
              singleValue: (provided, state) => ({
                ...provided,
                color: 'white',
              }),
            }}
          />
        </div>
      </div>
    </>
  )
}
