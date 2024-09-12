import { Icon } from '@/common/components/icon/Icon'

export const HeaderMenu = () => {
  //TODO: add dropdown
  return (
    <button onClick={() => alert("this doesn't do anything yet")}>
      <Icon
        className={'fill-current text-light-100'}
        iconId={'more-horizontal'}
        viewBox={'-2.5 -1.5 30 30'}
      />
    </button>
  )
}
