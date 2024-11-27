import { makeAutoObservable } from 'mobx'

type Task = {
  id: number
  isDone: boolean
  name: string
}

export class TestStore {
  settings = {
    description: 'desc',
    needToBeDone: 10,
  }
  tasks: Task[] = [
    { id: 1, isDone: true, name: 'Add mobx deps' },
    { id: 2, isDone: false, name: 'test mobx' },
  ]
  tasksDone = 1

  constructor(needToBeDone: number) {
    makeAutoObservable(this)
    this.settings.needToBeDone = needToBeDone
  }

  addTask(task: Task) {
    this.tasks.push(task)
  }

  changeDescription(desc: string) {
    this.settings.description = desc
  }

  completeTask(id: number) {
    const task = this.tasks.find(task => task.id === id)

    if (task) {
      task.isDone = true
    }
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id)
  }
}
