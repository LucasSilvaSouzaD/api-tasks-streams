import { Task } from "../../entity/task.entity.js"
import { buildRoutePath } from "../../utils/build-route-path.js"
import { Database } from "../../database/index.js"

const database = new Database()

export const getTaskRoute = {
  method: 'GET',
  path: buildRoutePath('/tasks/:id'),
  handler: (req, res) => {
    try {
      const { id } = req.params

      const task = database.findOneByID('tasks', id)

      if (!task) throw new Error('ID de tarefa não existe.')

      const response = new Task(task)

      return res.writeHead(201).end(JSON.stringify(response.toJSON()))
    } catch (error) {
      return res.writeHead(400).end(JSON.stringify({message: error.message}))
    }
  }
}