import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Sets content width to be equal to the width of the trigger button.
 *
 */

export const useSelect = () => {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [contentWidth, setContentWidth] = useState(triggerRef.current?.clientWidth)

  useLayoutEffect(() => {
    if (triggerRef.current) {
      setContentWidth(triggerRef.current.clientWidth + 2)
    }
  }, [triggerRef])

  return { contentWidth, triggerRef }
}
