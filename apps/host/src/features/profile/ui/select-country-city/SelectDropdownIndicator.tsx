import React from 'react'
import { DropdownIndicatorProps, GroupBase, components } from 'react-select'

import { SelectData } from '@/features/profile/model/useSelectCountryCity'
import { ArrowIosDownOutline } from '@packages/shared/assets/icons/components'

export const SelectDropdownIndicator = (
  props: DropdownIndicatorProps<SelectData, false, GroupBase<SelectData>>
) => {
  return (
    <components.DropdownIndicator {...props}>
      {props.selectProps.menuIsOpen ? (
        <ArrowIosDownOutline
          className={'fill-current text-light-100 rotate-180 transition-transform delay-100'}
        />
      ) : (
        <ArrowIosDownOutline />
      )}
    </components.DropdownIndicator>
  )
}
