import { useLayoutEffect, useRef, useState } from 'react'

export const useSelect = () => {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [width, setWidth] = useState(triggerRef.current?.clientWidth)

  useLayoutEffect(() => {
    if (triggerRef.current) {
      setWidth(triggerRef.current.clientWidth + 2)
    }
  }, [triggerRef])

  return { triggerRef, width }
}
