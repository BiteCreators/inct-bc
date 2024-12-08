import { BlockUsersFilter } from '@/features/filter/block-filter/BlockUsersFilter'
import { UsersSearch } from '@/features/filter/users-search/UsersSearch'
import { UsersTable } from '@/features/users'

import style from './users.module.scss'

const Users = () => {
  return (
    <div className={style.usersListContainer}>
      <div className={style.containerForFilterAndSearch}>
        <UsersSearch />
        <BlockUsersFilter />
      </div>
      <UsersTable />
    </div>
  )
}

export default Users
