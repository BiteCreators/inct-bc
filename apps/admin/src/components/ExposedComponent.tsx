import { useState } from 'react'

import { Button } from '@packages/shared/ui'
import { observer } from 'mobx-react'

import cl from './plugin-test.module.scss'

import { TestStore } from './testStore'

const testStore = new TestStore(100)

const ExposedComponent = observer(() => {
  const [value, setValue] = useState('')

  return (
    <div>
      <div>{testStore.settings.description}</div>
      <div>TODO: {testStore.settings.needToBeDone}</div>
      <ul>
        {testStore.tasks.map(task => (
          <li key={task.id} style={{ display: 'flex', gap: '10px' }}>
            <input
              checked={task.isDone}
              onChange={e => (task.isDone = e.target.checked)}
              type={'checkbox'}
            />
            <span>{task.name}</span>
            <button onClick={() => testStore.removeTask(task.id)} style={{ color: 'red' }}>
              delete
            </button>
          </li>
        ))}
      </ul>
      <input
        onChange={e => setValue(e.target.value)}
        style={{ border: '1px solid black' }}
        type={'text'}
        value={value}
      />
      <button onClick={() => (testStore.settings.description = value)}>set description</button>
      <Button>Shared button</Button>
      <div className={cl.cssDiv}>this is set with css</div>
      <div className={cl.div}>this is set with scss</div>
    </div>
  )
})

export default ExposedComponent
