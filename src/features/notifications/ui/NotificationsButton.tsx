import { Icon } from '@/common/components/icon/Icon'

export const NotificationsButton = () => {
  return (
    <button onClick={() => alert("this doesn't do anything yet")}>
      <Icon
        className={'fill-current text-light-100'}
        iconId={'outline bell'}
        viewBox={'-5 -3 30 30'}
      />
    </button>
  )
}
