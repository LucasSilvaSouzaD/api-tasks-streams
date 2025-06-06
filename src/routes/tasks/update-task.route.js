import { Task } from "../../entity/task.entity.js"
import { buildRoutePath } from "../../utils/build-route-path.js"
import { Database } from "../../database/index.js"

const database = new Database()

export const updateTaskRoute = {
  method: 'PUT',
  path: buildRoutePath('/tasks/:id'),
  handler: (req, res) => {
    try {
      const { id } = req.params

      const task = database.findOneByID('tasks', id)

      if (!task) throw new Error('ID de tarefa não existe.')
      const { title, description } = req.body

      if (!title && !description) throw new Error('Para atualização de uma tarefa precisamos do titulo ou descrição!')

      const taskEntity = new Task(task)

      if (title) taskEntity.updateTitle(title)
      if (description) taskEntity.updateDescription(description)
      
      database.update('tasks', id, taskEntity)
      
      return res.writeHead(201).end(JSON.stringify(taskEntity.toJSON()))
    } catch (error) {
      return res.writeHead(400).end(JSON.stringify({ message: error.message }))
    }
  }
}