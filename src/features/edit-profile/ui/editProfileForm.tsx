import { Alert, Button, FormInput, FormSelect, FormTextArea, Loader, SelectItem } from '@/common/ui'
import { FormDatePicker } from '@/common/ui/form/FormDatePicker'

import { useEditProfileForm } from '../model/useEditProfileForm'
import { ProfileAvatar } from './avatar/ProfileAvatar'

export const EditProfileForm = () => {
  const { control, handleSubmit, isError, isLoading, isShowAlert, isValid, message, onClose, t } =
    useEditProfileForm()

  const countriesList = t.countriesList.split(',').map((el, ind) => {
    return (
      <SelectItem key={ind} value={el}>
        {el}
      </SelectItem>
    )
  })

  const citiesList = t.citiesList.split(',').map((el, ind) => {
    return (
      <SelectItem key={ind} value={el}>
        {el}
      </SelectItem>
    )
  })

  if (isLoading) {
    return <Loader fullScreen />
  }

  return (
    <div className={'flex flex-col gap-10 text-sm relative lg:flex-row'}>
      <div className={'flex flex-col gap-6'}>
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
        <div className={'flex gap-6 justify-between'}>
          <FormSelect
            className={'w-full'}
            control={control}
            label={t.selectYourCountry}
            name={'country'}
            placeholder={t.country}
            responsive
          >
            {countriesList}
          </FormSelect>
          <FormSelect
            className={'w-full'}
            control={control}
            label={t.selectYourCity}
            name={'city'}
            placeholder={t.city}
          >
            {citiesList}
          </FormSelect>
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
