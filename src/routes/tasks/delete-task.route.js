import { buildRoutePath } from "../../utils/build-route-path.js"
import { Database } from "../../database/index.js"

const database = new Database()

export const deleteTaskRoute = {
  method: 'DELETE',
  path: buildRoutePath('/tasks/:id'),
  handler: (req, res) => {
    try {
      const { id } = req.params
      const task = database.findOneByID('tasks', id)
      if (!task) throw new Error('ID de tarefa não existe.')

      database.delete('tasks', id)
      return res.writeHead(204).end()
    } catch (error) {
      return res.writeHead(400).end(JSON.stringify({message: error.message}))
    }
    
  }
}