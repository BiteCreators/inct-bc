import React from 'react'
import { Controller } from 'react-hook-form'

import { Button, FormInput, FormSelect, FormTextArea, Loader, SelectItem } from '@/common/ui'
import { FormDatePicker } from '@/common/ui/form/FormDatePicker'
import { SearchableOptions } from '@/common/ui/select/SearchableOptions'
import { Select } from '@/common/ui/select/Select'
import { useLocation } from '@/features/profile/model/useLocation'
import { LocationsProps } from '@/pages/profile/[id]/settings'

import { useEditProfileForm } from '../model/useEditProfileForm'
import { ProfileAvatar } from './avatar/ProfileAvatar'

export const EditProfileForm = ({ cities, countries }: LocationsProps) => {
  const {
    control,
    handleSubmit,
    isError,
    isLoading,
    isShowAlert,
    isValid,
    message,
    onClose,
    profile,
    t,
  } = useEditProfileForm()

  const { checkError, cityOptions, countryOptions, handlerCountry } = useLocation(
    cities,
    countries,
    profile
  )

  if (isLoading) {
    return <Loader fullScreen />
  }

  console.log('cityOptions', cityOptions)

  return (
    <div className={'flex flex-col gap-10 text-sm relative lg:flex-row'}>
      <div className={'flex flex-col gap-6 items-center'}>
        <ProfileAvatar />
      </div>
      <form className={'flex flex-col grow gap-6'} noValidate onSubmit={handleSubmit}>
        <FormInput control={control} label={t.userName} name={'userName'} required />
        <FormInput control={control} label={t.firstName} name={'firstName'} required />
        <FormInput control={control} label={t.lastName} name={'lastName'} required />
        <FormDatePicker
          className={'w-full p-[0px] bg-inherit'}
          control={control}
          inputClassName={'justify-between px-2 border border-dark-300'}
          label={t.dateOfBirth}
          mode={'single'}
          name={'dateOfBirth'}
          required
        />
        <div className={'flex gap-6'}>
          <div className={'w-full'}>
            {/*<FormSelect*/}
            {/*  control={control}*/}
            {/*  defaultValue={profile?.country}*/}
            {/*  label={t.selectYourCountry}*/}
            {/*  name={'country'}*/}
            {/*  // onChange={e => console.log('eventChange', e)}*/}
            {/*  // onOpenChange={e => console.log('eventOpen', e)}*/}
            {/*  // onValueChange={e => console.log('eventValue', e)}*/}
            {/*  // placeholder={'test select'}*/}
            {/*>*/}
            {/*  <SearchableOptions options={countryOptions || []} />*/}
            {/*</FormSelect>*/}
            <Controller
              control={control}
              defaultValue={profile?.country}
              name={'country'}
              render={({ field }) => (
                <Select
                  {...field}
                  error={checkError(countryOptions)}
                  label={t.selectYourCountry}
                  onValueChange={countryValue => {
                    field.onChange(countryValue)
                    handlerCountry(countryValue)
                  }}
                  placeholder={t.country}
                >
                  <SearchableOptions options={countryOptions.length !== 0 ? countryOptions : []} />
                </Select>
              )}
            />
          </div>
          <div className={'w-full'}>
            <Controller
              control={control}
              defaultValue={profile?.city}
              name={'city'}
              render={({ field }) => (
                <Select
                  {...field}
                  disabled={cityOptions.length === 0}
                  label={t.selectYourCity}
                  onValueChange={field.onChange}
                  placeholder={t.city}
                >
                  <SearchableOptions options={cityOptions.length !== 0 ? cityOptions : []} />
                </Select>
              )}
            />
          </div>
        </div>
        <FormTextArea className={'mb-6'} control={control} label={t.aboutMe} name={'aboutMe'} />
        <Button className={'w-min-40 self-end'} disabled={!isValid} type={'submit'}>
          {t.saveChangesBtn}
        </Button>
      </form>
      <hr className={'border-dark-300 w-full absolute bottom-[60px]'}></hr>
    </div>
  )
}
