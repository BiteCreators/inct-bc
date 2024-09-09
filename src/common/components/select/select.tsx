import React, {
  ComponentProps,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import { cn } from '@/common/utils/cn'
import * as SelectPrimitive from '@radix-ui/react-select'

import { Icon } from '../icon/Icon'

type Props = {
  icon?: React.ReactNode
  id?: string
  label?: string
  placeholder?: string
} & SelectPrimitive.SelectProps

export const Select = ({ children, icon, id, label, placeholder, required, ...props }: Props) => {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [width, setWidth] = useState(triggerRef.current?.clientWidth)

  useLayoutEffect(() => {
    if (triggerRef.current) {
      setWidth(triggerRef.current.clientWidth + 2)
    }
  }, [triggerRef])

  return (
    <div className={'flex flex-col max-w-[210px]'}>
      {label && (
        <label
          className={cn(
            `
            text-sm text-light-900
            `,
            required && 'after:content-["*"] after:text-light-900 after:text-sm after:ml-0.5'
          )}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          className={cn(
            `
            flex justify-between 
            border-dark-100 border
            active:outline-none 
            text-md 
            px-3 py-[6px]
            data-[placeholder]:text-light-900
            outline-none
            rounded-sm
            outline-offset-0 focus:outline-primary-500 focus:outline-2
            data-[state="open"]:bg-dark-500 data-[state="open"]:border-light-100
            data-[state="open"]:rounded-b-none
            data-[disabled]:data-[placeholder]:text-dark-100 
            transition-[outline-color]
            delay-75
            group
            `
          )}
          id={id}
          ref={triggerRef}
        >
          <div className={'flex gap-3 align-center'}>
            {icon}
            <SelectPrimitive.Value className={'text-light-100'} placeholder={placeholder} />
          </div>
          <SelectPrimitive.Icon className={'SelectIcon'}>
            <Icon
              className={cn(
                `
              fill-current text-light-100 
              group-[[data-state="open"]]:rotate-180
              transition-transform
              delay-100
              `
              )}
              height={'20px'}
              iconId={'arrow-ios-Up'}
              viewBox={'2.5 1 20 20'}
              width={'20px'}
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            asChild
            className={cn(
              `
              border border-light-100 border-t-[0px]
              rounded-b-sm
              bg-dark-500
              `
            )}
            //does not work via tailwind for some reason
            style={{ width: width }}
          >
            <div className={'transition-all delay-1000'}>{children}</div>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  )
}

type ItemProps = {} & SelectPrimitive.SelectItemProps

Select.Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ children, className, ...props }: ItemProps, forwardedRef) => {
    return (
      <SelectPrimitive.Item
        className={cn(
          `
          px-3 py-[6px]
          text-md
        hover:text-primary-500 hover:bg-dark-300 hover:outline-none
          cursor-pointer
          delay-[0.01s]
          transition-colors
          `,
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    )
  }
)
