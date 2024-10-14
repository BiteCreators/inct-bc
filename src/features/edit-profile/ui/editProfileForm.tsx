import { useForm } from 'react-hook-form'

import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { Avatar, Button, FormInput, FormSelect, FormTextArea, SelectItem } from '@/common/ui'
import { FormDatePicker } from '@/common/ui/form/FormDatePicker'
import { zodResolver } from '@hookform/resolvers/zod'

import exampleImage from '../../../../public/examples/0a9f264bc73447e3ce0157c47fae210a (1).jpg'
import { EditProfileFormData, createEditProfileSchema } from '../lib/schemas/editProfileForm.schema'

type Props = {
  userName?: string
}
export const EditProfileForm = ({ userName }: Props) => {
  const t = useScopedTranslation('Profile')
  const editProfileSchema = createEditProfileSchema(t)
  const { control, getValues, handleSubmit } = useForm<EditProfileFormData>({
    defaultValues: {
      aboutMe: '',
      dateOfbirth: undefined,
      firstName: '',
      lastName: '',
      selectYourCity: '',
      selectYourCountry: '',
      userName: userName ? userName : '',
    },
    mode: 'onChange',
    resolver: zodResolver(editProfileSchema),
  })
  const onSubmit = (data: EditProfileFormData) => {
    console.log('DATA', data)
  }
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

  return (
    <div className={'flex justify-between items-start ml-6 mr-[65px] relative mt-6 h-full text-sm'}>
      <div className={'flex items-center gap-y-5 flex-col h-[195px] basis-1/4'}>
        <Avatar avatarURL={exampleImage.src} href={'/'} size={192} />
        <Button variant={'outline'}>Add a profile photo</Button>
      </div>
      <form
        className={'ml-10 flex flex-col gap-y-6 basis-3/4'}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput control={control} label={t.userName} name={'userName'} required />
        <FormInput control={control} label={t.firstName} name={'firstName'} required />
        <FormInput control={control} label={t.lastName} name={'lastName'} required />
        <FormDatePicker
          className={'w-full p-[0px] bg-inherit'}
          control={control}
          inputClassName={'justify-between px-2 border border-dark-300'}
          label={t.dateOfBirth}
          mode={'single'}
          name={'dateOfbirth'}
          required
        />
        <div className={'flex gap-5 justify-between w-full'}>
          <FormSelect
            control={control}
            label={t.selectYourCountry}
            maxWidth={'360px'}
            name={'selectYourCountry'}
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
            name={'selectYourCity'}
            placeholder={t.city}
            width={'358px'}
          >
            {citiesList}
          </FormSelect>
        </div>
        <FormTextArea control={control} label={t.aboutMe} name={'aboutMe'} />
        <Button className={'mt-7 w-min-40 self-end'} type={'submit'}>
          {t.saveChangesBtn}
        </Button>
      </form>
      <span className={'inline-block absolute h-[1px] bottom-[120px] w-full bg-dark-300'}></span>
    </div>
  )
}
