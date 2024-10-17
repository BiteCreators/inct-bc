import React from 'react'
import { Controller, useController, useForm } from 'react-hook-form'
import Select from 'react-select'

import { Alert, Button, FormInput, FormTextArea, Loader } from '@/common/ui'
import { FormDatePicker } from '@/common/ui/form/FormDatePicker'
import { useCountryCity } from '@/features/profile/model/useSelectCountryCity'
import { SelectDropdownIndicator } from '@/features/profile/ui/select-country-city/SelectDropdownIndicator'
import { selectStyle } from '@/features/profile/ui/select-country-city/selectStyles'

import { useEditProfileForm } from '../model/useEditProfileForm'
import { ProfileAvatar } from './avatar/ProfileAvatar'

export const EditProfileForm = () => {
  const { control, handleSubmit, isError, isLoading, isShowAlert, isValid, message, onClose, t } =
    useEditProfileForm()
  const { cityOptions, countryOptions, handlerCountry } = useCountryCity()

  if (isLoading) {
    return <Loader fullScreen />
  }

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
            <label className={'text-sm text-light-900'} htmlFor={'country-select'}>
              {t.selectYourCountry}
            </label>
            <Controller
              control={control}
              name={'country'}
              render={({ field }) => (
                <Select
                  components={{ DropdownIndicator: SelectDropdownIndicator }}
                  id={'country-select'}
                  isSearchable
                  onChange={optionValue =>
                    // field.onChange(handlerCountry(optionValue), optionValue!.label)
                    field.onChange(optionValue!.label)
                  }
                  options={countryOptions}
                  placeholder={t.country}
                  styles={selectStyle}
                />
              )}
            />
          </div>
          <div className={'w-full'}>
            <label className={'text-sm text-light-900 block'} htmlFor={'city-select'}>
              {t.selectYourCity}
            </label>
            <Controller
              control={control}
              name={'city'}
              render={({ field }) => (
                <Select
                  components={{ DropdownIndicator: SelectDropdownIndicator }}
                  id={'city-select'}
                  isDisabled={cityOptions.length === 0}
                  isSearchable
                  onChange={optionValue => field.onChange(optionValue!.label)}
                  options={cityOptions}
                  placeholder={t.city}
                  styles={selectStyle}
                />
              )}
            />
          </div>
        </div>
        <FormTextArea className={'mb-6'} control={control} label={t.aboutMe} name={'aboutMe'} />
        {/*<Button className={'w-min-40 self-end'} disabled={!isValid} type={'submit'}>*/}
        <Button className={'w-min-40 self-end'} type={'submit'}>
          {t.saveChangesBtn}
        </Button>
      </form>
      <hr className={'border-dark-300 w-full absolute bottom-[60px]'}></hr>
    </div>
  )
}
