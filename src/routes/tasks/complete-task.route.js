import { Task } from "../../entity/task.entity.js"
import { buildRoutePath } from "../../utils/build-route-path.js"
import { Database } from "../../database/index.js"

const database = new Database()

export const completeTaskRoute = {
  method: 'PATCH',
  path: buildRoutePath('/tasks/:id/complete'),
  handler: (req, res) => {
    try {
      const { id } = req.params

      const task = database.findOneByID('tasks', id)

      if (!task) throw new Error('ID de tarefa não existe.')

      const taskEntity = new Task(task)

      if (taskEntity.completed_at) throw new Error('A tarefa já foi concluída.')

      taskEntity.complete()
      
      database.update('tasks', id, taskEntity)
      
      return res.writeHead(201).end(JSON.stringify(taskEntity.toJSON()))
    } catch (error) {
      return res.writeHead(400).end(JSON.stringify({ message: error.message }))
    }
  }
}