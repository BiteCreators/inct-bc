import { SettingsOutline } from '@/common/assets/icons/components'
import { Dropdown } from '@/common/ui'
import { DropdownItem } from '@/common/ui/dropdown/Dropdown'

export const HeaderMenu = () => {
  const items: DropdownItem[] = [
    {
      icon: <SettingsOutline />,
      label: 'Profile Settings',
      onClick: () => {},
    },
  ]
  // items: [
  //   {
  //     icon: <Person />,
  //     label: 'Profile Settings',
  //     onClick: () => alert('Profile Settings clicked'),
  //   },
  //   {
  //     icon: <PaperPlane />,
  //     label: 'Statistics',
  //     onClick: () => alert('Statistics clicked'),
  //   },
  //   { label: 'Favorites', onClick: () => alert('Favorites clicked') },
  //   { label: 'Log Out', onClick: () => alert('Log Out clicked') },
  // ],

  return (
    <>
      <Dropdown className={'ml-6 -mt-0.5'} items={items}></Dropdown>
    </>
    // <button onClick={() => alert("this doesn't do anything yet")}>
    //   <MoreHorizontal />
    // </button>
  )
}
