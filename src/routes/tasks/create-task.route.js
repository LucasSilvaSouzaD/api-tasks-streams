import { randomUUID } from "node:crypto"
import { Task } from "../../entity/task.entity.js"
import { buildRoutePath } from "../../utils/build-route-path.js"
import { Database } from "../../database/index.js"

const database = new Database()

export const createTaskRoute = {
  method: 'POST',
  path: buildRoutePath('/tasks'),
  handler: (req, res) => {
    try {
      const { title, description } = req.body
      if (!title || !description) throw new Error('Para criação de uma tarefa precisamos do titulo e descrição!')

      const data = {
        id: randomUUID(),
        title,
        description,
      }

      const task = new Task(data)
      database.insert('tasks', task)

      return res.writeHead(201).end()
    } catch (error) {
      return res.writeHead(400).end(JSON.stringify({message: error.message}))
    }
    
  }
}