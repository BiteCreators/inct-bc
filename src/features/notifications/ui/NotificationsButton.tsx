import { OutlineBell } from '@/common/assets/icons/components'

export const NotificationsButton = () => {
  return (
    <button onClick={() => alert("this doesn't do anything yet")}>
      <OutlineBell />
    </button>
  )
}
