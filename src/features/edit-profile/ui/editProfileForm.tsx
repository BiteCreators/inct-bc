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
    <div className={'flex justify-between items-start ml-6 mr-[65px] relative mt-6 h-full text-sm'}>
      <ProfileAvatar />
      <form className={'ml-10 flex flex-col gap-y-6 basis-3/4'} noValidate onSubmit={handleSubmit}>
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
        <div className={'flex gap-5 justify-between w-full'}>
          <FormSelect
            control={control}
            label={t.selectYourCountry}
            maxWidth={'360px'}
            name={'country'}
            placeholder={t.country}
            responsive
            width={'358px'}
          >
            {countriesList}
          </FormSelect>
          <FormSelect
            control={control}
            label={t.selectYourCity}
            maxWidth={'360px'}
            name={'city'}
            placeholder={t.city}
            width={'358px'}
          >
            {citiesList}
          </FormSelect>
        </div>
        <FormTextArea control={control} label={t.aboutMe} name={'aboutMe'} />
        <span className={'inline-block ml-[-35%] h-[1px] w-[135%] bg-dark-300'} />
        <Button className={'mt-7 w-min-40 self-end'} disabled={!isValid} type={'submit'}>
          {t.saveChangesBtn}
        </Button>
      </form>
      {isShowAlert && (
        <div className={'relative'}>
          <Alert
            duration={3000}
            message={message}
            onClose={onClose}
            purpose={'toast'}
            type={isError ? 'error' : 'success'}
          />
        </div>
      )}
    </div>
  )
}
