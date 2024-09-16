import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '../button/Button'
import { Select, SelectItem } from '../select/Select'
import { FormCheckbox } from './FormCheckbox'
import { FormSelect } from './FormSelect'
import { FormTextArea } from './FormTextArea'

export default {}
type FormData = {
  inputText: string
  isChecked: boolean
  selected: 'option 1' | 'option 2'
  texareaText: string
}

export const FormFiedls = {
  render: () => {
    const { control, handleSubmit } = useForm<FormData>({
      defaultValues: {
        isChecked: false,
        selected: 'option 1',
      },
    })

    const submit: SubmitHandler<FormData> = ({ inputText, isChecked, selected, texareaText }) => {
      alert(`
      selected: ${selected}   
      isChecked: ${isChecked}
      input text: ${inputText}
      textarea text: ${texareaText}
      `)
    }

    return (
      <form className={'flex flex-col gap-5'} onSubmit={handleSubmit(submit)}>
        <FormCheckbox control={control} name={'isChecked'} text={'isChecked'} />
        <FormSelect control={control} name={'selected'}>
          <SelectItem value={'option 1'}>option 1</SelectItem>
          <SelectItem value={'option 2'}>option 2</SelectItem>
        </FormSelect>
        <FormTextArea control={control} name={'texareaText'} />
        <div>
          <Button>Submit</Button>
        </div>
      </form>
    )
  },
}
