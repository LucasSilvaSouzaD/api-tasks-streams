import { buildRoutePath } from "../../utils/build-route-path.js"
import { Database } from "../../database/index.js"

const database = new Database()

export const listTaskRoute = {
  method: 'GET',
  path: buildRoutePath('/tasks'),
  handler: (req, res) => {
    try {
      const tasks = database.select('tasks')

      return res.writeHead(201).end(JSON.stringify(tasks))
    } catch (error) {
      return res.writeHead(400).end(JSON.stringify({message: error.message}))
    }
  }
}